import { BLACK_PAWN, WHITE_KING, WHITE_QUEEN } from "consts";
import getColorPositionAfterMove from "../getColorPositionAfterMove";

describe("getColorPositionAfterMove tests", () => {

	it("should move WHITE KING from E1 to D2", () => {
		const result = getColorPositionAfterMove({
			E1: WHITE_KING,
			D1: WHITE_QUEEN,
		}, "E1", "D2", WHITE_KING);

		expect(result.E1).toBeUndefined();
		expect(result.D2).toBe(WHITE_KING);
		expect(result.D1).toBe(WHITE_QUEEN);
	});

	it("should move BLACK PAWN from D7 to D5", () => {
		const result = getColorPositionAfterMove({
			D7: BLACK_PAWN,
			E7: BLACK_PAWN,
		}, "D7", "D5", BLACK_PAWN);

		expect(result.D7).toBeUndefined();
		expect(result.D5).toBe(BLACK_PAWN);
		expect(result.E7).toBe(BLACK_PAWN);
	});
});
