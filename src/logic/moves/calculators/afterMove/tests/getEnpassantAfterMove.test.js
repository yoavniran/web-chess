import { INITIAL_FEN } from "consts";
import translateFenToState from "logic/translateFenToState";
import getColorFromSymbol from "logic/helpers/getColorFromSymbol";
import getEnpassantAfterMove from "../getEnpassantAfterMove";

describe("getEnpassantAfterMove tests", () => {

	it.each([
		[INITIAL_FEN, "P", "E2", "E4", "E3"],
		[INITIAL_FEN, "N", "G1", "H3", false],
		[INITIAL_FEN, "p", "H7", "H5", "H6"],
		[INITIAL_FEN, "P", "E2", "E3", false],
		[INITIAL_FEN, "p", "H7", "G6", false],
		[INITIAL_FEN, "Q", "D1", "F3", false],
		[INITIAL_FEN, "P", "A2", "A4", "A3"],
	])("enpassant for: %s,  %s - from: %s to: %s = %s",
		(fen, symbol, start, target, expected) => {
			const color = getColorFromSymbol(symbol);
			const state = translateFenToState(fen);

			expect(getEnpassantAfterMove(state, symbol, color, start, target))
				.toBe(expected);
		});
});
