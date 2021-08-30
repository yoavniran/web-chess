import { BLACK_KING, CHECK_TYPES, INITIAL_FEN, WHITE_KING } from "consts";
import getCheckType from "../getCheckType";
import translateFenToState from "../../translateFenToState";

describe("getCheckType tests", () => {

	it.each([
		[INITIAL_FEN, BLACK_KING],
		[INITIAL_FEN, WHITE_KING],
		["4q3/3pP1rk/p1bB2pp/1P6/1P6/3Q2P1/5P1P/R3R1K1 b - - 0 29", WHITE_KING],
		["8/4k3/8/8/8/2K5/8/8 w - - 0 1", WHITE_KING],
		["3ppp2/3pk3/3ppp2/8/8/2K5/8/8 w - - 0 1", WHITE_KING],
		["3ppp2/3pkp2/3ppp2/8/8/2K5/8/8 w - - 0 1", WHITE_KING],
		["3ppp2/3pk3/3p1p2/8/8/2K5/8/8 w - - 0 1", WHITE_KING],
		["3ppp2/3pkp2/3p1p2/8/8/2K5/8/8 w - - 0 1", WHITE_KING],
	])("for: %s and king: %s, should return NONE", (fen, symbol) => {
		const state = translateFenToState(fen);
		expect(getCheckType(symbol, state)).toBe(CHECK_TYPES.NONE);
	});

	it.each([
		["4q3/3pP1rk/p1bB2pp/1P6/1P6/3Q2P1/5PKP/R3R3 w - - 0 29", WHITE_KING],
		["8/2p1P2k/p1bB2pp/2P4r/1P6/3Q2P1/5PKP/q7 w - - 0 29", WHITE_KING],
		["8/2p1P2k/p1bB2pp/2P4r/1P6/3B2P1/5PKP/q7 w - - 0 29", WHITE_KING],
		["8/2p1P2k/p1bB2pp/2P4r/1P6/6P1/5PKP/q7 w - - 0 29", WHITE_KING],
		["8/4pr2/4nk2/4r3/8/2B2Q2/8/6R1 b - - 0 1", WHITE_KING],
		["8/4pr2/4pk2/4r3/8/5Q2/8/6R1 b - - 0 1", WHITE_KING],
	])("for: %s and king: %s, should return CHECK", (fen, symbol) => {
		const state = translateFenToState(fen);
		expect(getCheckType(symbol, state)).toBe(CHECK_TYPES.CHECK);
	});

	it.each([
		// ["8/2p1P2k/p1b3pp/2P4r/1P3P2/6P1/5BKP/q7 w - - 0 29", WHITE_KING],
		["1r1r4/1pkp4/3n4/8/5B2/2R1B3/8/8 w - - 0 1", BLACK_KING],
	])("for: %s and king: %s, should return MATE", (fen, symbol) => {
		const state = translateFenToState(fen);
		expect(getCheckType(symbol, state)).toBe(CHECK_TYPES.MATE);
	});
});
