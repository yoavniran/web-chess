import {
	BLACK_KING,
	BLACK_PAWN,
	BLACK_QUEEN,
	BLACK_ROOK,
	WHITE_PAWN,
	WHITE_QUEEN,
	WHITE_KING,
	WHITE_ROOK,
	INITIAL_FEN,
} from "consts";
import translateFenToState from "../translateFenToState";

const getSquare = (name, squares) => squares.find((s) => s.name === name);

describe("translateFenToState tests", () => {

	it("should translate initial position for White", () => {
		const state = translateFenToState(INITIAL_FEN);

		expect(state.piecesSquares[0].name).toBe("A8");
		expect(state.piecesSquares[7].name).toBe("H8");
		expect(state.piecesSquares[63].name).toBe("H1");

		expect(getSquare("A1", state.piecesSquares).piece).toBe(WHITE_ROOK);
		expect(getSquare("H1", state.piecesSquares).piece).toBe(WHITE_ROOK);
		expect(getSquare("E1", state.piecesSquares).piece).toBe(WHITE_KING);
		expect(getSquare("D1", state.piecesSquares).piece).toBe(WHITE_QUEEN);
		expect(getSquare("B2", state.piecesSquares).piece).toBe(WHITE_PAWN);
		expect(getSquare("H2", state.piecesSquares).piece).toBe(WHITE_PAWN);

		expect(getSquare("A8", state.piecesSquares).piece).toBe(BLACK_ROOK);
		expect(getSquare("H8", state.piecesSquares).piece).toBe(BLACK_ROOK);
		expect(getSquare("E8", state.piecesSquares).piece).toBe(BLACK_KING);
		expect(getSquare("D8", state.piecesSquares).piece).toBe(BLACK_QUEEN);
		expect(getSquare("B7", state.piecesSquares).piece).toBe(BLACK_PAWN);
		expect(getSquare("H7", state.piecesSquares).piece).toBe(BLACK_PAWN);

		// console.log("!!!!!!! piecesSquares = ", result);
	});

	it("should translate initial position for Black", () => {
		const state = translateFenToState(INITIAL_FEN, true);

		expect(state.piecesSquares[0].name).toBe("H1");
		expect(state.piecesSquares[7].name).toBe("A1");
		expect(state.piecesSquares[63].name).toBe("A8");

		console.log("SQUARES = ", state.piecesSquares);

		expect(getSquare("A1", state.piecesSquares).piece).toBe(WHITE_ROOK);
		expect(getSquare("H1", state.piecesSquares).piece).toBe(WHITE_ROOK);
		expect(getSquare("E1", state.piecesSquares).piece).toBe(WHITE_KING);
		expect(getSquare("D1", state.piecesSquares).piece).toBe(WHITE_QUEEN);
		expect(getSquare("B2", state.piecesSquares).piece).toBe(WHITE_PAWN);
		expect(getSquare("H2", state.piecesSquares).piece).toBe(WHITE_PAWN);

		expect(getSquare("A8", state.piecesSquares).piece).toBe(BLACK_ROOK);
		expect(getSquare("H8", state.piecesSquares).piece).toBe(BLACK_ROOK);
		expect(getSquare("E8", state.piecesSquares).piece).toBe(BLACK_KING);
		expect(getSquare("D8", state.piecesSquares).piece).toBe(BLACK_QUEEN);
		expect(getSquare("B7", state.piecesSquares).piece).toBe(BLACK_PAWN);
		expect(getSquare("H7", state.piecesSquares).piece).toBe(BLACK_PAWN);

		console.log("SQUARES = ", state.piecesSquares);

	});
});
