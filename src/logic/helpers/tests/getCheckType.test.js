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
		["4q3/3pP1rk/p1bB2pp/1P6/1P6/3Q2P1/5PKP/R3R3 w - - 0 29", WHITE_KING], //king can move, pawn can block, pawn can take
		["8/4P1rk/p1bBp1pp/P7/1P6/6PN/5RKP/q7 w - - 0 29", WHITE_KING], //only rook can block
		["8/1R2P1rk/p1bBp1pp/8/1P6/6PN/5PKP/q7 w - - 0 29", WHITE_KING], //only pawn can block
		["8/1R2Pr1k/p1bBp1pp/1P6/8/6PN/6KP/q7 w - - 0 29", WHITE_KING], //only pawn can take to get out
		["2r5/1R2P2k/p3p1pp/3r2B1/5bb1/1B2N1P1/3K2PP/1q6 w - - 0 42", WHITE_KING], //only bishop can take, knight is pinned
		["8/2p1P2k/p1bB2pp/2P4r/1P6/3Q2P1/5PKP/q7 w - - 0 29", WHITE_KING],
		["8/2p1P2k/p1bB2pp/2P4r/1P6/3B2P1/5PKP/q7 w - - 0 29", WHITE_KING],
		["8/2p1P2k/p1bB2pp/2P4r/1P6/6P1/5PKP/q7 w - - 0 29", WHITE_KING],
		["8/4pr2/4nk2/4r3/8/2B2Q2/8/6R1 b - - 0 1", BLACK_KING],
		["8/4pr2/4pk2/4r3/8/5Q2/8/1K4R1 b - - 0 20", BLACK_KING],
		["1k6/3bP1r1/p2Bp1pp/P7/1RP5/6PN/6KP/q7 b - - 0 29", BLACK_KING], //double check - king has to move
		["1k6/3BPbr1/p1N1p1pp/P1BN4/1RP5/6P1/6KP/q7 b - - 0 29", BLACK_KING], //double check with knight
		["8/1R2P1rk/p1PBp1pp/8/8/6PN/6KP/5q2 w - - 1 33", WHITE_KING], //king takes queen to get out of check
		["1r1r4/1pkp4/3n4/6B1/8/1RR4B/8/6K1 b - - 0 1", BLACK_KING], //knight can move to block
	])("for: %s and king: %s, should return CHECK", (fen, symbol) => {
		const state = translateFenToState(fen);
		expect(getCheckType(symbol, state)).toBe(CHECK_TYPES.CHECK);
	});

	it.each([
		["8/2p1P2k/p1b3pp/2P4r/1P3P2/6P1/5BKP/q7 w - - 0 29", WHITE_KING],
		["8/4P1rk/p2Bp1pp/3b4/1P6/6PN/5BKP/q7 w - - 0 30", WHITE_KING],
		["1r1r4/1pkp4/3n4/8/5B2/2R1B3/8/7K b - - 0 1", BLACK_KING], //block is pinned to king
		["8/1R2Pr1k/p1PBp1pp/8/8/6PN/6KP/5q2 w - - 1 30", WHITE_KING], //queen check mates
		["2r5/1R2P2k/p3p1pp/3r2B1/B4bb1/4N1P1/3K2PP/1q6 w - - 0 29", WHITE_KING], //knight is pinned
		["2nr4/R1pkp3/3p3R/1B3r2/8/5PPQ/6K1/8 b - - 0 1", BLACK_KING], //Rook F5 is pinned, pawn on C7 is pinned
		["8/4pr2/4nk2/4Q3/8/2B5/8/K5R1 b - - 0 1", BLACK_KING],
	])("for: %s and king: %s, should return MATE", (fen, symbol) => {
		const state = translateFenToState(fen);
		expect(getCheckType(symbol, state)).toBe(CHECK_TYPES.MATE);
	});
});
