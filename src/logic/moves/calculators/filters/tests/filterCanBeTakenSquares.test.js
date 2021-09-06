import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import translateFenToState from "../../../../translateFenToState";
import calculatePieceAllMoveSquares from "../../calculatePieceAllMoveSquares";
import filterCanBeTakenSquares from "../filterCanBeTakenSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterCanBeTakenSquares tests", () => {

	it.each([
		["1r1r2k1/1p6/8/2p2b2/8/2K5/1n3q2/8 w - - 0 1", "C3", 1, ["B3"], ["C2", "C3", "D3", "D4", "B4", "D2" ]],
		["1r1r4/1p6/8/5b2/8/2K5/1n3q2/8 w - - 0 1", "C3", 2, ["B3", "B4"], ["C2", "D3", "D4"]],
		["1r6/1p6/8/2p5/8/2K5/8/8 w - - 0 1", "C3", 6, ["C4", "B3", "D3", "C2", "B2", "D2"], ["B4", "D4"]],
		["4q3/3pP1rk/p1bB2pp/1P6/1P6/3Q2P1/5P1P/R3R1K1 w - - 0 29", "G1", 3, ["F1", "H2", "F2"], ["H1", "G2"]],
		["3ppp2/3pkp2/3p1p2/8/8/2K5/8/8 w - - 0 1", "C3", 8, ["B2","C2","D2","B3","D3","B4","C4","D4",], []],
		["3ppp2/3pkp2/3p4/6P1/4K3/8/8/8 w - - 0 1", "E4", 7, ["D5", "F5","F4","F3","E3","D3","D4",], ["E5"]],
		["3ppp2/3p1p2/3pk3/8/4K1P1/8/8/8 w - - 0 1", "E4", 5, ["F4","F3","E3","D3","D4",], ["D5","E5", "F5"]],
		["1r1r4/1pkp4/3n4/8/5B2/1RR1B3/8/6K1 b - - 0 1", "C7", 0, [], ["B6","C6", "C8", "D5"]],
	])("should filter out squares can be taken on for FEN: %s from %s",
		(fen, startSquare, count, allowedSquares, notAllowed) => {
			const state = translateFenToState(fen);

			const kingMoveSquares = calculatePieceAllMoveSquares(
				startSquare,
				state.turn,
				MOVE_DIRECTIONS.SIDEWAYS |
				MOVE_DIRECTIONS.FORWARD |
				MOVE_DIRECTIONS.BACKWARD |
				MOVE_DIRECTIONS.DIAGONAL,
				1);

			console.log("FILTERING ----------------");

			const filtered = filterCanBeTakenSquares(PIECE_COLORS.WHITE, startSquare, kingMoveSquares, state);

			expect(filtered).toHaveLength(count);

			allowedSquares.forEach((s) =>
				expect(findSquare(s, filtered)).toBe(true));

			notAllowed.forEach((s) =>
				expect(findSquare(s, filtered)).toBe(false));
		});

});
