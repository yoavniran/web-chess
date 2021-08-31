import translateFenToState from "../../translateFenToState";
import { INITIAL_FEN, PIECE_COLORS, WHITE_KNIGHT } from "../../../consts";
import getSquaresAfterMove from "../getSquaresAfterMove";

describe("getSquaresAfterMove tests", () => {

	it("should return updated squares for normal move", () => {

		const state = translateFenToState(INITIAL_FEN);

		const squares = getSquaresAfterMove(state.squares, "G1", "H3", WHITE_KNIGHT, PIECE_COLORS.WHITE);

		expect(squares.H3.isEmpty).toBe(false);
		expect(squares.H3.symbol).toBe(WHITE_KNIGHT);

		expect(squares.G1.isEmpty).toBe(true);
		expect(squares.G1.symbol).toBe(false);
	});

	it("should return updated squares after enpassant", () => {
		throw new Error("imp");
	});

	it("should return updated squares after castling", () => {
		throw new Error("imp");
	});
});
