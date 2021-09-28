import translateFenToState from "../../translateFenToState";
import {
	BLACK_KING,
	BLACK_ROOK,
	INITIAL_FEN,
	MOVE_TYPES,
	PIECE_COLORS,
	WHITE_KING,
	WHITE_KNIGHT,
	WHITE_ROOK,
} from "../../../consts";
import getSquaresAfterMove from "../getSquaresAfterMove";

describe("getSquaresAfterMove tests", () => {

	it("should return updated squares for normal move", () => {
		const state = translateFenToState(INITIAL_FEN);

		const squares = getSquaresAfterMove(state.squares, "G1", {
			square: "H3",
			type: MOVE_TYPES.MOVE,
		}, WHITE_KNIGHT, PIECE_COLORS.WHITE);

		expect(squares.H3.isEmpty).toBe(false);
		expect(squares.H3.symbol).toBe(WHITE_KNIGHT);

		expect(squares.G1.isEmpty).toBe(true);
		expect(squares.G1.symbol).toBe(false);
	});

	it("should return updated squares after castling white queen-side", () => {
		const state = translateFenToState("rnb1kb1r/pp2pppp/2p2n2/q2p2B1/3P4/2NQ4/PPP1PPPP/R3KBNR w KQkq - 2 5");
		const squares = getSquaresAfterMove(state.squares, "E1", {
			square: "C1",
			type: MOVE_TYPES.CASTLE,
		}, WHITE_KING, PIECE_COLORS.WHITE);

		expect(squares.E1.isEmpty).toBe(true);
		expect(squares.C1.symbol).toBe(WHITE_KING);
		expect(squares.D1.symbol).toBe(WHITE_ROOK);
		expect(squares.A1.isEmpty).toBe(true);
	});

	it("should return updated squares after castling black king-side", () => {
		const state = translateFenToState("rnbqk2r/ppppnppp/4p3/8/1b1PP1Q1/2N5/PPP2PPP/R1B1KBNR b KQkq - 2 4");
		const squares = getSquaresAfterMove(state.squares, "E8", {
			square: "G8",
			type: MOVE_TYPES.CASTLE,
		}, BLACK_KING, PIECE_COLORS.BLACK);

		expect(squares.E8.isEmpty).toBe(true);
		expect(squares.G8.symbol).toBe(BLACK_KING);
		expect(squares.F8.symbol).toBe(BLACK_ROOK);
		expect(squares.H8.isEmpty).toBe(true);
	});

	it("should return updated squares after enpassant", () => {
		throw new Error("imp");
	});
});
