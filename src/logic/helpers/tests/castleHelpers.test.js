import { CASTLE_SIDES, PIECE_COLORS } from "consts";
import { getCanCastle } from "../castleHelpers";

describe("getCanCastle tests", () => {
	it.each([
		["KQkq", PIECE_COLORS.WHITE, null, true],
		["KQ", PIECE_COLORS.WHITE, null, true],
		["KQkq", PIECE_COLORS.WHITE, CASTLE_SIDES.KING, true],
		["KQkq", PIECE_COLORS.WHITE, CASTLE_SIDES.QUEEN, true],
		["KQk", PIECE_COLORS.WHITE, CASTLE_SIDES.QUEEN, true],
		["K", PIECE_COLORS.WHITE, CASTLE_SIDES.KING, true],
		["Q", PIECE_COLORS.WHITE, CASTLE_SIDES.QUEEN, true],
		["", PIECE_COLORS.WHITE, CASTLE_SIDES.KING, false],
		["", PIECE_COLORS.WHITE, CASTLE_SIDES.QUEEN, false],
		["k", PIECE_COLORS.WHITE, CASTLE_SIDES.QUEEN, false],
		["q", PIECE_COLORS.WHITE, CASTLE_SIDES.KING, false],

		["KQkq", PIECE_COLORS.BLACK, null, true],
		["kq", PIECE_COLORS.BLACK, null, true],
		["KQkq", PIECE_COLORS.BLACK, CASTLE_SIDES.KING, true],
		["KQkq", PIECE_COLORS.BLACK, CASTLE_SIDES.QUEEN, true],
		["Kkq", PIECE_COLORS.BLACK, CASTLE_SIDES.QUEEN, true],
		["k", PIECE_COLORS.BLACK, CASTLE_SIDES.KING, true],
		["q", PIECE_COLORS.BLACK, CASTLE_SIDES.QUEEN, true],
		["", PIECE_COLORS.BLACK, CASTLE_SIDES.KING, false],
		["", PIECE_COLORS.BLACK, CASTLE_SIDES.QUEEN, false],
		["K", PIECE_COLORS.BLACK, CASTLE_SIDES.QUEEN, false],
		["Q", PIECE_COLORS.BLACK, CASTLE_SIDES.KING, false],
	])("for %s, %s castling to side: %s should be: %s",
		(castles, color, side, expected) => {
			expect(getCanCastle(castles, color, side)).toBe(expected);
		});
});
