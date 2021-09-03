import translateFenToState from "../../translateFenToState";
import { BLACK_PAWN, BLACK_ROOK, INITIAL_FEN, WHITE_KNIGHT, WHITE_PAWN } from "../../../consts";
import getMoveSquares from "../getMoveSquares";

describe("getMoveSquares tests", () => {
	it("should not calculate if not right turn", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("E7", BLACK_PAWN, state);
		expect(moves).toHaveLength(0);
	});

	it("should calculate for WHITE PAWN on B2", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("B2", WHITE_PAWN, state);
		expect(moves).toHaveLength(2);
	});

	it("should ignore turn if option is true", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("E7", BLACK_PAWN, state, { ignoreTurn: true });
		expect(moves).toHaveLength(2);
	});

	it("should use expected take option", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("B2", WHITE_PAWN, state, { expectedTake: ["C3"] });
		expect(moves).toHaveLength(3);
	});

	it("should not calculate if in check mate", () => {
		const state = translateFenToState("1r1r4/1pkp4/3n4/8/5B2/1RR4B/8/6K1 b - - 0 1");
		const moves = getMoveSquares("B8", BLACK_ROOK, state);

		expect(moves).toHaveLength(0);
	});

	it("should return 0 moves for absolutely pinned piece", () => {
		const state = translateFenToState("2r5/1R2P2k/p3p1pp/3r2B1/5bb1/1B2N1P1/3K2PP/1q6 w - - 0 42");
		const moves = getMoveSquares("E3", WHITE_KNIGHT, state);

		expect(moves).toHaveLength(0);
	});

	it("should return one square forward for pawn between its king and attacking rook ", () => {
		const state = translateFenToState("1r1r4/1pkp2p1/2pn4/1P6/5B2/7B/2R5/6KR b - - 0 1", true);
		const moves = getMoveSquares("C6", BLACK_PAWN, state);

		expect(moves).toHaveLength(1);
	});
});
