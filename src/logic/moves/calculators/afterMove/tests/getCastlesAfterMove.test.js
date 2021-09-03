import { PIECE_COLORS, } from "consts";
import translateFenToState from "logic/translateFenToState";
import { isEmptyChar } from "logic/helpers/is";
import getCastlesAfterMove from "../getCastlesAfterMove";

describe("getCastlesAfterMove tests", () => {
	it("should leave empty castles", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w - - 9 13");
		const castles = getCastlesAfterMove(state, "K", PIECE_COLORS.WHITE, "E2");

		expect(isEmptyChar(castles)).toBe(true);
	});

	it("should disable WHITE King castling for king move", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w KQ - 9 13");
		const castles = getCastlesAfterMove(state, "K", PIECE_COLORS.WHITE, "E1");

		expect(isEmptyChar(castles)).toBe(true);
	});

	it("should disable WHITE King castling for king move - leave BLACK castles", () => {
		const state = translateFenToState("rnbqkbnr/ppp2ppp/3pp3/8/2B5/4PN2/PPPP1PPP/RNBQK2R b KQkq - 1 3");
		const castles = getCastlesAfterMove(state, "K", PIECE_COLORS.WHITE, "E1");
		expect(castles).toBe("kq");
	});

	it("should disable WHITE King side castling for H Rook move", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w KQ - 9 13");
		const castles = getCastlesAfterMove(state, "R", PIECE_COLORS.WHITE, "H1");

		expect(castles).toBe("Q");
	});

	it("should disable WHITE Queen side castling for A Rook move", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w KQ - 9 13");
		const castles = getCastlesAfterMove(state, "R", PIECE_COLORS.WHITE, "A1");

		expect(castles).toBe("K");
	});

	it("should disable BLACK King castling for king move", () => {
		const state = translateFenToState("r1bqk1r1/ppp3pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R b kq - 9 13");
		const castles = getCastlesAfterMove(state, "k", PIECE_COLORS.BLACK, "E8");

		expect(isEmptyChar(castles)).toBe(true);
	});

	it("should disable BLACK King castling for king move - leave WHITE castles", () => {
		const state = translateFenToState("r1bqk1r1/ppp3pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R b KQkq - 9 13");
		const castles = getCastlesAfterMove(state, "k", PIECE_COLORS.BLACK, "E8");

		expect(castles).toBe("KQ");
	});

	it("should disable BLACK King side castling for H Rook move", () => {
		const state = translateFenToState("r1bqk2r/ppp3pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R b KQkq - 9 13");
		const castles = getCastlesAfterMove(state, "r", PIECE_COLORS.BLACK, "H8");

		expect(castles).toBe("KQq");
	});

	it("should disable BLACK Queen side castling for A Rook move", () => {
		const state = translateFenToState("r1bqk2r/ppp3pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R b KQkq - 9 13");
		const castles = getCastlesAfterMove(state, "r", PIECE_COLORS.BLACK, "A8");

		expect(castles).toBe("KQk");
	});
});
