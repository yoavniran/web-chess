import {
	BLACK_PAWN,
	BLACK_QUEEN,
	CHECK_TYPES,
	INITIAL_FEN,
	PIECE_COLORS,
	WHITE_PAWN,
} from "consts";
import translateFenToState from "../../translateFenToState";

describe("transitionToHistory tests", () => {
	const expectCloneForSamePly = (state, newState) => {
		expect(newState).not.toBe(state);
		expect(newState.squares).not.toBe(state.squares);
		expect(newState.history).not.toBe(state.history);
		expect(newState.whitePositions).not.toBe(state.whitePositions);
		expect(newState.blackPositions).not.toBe(state.blackPositions);
		expect(newState.history.length).toBe(state.history.length)
		expect(newState.move).toBe(state.move);
		expect(newState.turn).toBe(state.turn);

		Object.entries(newState.whitePositions)
			.every(([key, value]) => state.whitePositions[key] === value);

		Object.entries(newState.blackPositions)
			.every(([key, value]) => state.blackPositions[key] === value);
	};

	it("should return clone if navigate to current ply", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", "E4")
			.updateWithNextMove("D7", "D5")
			.updateWithNextMove("E4", "D5")
			.updateWithNextMove("D8", "D5");

		const newState = state.navigate([1, 1]);

		expectCloneForSamePly(state, newState);
	});

	it("should return clone for init position", () => {
		const state = translateFenToState(INITIAL_FEN);
		const newState  = state.navigate(0);

		expectCloneForSamePly(state, newState);
	});

	it("should revert to the first ply", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", "E4")
			.updateWithNextMove("F7", "F5")
			.updateWithNextMove("F1", "B5")
			.updateWithNextMove("C7", "C6")
			.updateWithNextMove("D1", "H5"); //white Queen checks

		const startState = state.navigate([0, 0]);

		expect(state.blackCheck).toBe(CHECK_TYPES.CHECK);
		expect(state.move).toBe(2);
		expect(state.move).not.toEqual(startState.move);
		expect(state.history).toHaveLength(3);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);

		expect(startState.squares).not.toBe(state.squares);
		expect(startState.move).toBe(0);
		expect(startState.history).toHaveLength(1);
		expect(startState.history[0]).toHaveLength(1);
		expect(startState.blackCheck).toBe(CHECK_TYPES.NONE);
		expect(startState.turn).toBe(PIECE_COLORS.BLACK);
		expect(startState.squares["E4"].symbol).toBe(WHITE_PAWN);
	});

	it("should revert 1 ply backward", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", "E4")
			.updateWithNextMove("F7", "F5")
			.updateWithNextMove("F1", "B5")
			.updateWithNextMove("C7", "C6")
			.updateWithNextMove("D1", "H5")
			.updateWithNextMove("G7", "G6");

		const newState = state.navigate([state.move - 1, 0]);

		expect(state.blackCheck).toBe(CHECK_TYPES.NONE);
		expect(newState.blackCheck).toBe(CHECK_TYPES.CHECK);
	});

	it("should revert 2 plys backward", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", "E4")
			.updateWithNextMove("D7", "D5")
			.updateWithNextMove("E4", "D5")
			.navigate([0, 1]);

		expect(state.history).toHaveLength(1);
		expect(state.history[0][1]).toBeDefined();
		expect(state.squares["E4"].symbol).toBe(WHITE_PAWN);
		expect(state.squares["D5"].symbol).toBe(BLACK_PAWN);
	});

	it("should revert 3 pls backward", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", "E4")
			.updateWithNextMove("D7", "D5")
			.updateWithNextMove("E4", "D5")
			.updateWithNextMove("D8", "D5")
			.navigate([0, 1]);

		expect(state.squares["D8"].symbol).toBe(BLACK_QUEEN);
		expect(state.squares["D7"].isEmpty).toBe(true);
		expect(state.squares["D5"].symbol).toBe(BLACK_PAWN);
		expect(state.squares["E4"].symbol).toBe(WHITE_PAWN);
	});

	it("should revert and update halfmoveClock correctly", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("B1", "C3")
			.updateWithNextMove("B8", "C6")
			.updateWithNextMove("G1", "F3")
			.updateWithNextMove("G8", "F6")
			.updateWithNextMove("E2", "E4");

		expect(state.halfmoveClock).toBe(0);

		const newState = state.navigate([state.move - 1, 1]);

		expect(newState.move).toBe(1);
		expect(newState.halfmoveClock).toBe(4);
	});

	it("should revert and update takes correctly", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", "E4")
			.updateWithNextMove("D7", "D5")
			.updateWithNextMove("E4", "D5") //take
			.updateWithNextMove("D8", "D5") //take
			.updateWithNextMove("B1", "C3")
			.updateWithNextMove("E7", "E6")
			.updateWithNextMove("C3", "D5") //take
			.updateWithNextMove("E6", "D5"); //take

		expect(state.takes).toHaveLength(4);

		let newState = state.navigate(1);

		expect(newState.move).toBe(1);
		expect(newState.takes).toHaveLength(1);
		expect(newState.turn).toBe(PIECE_COLORS.BLACK);

		newState = state.navigate([1, 1]);
		expect(newState.takes).toHaveLength(2);
		expect(newState.turn).toBe(PIECE_COLORS.WHITE);
	});

	it("should work when starting with custom FEN", () => {
		const state = translateFenToState("rnb1kbnr/ppp2ppp/8/3p4/8/8/PPPP1PPP/R1BQKBNR w KQkq - 0 5")
			.updateWithNextMove("D1", "F3") //move 5 (index = 4)
			.updateWithNextMove("C7", "C6")
			.updateWithNextMove("F3", "F7") //take + check
			.updateWithNextMove("E8", "F7") //take
			.updateWithNextMove("G1", "F3");

		expect(state.takes).toHaveLength(6);

		const queenCheckState = state.navigate([5, 0]);
		expect(queenCheckState.move).toBe(5);
		expect(queenCheckState.takes).toHaveLength(5);
		expect(queenCheckState.blackCheck).toBe(CHECK_TYPES.CHECK);
		expect(queenCheckState.turn).toBe(PIECE_COLORS.BLACK);

		const beforeCheckState = queenCheckState.navigate([4, 1]);
		expect(beforeCheckState.move).toBe(4);
		expect(beforeCheckState.takes).toHaveLength(4);
		expect(beforeCheckState.blackCheck).toBe(CHECK_TYPES.NONE);
		expect(beforeCheckState.turn).toBe(PIECE_COLORS.WHITE);
	});

	it("should reset all moves", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", "E4")
			.updateWithNextMove("F7", "F5")
			.updateWithNextMove("F1", "B5")
			.updateWithNextMove("D7", "D6")
			.updateWithNextMove("E4", "F5");

		expect(state.takes).toHaveLength(1);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);
		expect(state.move).toBe(2);

		const newState = state.navigate(-1);
		expect(newState.takes).toHaveLength(0);
		expect(newState.turn).toBe(PIECE_COLORS.WHITE);
		expect(newState.history).toHaveLength(0);
		expect(newState.move).toBe(0);

		expect(newState.squares["E2"].symbol).toBe(WHITE_PAWN);
		expect(newState.squares["E4"].isEmpty).toBe(true);
		expect(newState.squares["F7"].symbol).toBe(BLACK_PAWN);
		expect(newState.squares["F5"].isEmpty).toBe(true);
		expect(newState.squares["D6"].isEmpty).toBe(true);
	});

	it("should reset to custom FEN with last move was black's", () => {
		const state = translateFenToState("rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2")
			.updateWithNextMove("G8", "F6")
			.updateWithNextMove("B1", "C3")
			.navigate(-1);

		expect(state.move).toBe(1);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);
		expect(state.takes).toHaveLength(1);
	});
});
