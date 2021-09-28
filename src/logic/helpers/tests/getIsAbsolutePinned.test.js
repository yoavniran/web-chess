import { BLACK_KING, BLACK_ROOK, PIECE_COLORS, WHITE_KING, WHITE_KNIGHT } from "consts";
import translateFenToState from "../../translateFenToState";
import findPieceTypeSquares from "../findPieceTypeSquares";
import getIsAbsolutePinned from "../getIsAbsolutePinned";
import getColorFromSymbol from "../getColorFromSymbol";

describe("getIsAbsolutePinned tests", () => {

	it.each([
		["2r5/1R2P2k/p3p1pp/3r2B1/5bb1/1B2N1P1/3K2PP/1q6 w - - 0 42", "E3", "F5", WHITE_KNIGHT, true],
		["1k6/1r6/8/8/5B2/8/1K6/8 w - - 0 1", "B7", "C7", BLACK_ROOK, false],
		["1k6/1r6/8/8/5B2/1R6/1K6/8 w - - 0 1", "B7", "C7", BLACK_ROOK, true],
	])("should return true for FEN: %s, square: %s, move: %s, symbol: %s. is absolute pin = %s",
		(fen, square, moveSquare, symbol, expected) => {
		const state = translateFenToState(fen);
		const color = getColorFromSymbol(symbol);

		expect(getIsAbsolutePinned(
			square,
			moveSquare,
			color,
			symbol,
			findPieceTypeSquares(state, color === PIECE_COLORS.WHITE ? WHITE_KING : BLACK_KING)[0],
			state)).toBe(expected);
	});
});
