import translateFenToState from "../../translateFenToState";
import {
	BLACK_KING,
	BLACK_PAWN,
	BLACK_ROOK,
	CHECK_TYPES,
	INITIAL_FEN, MOVE_TYPES,
	WHITE_KNIGHT,
	WHITE_PAWN,
} from "../../../consts";
import getNextMoves from "../getNextMoves";

describe("getMoveSquares tests", () => {
	it("should not calculate if not right turn", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getNextMoves("E7", BLACK_PAWN, state);
		expect(moves).toHaveLength(0);
	});

	it("should calculate for WHITE PAWN on B2", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getNextMoves("B2", WHITE_PAWN, state);
		expect(Object.keys(moves)).toHaveLength(2);
		expect(moves["B3"].type).toBe(MOVE_TYPES.MOVE);
		expect(moves["B4"].type).toBe(MOVE_TYPES.MOVE);
	});

	it("should ignore turn if option is true", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getNextMoves("E7", BLACK_PAWN, state, { ignoreTurn: true });
		expect(Object.keys(moves)).toHaveLength(2);
	});

	it("should use expected take option", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getNextMoves("B2", WHITE_PAWN, state, { expectedTake: ["C3"] });
		expect(Object.keys(moves)).toHaveLength(3);
	});

	it("should not calculate if in check mate", () => {
		const state = translateFenToState("1r1r4/1pkp4/3n4/8/5B2/1RR4B/8/6K1 b - - 0 1");
		const moves = getNextMoves("B8", BLACK_ROOK, state);

		expect(Object.keys(moves)).toHaveLength(0);
	});

	it("should return 0 moves for absolutely pinned piece", () => {
		const state = translateFenToState("2r5/1R2P2k/p3p1pp/3r2B1/5bb1/1B2N1P1/3K2PP/1q6 w - - 0 42");
		const moves = getNextMoves("E3", WHITE_KNIGHT, state);

		expect(Object.keys(moves)).toHaveLength(0);
	});

	it("should return one square forward for pawn between its king and attacking rook ", () => {
		const state = translateFenToState("1r1r4/1pkp2p1/2pn4/1P6/5B2/7B/2R5/6KR b - - 0 1", true);
		const moves = getNextMoves("C6", BLACK_PAWN, state);

		expect(Object.keys(moves)).toHaveLength(1);
	});

	it("should allow king to take bishop giving check", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("D7", { square: "D5" })
			.updateWithNextMove("F1", { square: "B5" })
			.updateWithNextMove("D8", { square: "D7" })
			.updateWithNextMove("B5", { square: "D7" });

		const moves = getNextMoves("E8", BLACK_KING, state);

		expect(moves["D7"].type).toBe(MOVE_TYPES.MOVE);
		expect(moves["D8"].type).toBe(MOVE_TYPES.MOVE);
	});

	it("should not allow enpassant if pawn is in absolute pin", () => {
		throw new Error("IMP!");
	});
});
