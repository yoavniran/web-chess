import { INITIAL_FEN, PIECE_COLORS, WHITE_KNIGHT, WHITE_PAWN } from "consts";
import translateFenToState from "../../../translateFenToState";
import calculateMovesFromSquare from "../calculateMovesFromSquare";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("moveCalculator tests", () => {

	it("should calculate moves for pawn from initial FEN", () => {
		const state = translateFenToState(INITIAL_FEN);

		const moveSquares = calculateMovesFromSquare("E2", WHITE_PAWN, state);

		expect(moveSquares).toHaveLength(2);
		expect(moveSquares[0]).toBe("E3");
		expect(moveSquares[1]).toBe("E4");
	});

	it("should calculate moves for white knight from initial FEN", () => {
		const state = translateFenToState(INITIAL_FEN);

		const moveSquares = calculateMovesFromSquare("G1", WHITE_KNIGHT, state);

		expect(moveSquares).toHaveLength(2);
		expect(moveSquares[0]).toBe("H3");
		expect(moveSquares[1]).toBe("F3");
	});

	it("should calculate for Black Queen - ignoring turn", () => {
		const state = translateFenToState("1r1r4/1p6/8/2p2b2/8/2K5/1n3q2/8 w - - 0 1");
		const moveSquares = calculateMovesFromSquare("F2", "q", state, { ignoreTurn:true});

		expect(moveSquares).toHaveLength(14);
		expect(findSquare("B2", moveSquares)).toBe(false);
		expect(findSquare("C5", moveSquares)).toBe(false);
		expect(findSquare("B6", moveSquares)).toBe(false);
		expect(findSquare("F6", moveSquares)).toBe(false);
		expect(findSquare("H4", moveSquares)).toBe(true);
		expect(findSquare("H2", moveSquares)).toBe(true);
		expect(findSquare("C2", moveSquares)).toBe(true);
	});

	it("should calculate for Black Queen - ignoring turn and expected take on B2", () => {
		const state = translateFenToState("1r1r4/1p6/8/2p2b2/8/2K5/1n3q2/8 w - - 0 1");
		const moveSquares = calculateMovesFromSquare("F2", "q", state, { ignoreTurn: true, expectedTake: ["B2"]});

		expect(moveSquares).toHaveLength(15);
		expect(findSquare("C5", moveSquares)).toBe(false);
		expect(findSquare("B6", moveSquares)).toBe(false);
		expect(findSquare("F6", moveSquares)).toBe(false);
		expect(findSquare("B2", moveSquares)).toBe(true);
		expect(findSquare("H4", moveSquares)).toBe(true);
		expect(findSquare("H2", moveSquares)).toBe(true);
		expect(findSquare("C2", moveSquares)).toBe(true);
	});

});
