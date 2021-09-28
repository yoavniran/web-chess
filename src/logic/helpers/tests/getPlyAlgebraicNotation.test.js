import {
	PIECES_EMOJIS,
	CHECK_TYPES,
	NOTATION_DISAMBIGUATION_TYPES,
	BLACK_PAWN,
	WHITE_PAWN,
	BLACK_QUEEN,
	BLACK_ROOK,
	WHITE_ROOK,
	BLACK_KNIGHT,
	WHITE_KING,
	BLACK_KING,
	MOVE_TYPES,
} from "consts";
import getPlyAlgebraicNotation from "../getPlyAlgebraicNotation";

describe("getPlyAlgebraicNotation tests", () => {
	it.each([
		[{
			previous: "C2",
			target: "C4",
			symbol: WHITE_PAWN,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.NONE,
			take: null,
		}, "C4", "C4"],
		[{
			previous: "C4",
			target: "D5",
			symbol: WHITE_PAWN,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.NONE,
			take: { symbol: BLACK_PAWN },
		}, "CxD5", "CxD5"],
		[{
			previous: "D4",
			target: "A1",
			symbol: BLACK_QUEEN,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.NONE,
			take: { symbol: BLACK_ROOK },
			check: CHECK_TYPES.CHECK,
		}, `${BLACK_QUEEN}xA1+`, `${PIECES_EMOJIS[BLACK_QUEEN]}xA1+`],
		[{
			previous: "C1",
			target: "C8",
			symbol: WHITE_ROOK,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.COLUMN,
			check: CHECK_TYPES.MATE,
		}, `${WHITE_ROOK}CC8#`, `${PIECES_EMOJIS[WHITE_ROOK]}CC8#`],
		[{
			previous: "C1",
			target: "C8",
			symbol: WHITE_ROOK,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.COLUMN,
			check: CHECK_TYPES.MATE,
			take: { symbol: BLACK_KNIGHT },
		}, `${WHITE_ROOK}CxC8#`, `${PIECES_EMOJIS[WHITE_ROOK]}CxC8#`],
		[{
			previous: "H5",
			target: "F4",
			symbol: BLACK_KNIGHT,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.ROW,
		}, `${BLACK_KNIGHT}5F4`, `${PIECES_EMOJIS[BLACK_KNIGHT]}5F4`],
		[{
			previous: "E1",
			target: "C1",
			moveType: MOVE_TYPES.CASTLE,
			symbol: WHITE_KING,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.NONE,
		}, "O-O-O", "O-O-O"],
		[{
			previous: "E1",
			target: "G1",
			moveType: MOVE_TYPES.CASTLE,
			symbol: WHITE_KING,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.NONE,
		}, "O-O", "O-O"],
		[{
			previous: "E8",
			target: "C8",
			moveType: MOVE_TYPES.CASTLE,
			symbol: BLACK_KING,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.NONE,
		}, "O-O-O", "O-O-O"],
		[{
			previous: "E8",
			target: "G8",
			moveType: MOVE_TYPES.CASTLE,
			symbol: BLACK_KING,
			disambiguationNeeded: NOTATION_DISAMBIGUATION_TYPES.NONE,
		}, "O-O", "O-O"],
	])("for ply: %s, should notate as: %s & %s",
		(ply, expectedNormal, expectedEmoji) => {
			const result = getPlyAlgebraicNotation(ply);

			expect(result.normal).toBe(expectedNormal);
			expect(result.emoji).toBe(expectedEmoji);
		});
});
