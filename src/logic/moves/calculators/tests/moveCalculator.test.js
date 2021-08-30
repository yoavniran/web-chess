import {
	BLACK_KING,
	BLACK_QUEEN,
	INITIAL_FEN,
	PIECE_COLORS,
	WHITE_KNIGHT,
	WHITE_PAWN,
} from "consts";
import translateFenToState from "../../../translateFenToState";
import moveCalculator from "../moveCalculator";
import kingMovesDefinitions from "../definitions/kingMovesDefinitions";
import queenMovesDefinitions from "../definitions/queenMovesDefinitions";
import knightMovesDefinitions from "../definitions/knightMovesDefinitions";
import pawnMovesDefinitions from "../definitions/pawnMovesDefinitions";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("moveCalculator tests", () => {

	it("should calculate moves for pawn - count:1 - from initial FEN", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moveSquares = moveCalculator(
			"E2",
			WHITE_PAWN,
			state,PIECE_COLORS.WHITE,
			pawnMovesDefinitions[0].slice(1)
		);

		expect(moveSquares).toHaveLength(1);
		expect(moveSquares[0]).toBe("E3");
	});

	it("should calculate normal moves for pawn - count:2 - from initial FEN", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moveSquares = moveCalculator(
			"E2",
			WHITE_PAWN,
			state,PIECE_COLORS.WHITE,
			pawnMovesDefinitions[1].slice(1)
		);

		expect(moveSquares).toHaveLength(2);
		expect(moveSquares[0]).toBe("E3");
		expect(moveSquares[1]).toBe("E4");
	});

	it("should calculate normal moves for white knight from initial FEN", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moveSquares = moveCalculator(
			"G1",
			WHITE_KNIGHT,
			state,
			PIECE_COLORS.WHITE,
			knightMovesDefinitions[0].slice(1)
			);

		expect(moveSquares).toHaveLength(2);
		expect(moveSquares[0]).toBe("H3");
		expect(moveSquares[1]).toBe("F3");
	});

	it("should calculate for normal moves Black Queen - ignoring turn", () => {
		const state = translateFenToState("1r1r4/1p6/8/2p2b2/8/2K5/1n3q2/8 w - - 0 1");
		const moveSquares = moveCalculator(
			"F2",
			BLACK_QUEEN,
			state,
			PIECE_COLORS.BLACK,
			queenMovesDefinitions[0].slice(1),
			{ ignoreTurn: true }
		);

		expect(moveSquares).toHaveLength(14);
		expect(findSquare("B2", moveSquares)).toBe(false);
		expect(findSquare("C5", moveSquares)).toBe(false);
		expect(findSquare("B6", moveSquares)).toBe(false);
		expect(findSquare("F6", moveSquares)).toBe(false);
		expect(findSquare("H4", moveSquares)).toBe(true);
		expect(findSquare("H2", moveSquares)).toBe(true);
		expect(findSquare("C2", moveSquares)).toBe(true);
	});

	it("should calculate normal moves for Black Queen - ignoring turn and expected take on B2", () => {
		const state = translateFenToState("1r1r4/1p6/8/2p2b2/8/2K5/1n3q2/8 w - - 0 1");
		const moveSquares = moveCalculator(
			"F2",
			BLACK_QUEEN,
			state,
			PIECE_COLORS.BLACK,
			queenMovesDefinitions[0].slice(1),
			{ ignoreTurn: true, expectedTake: ["B2"] });

		expect(moveSquares).toHaveLength(15);
		expect(findSquare("C5", moveSquares)).toBe(false);
		expect(findSquare("B6", moveSquares)).toBe(false);
		expect(findSquare("F6", moveSquares)).toBe(false);
		expect(findSquare("B2", moveSquares)).toBe(true);
		expect(findSquare("H4", moveSquares)).toBe(true);
		expect(findSquare("H2", moveSquares)).toBe(true);
		expect(findSquare("C2", moveSquares)).toBe(true);
	});

	it("should calculate normal moves for Black King - with rook on same file", () => {
		const state = translateFenToState("1r1rR3/1pkp4/3n4/8/5B2/1RR1B3/8/8 b - - 0 1");
		const moveSquares = moveCalculator(
			"C7",
			BLACK_KING,
			state,
			PIECE_COLORS.BLACK,
			kingMovesDefinitions[0].slice(1));

		console.log(moveSquares);
	});

});
