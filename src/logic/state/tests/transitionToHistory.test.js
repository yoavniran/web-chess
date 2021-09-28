import {
	BLACK_KING,
	BLACK_KNIGHT,
	BLACK_PAWN,
	BLACK_QUEEN,
	BLACK_ROOK,
	WHITE_BISHOP,
	WHITE_KING,
	WHITE_KNIGHT,
	WHITE_PAWN,
	WHITE_ROOK,
	CHECK_TYPES,
	INITIAL_FEN,
	MOVE_TYPES,
	PIECE_COLORS,
} from "consts";
import translateFenToState from "../../translateFenToState";

describe("transitionToHistory tests", () => {

	it("should return clone if navigate to current ply", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("D7", { square: "D5" })
			.updateWithNextMove("E4", { square: "D5" })
			.updateWithNextMove("D8", { square: "D5" });

		const newState = state.navigate([1, 1]);

		expect(newState).not.toBe(state);
		expect(newState.history.length).toBe(state.history.length);
		expect(newState.move).toBe(state.move);
		expect(newState.turn).toBe(state.turn);

		expect(newState.squares["D5"].symbol).toBe(state.squares["D5"].symbol);

		Object.entries(newState.whitePositions)
			.every(([key, value]) => state.whitePositions[key] === value);

		Object.entries(newState.blackPositions)
			.every(([key, value]) => state.blackPositions[key] === value);
	});

	it("should not be able to navigate on init position", () => {
		const state = translateFenToState(INITIAL_FEN);
		expect(() => state.navigate(0)).toThrow("WebChess - Cannot navigate to ply: [0,0]");
	});

	it("should revert to the first ply", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("F7", { square: "F5" })
			.updateWithNextMove("F1", { square: "B5" })
			.updateWithNextMove("C7", { square: "C6" })
			.updateWithNextMove("D1", { square: "H5" }); //white Queen checks

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
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("F7", { square: "F5" })
			.updateWithNextMove("F1", { square: "B5" })
			.updateWithNextMove("C7", { square: "C6" })
			.updateWithNextMove("D1", { square: "H5" })
			.updateWithNextMove("G7", { square: "G6" });

		const newState = state.navigate([state.move - 1, 0]);

		expect(state.blackCheck).toBe(CHECK_TYPES.NONE);
		expect(newState.blackCheck).toBe(CHECK_TYPES.CHECK);
	});

	it("should revert 2 plys backward", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("D7", { square: "D5" })
			.updateWithNextMove("E4", { square: "D5" })
			.navigate([0, 1]);

		expect(state.history).toHaveLength(1);
		expect(state.history[0][1]).toBeDefined();
		expect(state.squares["E4"].symbol).toBe(WHITE_PAWN);
		expect(state.squares["D5"].symbol).toBe(BLACK_PAWN);
	});

	it("should revert 3 pls backward", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("D7", { square: "D5" })
			.updateWithNextMove("E4", { square: "D5" })
			.updateWithNextMove("D8", { square: "D5" })
			.navigate([0, 1]);

		expect(state.squares["D8"].symbol).toBe(BLACK_QUEEN);
		expect(state.squares["D7"].isEmpty).toBe(true);
		expect(state.squares["D5"].symbol).toBe(BLACK_PAWN);
		expect(state.squares["E4"].symbol).toBe(WHITE_PAWN);
	});

	it("should revert and update halfmoveClock correctly", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("B1", { square: "C3" })
			.updateWithNextMove("B8", { square: "C6" })
			.updateWithNextMove("G1", { square: "F3" })
			.updateWithNextMove("G8", { square: "F6" })
			.updateWithNextMove("E2", { square: "E4" });

		expect(state.halfmoveClock).toBe(0);

		const newState = state.navigate([state.move - 1, 1]);

		expect(newState.move).toBe(1);
		expect(newState.halfmoveClock).toBe(4);
	});

	it("should revert and update takes correctly", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("D7", { square: "D5" })
			.updateWithNextMove("E4", { square: "D5" }) //take
			.updateWithNextMove("D8", { square: "D5" }) //take
			.updateWithNextMove("B1", { square: "C3" })
			.updateWithNextMove("E7", { square: "E6" })
			.updateWithNextMove("C3", { square: "D5" }) //take
			.updateWithNextMove("E6", { square: "D5" }); //take

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
			.updateWithNextMove("D1", { square: "F3" }) //move 5 (index = 4)
			.updateWithNextMove("C7", { square: "C6" })
			.updateWithNextMove("F3", { square: "F7" }) //take + check
			.updateWithNextMove("E8", { square: "F7" }) //take
			.updateWithNextMove("G1", { square: "F3" });

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
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("F7", { square: "F5" })
			.updateWithNextMove("F1", { square: "B5" })
			.updateWithNextMove("D7", { square: "D6" })
			.updateWithNextMove("E4", { square: "F5" });

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
			.updateWithNextMove("G8", { square: "F6" })
			.updateWithNextMove("B1", { square: "C3" })
			.navigate(-1);

		expect(state.move).toBe(1);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);
		expect(state.takes).toHaveLength(1);
	});

	it("should be able to revert to first ply with black's turn", () => {
		const state = translateFenToState("rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2")
			.updateWithNextMove("G8", { square: "F6" })
			.updateWithNextMove("B1", { square: "C3" })
			.navigate([1, 0]);

		expect(state.move).toBe(1);
		expect(state.turn).toBe(PIECE_COLORS.WHITE);
		expect(state.squares.G8.isEmpty).toBe(true);
		expect(state.squares.F6.symbol).toBe(BLACK_KNIGHT);
		expect(state.squares.F6.isEmpty).toBe(false);
		expect(state.squares.B1.symbol).toBe(WHITE_KNIGHT);
		expect(state.squares.C3.isEmpty).toBe(true);
	});

	it("should revert castle", () => {
		const state = translateFenToState("rnbqk2r/ppppnppp/4p3/8/1b1PP1Q1/2N5/PPP2PPP/R1B1KBNR b KQkq - 2 4")
			.updateWithNextMove("B8", { square: "C6" })
			.updateWithNextMove("F1", { square: "D3" })
			.updateWithNextMove("E8", { square: "G8", type: MOVE_TYPES.CASTLE })
			.navigate([4, 0]);

		expect(state.move).toBe(4);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);
		expect(state.squares.E8.symbol).toBe(BLACK_KING);
		expect(state.squares.H8.symbol).toBe(BLACK_ROOK);
		expect(state.squares.G8.isEmpty).toBe(true);
	});

	it("should reset to start after both sides castled", () => {
		const state = translateFenToState("rnbqk2r/ppppnppp/4p3/8/1b1PP1Q1/2N5/PPP2PPP/R1B1KBNR b KQkq - 2 4")
			.updateWithNextMove("B8", { square: "C6" })
			.updateWithNextMove("F1", { square: "D3" })
			.updateWithNextMove("E8", { square: "G8", type: MOVE_TYPES.CASTLE })
			.updateWithNextMove("C1", { square: "F4" })
			.updateWithNextMove("D7", { square: "D5" })
			.updateWithNextMove("E1", { square: "C1", type: MOVE_TYPES.CASTLE })
			.navigate(-1);

		expect(state.move).toBe(3);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);
		expect(state.squares.E8.symbol).toBe(BLACK_KING);
		expect(state.squares.E1.symbol).toBe(WHITE_KING);
		expect(state.squares.H8.symbol).toBe(BLACK_ROOK);
		expect(state.squares.A1.symbol).toBe(WHITE_ROOK);
		expect(state.squares.F8.isEmpty).toBe(true);
		expect(state.squares.F1.symbol).toBe(WHITE_BISHOP);
	});
});
