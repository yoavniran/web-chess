import {
	BLACK_BISHOP,
	BLACK_KNIGHT,
	BLACK_PAWN,
	INITIAL_FEN,
	WHITE_KING,
	WHITE_KNIGHT, WHITE_PAWN,
} from "consts";
import translateFenToState from "../../translateFenToState";
import findPieceTypeSquares from "../findPieceTypeSquares";

describe("findPieceTypeSquares tests", () => {
	it.each([
		[INITIAL_FEN, WHITE_KING, ["E1"]],
		[INITIAL_FEN, WHITE_KNIGHT, ["B1", "G1"]],
		[INITIAL_FEN, BLACK_KNIGHT, ["B8", "G8"]],
		["rnbqkbnr/p1p5/8/3p4/4p2P/6P1/3P1P2/RNBQKBNR w KQkq - 0 1", BLACK_PAWN, ["A7", "C7", "D5", "E4"]],
		["rnbqkbnr/p1p5/8/3p4/4p2P/6P1/3P1P2/RNBQKBNR w KQkq - 0 1", WHITE_PAWN, ["H4", "G3", "D2", "F2"]],
		["rn1qk1nr/p1p5/8/3p4/1b2p1bP/6P1/3P1P2/RNBQKBNR w KQkq - 0 1", BLACK_BISHOP, ["B4", "G4"]],
	])("should find pieces squares for FEN: %s, piece: %s, on squares: %s", (fen, symbol, expected) => {
		const state = translateFenToState(fen);

		expect(findPieceTypeSquares(state, symbol))
			.toEqual(expected);
	});
});
