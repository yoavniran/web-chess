import {
	BLACK_KING,
	BLACK_PAWN,
	BLACK_QUEEN,
	BLACK_ROOK,
	WHITE_PAWN,
	WHITE_QUEEN,
	WHITE_KING,
	WHITE_ROOK,
	BLACK_KNIGHT,
	WHITE_KNIGHT,
	PIECE_COLORS,
	INITIAL_FEN,
} from "consts";
import translateFenToState from "../translateFenToState";

const getSquareSymbol = (name, squares) => squares[name].symbol; //.find((s) => s.square === name).symbol;

describe("translateFenToState tests", () => {

	it("should translate initial position for White", () => {
		const state = translateFenToState(INITIAL_FEN);

		// expect(state.piecesSquares[0].square).toBe("A8");
		// expect(state.piecesSquares[7].square).toBe("H8");
		// expect(state.piecesSquares[63].square).toBe("H1");

		expect(getSquareSymbol("A1", state.piecesSquares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("H1", state.piecesSquares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("E1", state.piecesSquares)).toBe(WHITE_KING);
		expect(getSquareSymbol("D1", state.piecesSquares)).toBe(WHITE_QUEEN);
		expect(getSquareSymbol("G1", state.piecesSquares)).toBe(WHITE_KNIGHT);
		expect(getSquareSymbol("B2", state.piecesSquares)).toBe(WHITE_PAWN);
		expect(getSquareSymbol("H2", state.piecesSquares)).toBe(WHITE_PAWN);

		expect(getSquareSymbol("A8", state.piecesSquares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("H8", state.piecesSquares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("E8", state.piecesSquares)).toBe(BLACK_KING);
		expect(getSquareSymbol("D8", state.piecesSquares)).toBe(BLACK_QUEEN);
		expect(getSquareSymbol("B7", state.piecesSquares)).toBe(BLACK_PAWN);
		expect(getSquareSymbol("H7", state.piecesSquares)).toBe(BLACK_PAWN);

		expect(state.move).toBe(0);
		expect(state.turn).toBe(PIECE_COLORS.WHITE);
	});

	it("should translate initial position for Black", () => {
		const state = translateFenToState(INITIAL_FEN, true);

		// expect(state.piecesSquares[0].square).toBe("H1");
		// expect(state.piecesSquares[7].square).toBe("A1");
		// expect(state.piecesSquares[63].square).toBe("A8");

		expect(getSquareSymbol("A1", state.piecesSquares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("H1", state.piecesSquares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("E1", state.piecesSquares)).toBe(WHITE_KING);
		expect(getSquareSymbol("D1", state.piecesSquares)).toBe(WHITE_QUEEN);
		expect(getSquareSymbol("G1", state.piecesSquares)).toBe(WHITE_KNIGHT);
		expect(getSquareSymbol("B2", state.piecesSquares)).toBe(WHITE_PAWN);
		expect(getSquareSymbol("H2", state.piecesSquares)).toBe(WHITE_PAWN);

		expect(getSquareSymbol("A8", state.piecesSquares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("H8", state.piecesSquares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("E8", state.piecesSquares)).toBe(BLACK_KING);
		expect(getSquareSymbol("D8", state.piecesSquares)).toBe(BLACK_QUEEN);
		expect(getSquareSymbol("G8", state.piecesSquares)).toBe(BLACK_KNIGHT);
		expect(getSquareSymbol("B7", state.piecesSquares)).toBe(BLACK_PAWN);
		expect(getSquareSymbol("H7", state.piecesSquares)).toBe(BLACK_PAWN);

		expect(state.move).toBe(0);
		expect(state.turn).toBe(PIECE_COLORS.WHITE);
	});

	it("should translate advanced position for White", () => {
		const state = translateFenToState("4q3/3pP1rk/p1bB2pp/1P6/1P6/3Q2P1/5P1P/R3R1K1 b - - 0 29");

		expect(getSquareSymbol("E8", state.piecesSquares)).toBe(BLACK_QUEEN);
		expect(getSquareSymbol("G1", state.piecesSquares)).toBe(WHITE_KING);
		expect(getSquareSymbol("A6", state.piecesSquares)).toBe(BLACK_PAWN);
		expect(getSquareSymbol("B5", state.piecesSquares)).toBe(WHITE_PAWN);
		expect(getSquareSymbol("F5", state.piecesSquares)).toBe(false);

		expect(state.move).toBe(28);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);
	});

});
