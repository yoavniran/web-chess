import { BLACK_KING, BLACK_PAWN, WHITE_KNIGHT, WHITE_PAWN } from "../../../../../consts";
import getFiftyMoveRuleCount from "../getFiftyMoveRuleCount";

describe("getFiftyMoveRuleCount tests", () => {

	it.each([
		[10, WHITE_PAWN, true, 0],
		[10, BLACK_PAWN, true, 0],
		[0, WHITE_KNIGHT, false, 1],
		[9, BLACK_KING, false, 10],
		[0, WHITE_KNIGHT, true, 0],
		[3, BLACK_PAWN, false, 0],
		[1, WHITE_PAWN, false, 0],
	])("for count %s, piece: %s, take = %s. expected count = %s",
		(count, symbol, isTake, expected) => {
			expect(getFiftyMoveRuleCount(count, symbol, isTake))
				.toBe(expected);
		});
});
