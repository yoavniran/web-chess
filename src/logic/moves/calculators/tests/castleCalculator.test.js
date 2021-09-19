import { BLACK_KING, INITIAL_FEN, MOVE_TYPES, PIECE_COLORS, WHITE_KING } from "consts";
import translateFenToState from "logic/translateFenToState";
import getColorFromSymbol from "logic/helpers/getColorFromSymbol";
import castleCalculator from "../castleCalculator";

describe("castleCalculator tests", () => {
	it.each([
		[INITIAL_FEN, "E1", WHITE_KING, []],
		["rnbqkbnr/pp2pp1p/2p3p1/3p4/8/5NP1/PPPPPPBP/RNBQK2R w KQkq - 0 4", "E1", WHITE_KING, ["G1"]],
		["rnbqkbnr/pp2pp1p/2p3p1/3p4/8/5NP1/PPPPPPBP/RNBQK1R1 b Qkq - 1 4", "E1", WHITE_KING, []],
		["rn1qkbnr/pp2pp1p/2p3p1/3p4/8/5NPb/PPPPPP1P/RNBQK2R w KQkq - 0 5", "E1", WHITE_KING, []],
		["rn1qkbnr/p3p2p/1p3pp1/2pp4/5B2/2NP1NPb/PPPQPP1P/R3K2R b KQkq - 1 8", "E1", WHITE_KING, ["C1"]],
		["rn1qkbnr/p3p2p/1p3pp1/2pp1b2/5B2/2NP1NP1/PPPQPP1P/R3K1R1 b Qkq - 3 9", "E1", WHITE_KING, ["C1"]],
		["rn1qkbnr/p3p2p/1p3pp1/2pp4/5Bb1/2NP1NP1/PPPQPP1P/1R2K1R1 b kq - 5 10", "E1", WHITE_KING, []],
		["r3kbnr/p1q1p2p/1pn2pp1/2pp4/3P1Bb1/2N2NP1/PPPQPP1P/1R2K1R1 w kq - 1 12", "E8", BLACK_KING, ["C8"]],
		["r3kbnr/p1B1p2p/1pn2pp1/2pp4/3P2b1/2N2NP1/PPPQPP1P/1R2K1R1 b kq - 0 12", "E8", BLACK_KING, []],
		["r3k2r/p1B1n2p/1pn1pppb/2Pp4/6b1/2NQ1NP1/PPP1PP1P/1R2K1R1 b kq - 2 15", "E8", BLACK_KING, ["G8"]]
	])("should calculate castle moves for FEN: %s, for king: %s, %s", (fen, square, symbol, expected) => {
		const state = translateFenToState(fen);
		const castleMoves = castleCalculator(square, symbol, state, getColorFromSymbol(symbol));

		expect(castleMoves).toEqual(expected.map((square) => ({ square, type: MOVE_TYPES.CASTLE })));
	});

	it("should prevent king-side castle because of bishop target", () => {
		const state = translateFenToState("r3kbnr/p3p2p/1pnB1pp1/2pp4/3P2b1/2N2NP1/PPPQPP1P/1R2K1R1 w kq - 0 12");

		expect(castleCalculator("E8", BLACK_KING, state, PIECE_COLORS.BLACK)).toEqual([{
			square: "C8",
			type: MOVE_TYPES.CASTLE,
		}]);

		expect(castleCalculator("E8", BLACK_KING, state.updateWithNextMove("D6", "C7"), PIECE_COLORS.BLACK)).toEqual([]);
	});


});
