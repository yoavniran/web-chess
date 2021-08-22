import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import translateFenToState from "../../../../translateFenToState";
import getAllMoveSquares from "../../getAllMoveSquares";
import filterCanBeTakenSquares from "../filterCanBeTakenSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterCanBeTakenSquares tests", () => {

	it.each([
		["1r1r4/1p6/8/2p2b2/8/2K5/1n3q2/8 w - - 0 1", "C3", 1, ["B3"], ["C2", "D3", "D4", "B4"]],
		["1r1r4/1p6/8/5b2/8/2K5/1n3q2/8 w - - 0 1", "C3", 2, ["B3", "B4"], ["C2", "D3", "D4"]],
		["1r6/1p6/8/2p5/8/2K5/8/8 w - - 0 1", "C3", 6, ["C4", "B3", "D3", "C2", "B2", "D2"], ["B4", "D4"]]
	])("should filter out squares can be taken on for FEN: %s from %s", (fen, startSquare, count, allowedSquares, notAllowed) => {
		const state = translateFenToState(fen);

		const kingMoveSquares = getAllMoveSquares(
			startSquare,
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.SIDEWAYS |
			MOVE_DIRECTIONS.FORWARD |
			MOVE_DIRECTIONS.BACKWARD |
			MOVE_DIRECTIONS.DIAGONAL,
			1);

		const filtered = filterCanBeTakenSquares(startSquare, PIECE_COLORS.WHITE, kingMoveSquares, state);

		expect(filtered).toHaveLength(count);

		allowedSquares.forEach((s) =>
			expect(findSquare(s, filtered)).toBe(true));

		notAllowed.forEach((s) =>
			expect(findSquare(s, filtered)).toBe(false));
	});

});
