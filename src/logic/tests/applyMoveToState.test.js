import translateFenToState from "../translateFenToState";
import {
	BLACK_KING,
	BLACK_PAWN,
	INITIAL_FEN,
	PIECE_COLORS,
	WHITE_PAWN,
	WHITE_ROOK,
} from "../../consts";
import applyMoveToState from "../applyMoveToState";
import { isEmptyChar } from "../helpers/is";

describe("applyMoveToState tests", () => {

	it("should apply E3 from initial FEN", () => {
		const state = translateFenToState(INITIAL_FEN);
		const newState = applyMoveToState(state, "E2", "E3");

		expect(newState.whitePositions["E3"]).toBe(WHITE_PAWN);
		expect(newState.whitePositions["E2"]).toBeUndefined();

		expect(newState.squares["E3"].symbol).toBe(WHITE_PAWN);
		expect(newState.squares["E3"].isEmpty).toBe(false);
		expect(newState.squares["E2"].isEmpty).toBe(true);
		expect(newState.squares["E2"].symbol).toBe(false);

		expect(newState.move).toBe(0);
	});

	it("should disable WHITE King side castling for H Rook move", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w KQ - 9 13");
		const newState = applyMoveToState(state, "H1", "G1");

		expect(newState.whitePositions["G1"]).toBe(WHITE_ROOK);
		expect(newState.whitePositions["H1"]).toBeUndefined();

		expect(newState.castles).toBe("Q");
	});

	it("should disable WHITE Queen side castling for A Rook move", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w KQ - 9 13");
		const newState = applyMoveToState(state, "A1", "B1");

		expect(newState.whitePositions["B1"]).toBe(WHITE_ROOK);
		expect(newState.whitePositions["A1"]).toBeUndefined();
		expect(newState.castles).toBe("K");
	});

	it("should disable BLACK King castling for king move", () => {
		const state = translateFenToState("r1bqk1r1/ppp12pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R b kq - 9 13");
		const newState = applyMoveToState(state, "E8", "F8");

		expect(newState.blackPositions["F8"]).toBe(BLACK_KING);
		expect(isEmptyChar(newState.castles)).toBe(true);
	});

	it("should register take for WHITE", () => {
		const state = translateFenToState("rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2");
		const newState = applyMoveToState(state, "E4", "D5");

		expect(newState.halfmoveClock).toBe(0);
		expect(newState.move).toBe(1);
		expect(newState.takes).toHaveLength(1);
		expect(newState.takes[0]).toEqual({
			square: "D5",
			symbol: BLACK_PAWN,
			color: PIECE_COLORS.BLACK,
			move: 1,
		});
	});

	it("should register take BLACK", () => {
		const state = translateFenToState("rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2");
		state.takes = [{}];
		const newState = applyMoveToState(state, "D8",  "D5");

		expect(newState.halfmoveClock).toBe(0);
		expect(newState.move).toBe(2);
		expect(newState.takes).toHaveLength(2);
		expect(newState.takes[1]).toEqual({
			square: "D5",
			symbol: WHITE_PAWN,
			color: PIECE_COLORS.WHITE,
			move: 1,
		});
	});

});
