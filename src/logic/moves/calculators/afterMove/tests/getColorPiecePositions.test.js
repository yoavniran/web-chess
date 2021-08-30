import { BLACK_KING, BLACK_PAWN, PIECE_COLORS, WHITE_KING, WHITE_QUEEN } from "consts";
import getColorPositionAfterMove from "../getColorPiecePositions";

describe("getColorPositionAfterMove tests", () => {

	it("should move WHITE KING from E1 to D2", () => {
		const result = getColorPositionAfterMove(PIECE_COLORS.WHITE, [
			{ name: "E1", symbol: WHITE_KING, pieceColor: PIECE_COLORS.WHITE },
			{ name: "D1", symbol: WHITE_QUEEN, pieceColor: PIECE_COLORS.WHITE },
			{ name: "E8", symbol: BLACK_KING, pieceColor: PIECE_COLORS.BLACK },
			{ name: "B7", symbol: BLACK_PAWN, pieceColor: PIECE_COLORS.BLACK },
		]);

		expect(result.E1).toBe(WHITE_KING);
		expect(result.D1).toBe(WHITE_QUEEN);
		expect(result.E8).toBeUndefined();
		expect(result.B7).toBeUndefined();
	});

	it("should move BLACK PAWN from D7 to D5", () => {
		const result = getColorPositionAfterMove(PIECE_COLORS.BLACK, [
			{ name: "E1", symbol: WHITE_KING, pieceColor: PIECE_COLORS.WHITE },
			{ name: "D1", symbol: WHITE_QUEEN, pieceColor: PIECE_COLORS.WHITE },
			{ name: "E8", symbol: BLACK_KING, pieceColor: PIECE_COLORS.BLACK },
			{ name: "B7", symbol: BLACK_PAWN, pieceColor: PIECE_COLORS.BLACK },
		]);


		expect(result.E1).toBeUndefined();
		expect(result.D1).toBeUndefined();
		expect(result.E8).toBe(BLACK_KING);
		expect(result.B7).toBe(BLACK_PAWN);
	});
})
;
