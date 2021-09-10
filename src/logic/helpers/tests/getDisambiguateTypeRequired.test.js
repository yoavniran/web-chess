import { BLACK_QUEEN, BLACK_ROOK, NOTATION_DISAMBIGUATION_TYPES, WHITE_KNIGHT } from "consts";
import translateFenToState from "../../translateFenToState";
import getDisambiguateTypeRequired from "../getDisambiguateTypeRequired";
import getColorFromSymbol from "../getColorFromSymbol";

describe("getDisambiguateTypeRequired tests", () => {
	it.each([
		["1k1r4/8/8/8/8/2N1N3/1P6/1K6 w - - 0 1", "C3", "D5", WHITE_KNIGHT, NOTATION_DISAMBIGUATION_TYPES.COLUMN],
		["1k1r4/8/8/8/8/2N1N3/1P6/1K6 w - - 0 1", "E3", "D5", WHITE_KNIGHT, NOTATION_DISAMBIGUATION_TYPES.COLUMN],
		["1k1r4/8/8/8/8/2N5/1P6/1K6 w - - 0 1", "C3", "D5", WHITE_KNIGHT, NOTATION_DISAMBIGUATION_TYPES.NONE],
		["1k6/3r4/8/8/N7/4N3/1P6/1K6 w - - 2 2", "E3", "D5", WHITE_KNIGHT, NOTATION_DISAMBIGUATION_TYPES.NONE],
		["1k1r4/8/q7/8/8/2N5/1P4q1/1K6 b - - 0 1", "G2", "F1", BLACK_QUEEN, NOTATION_DISAMBIGUATION_TYPES.COLUMN],
		["1k1r4/8/q7/8/8/2N5/1P4q1/1K6 b - - 0 1", "A6", "F1", BLACK_QUEEN, NOTATION_DISAMBIGUATION_TYPES.COLUMN],
		["1k6/8/q6r/N7/8/N7/1P1N3r/1K6 w - - 0 1", "H2", "H3", BLACK_ROOK, NOTATION_DISAMBIGUATION_TYPES.ROW],
		["1k6/8/q6r/N7/8/N7/1P1N3r/1K6 w - - 0 1", "H6", "H4", BLACK_ROOK, NOTATION_DISAMBIGUATION_TYPES.ROW],
		["1k6/8/q6r/N7/8/N7/1P1N3r/1K6 w - - 0 1", "A3", "C4", WHITE_KNIGHT, NOTATION_DISAMBIGUATION_TYPES.ROW],
		["1k6/8/q6r/N7/8/N7/1P1N3r/1K6 w - - 0 1", "A5", "C4", WHITE_KNIGHT, NOTATION_DISAMBIGUATION_TYPES.ROW],
		["1k6/8/q6r/N7/8/N7/1P1N3r/1K6 w - - 0 1", "D2", "C4", WHITE_KNIGHT, NOTATION_DISAMBIGUATION_TYPES.COLUMN],
	])("for %s, move from %s to %s should find need for disambiguate = %s",
		(fen, from, to, symbol, expected) => {
			const state = translateFenToState(fen);
			const color = getColorFromSymbol(symbol);

			expect(getDisambiguateTypeRequired(from, to, symbol, color, state))
				.toBe(expected);
		});
});
