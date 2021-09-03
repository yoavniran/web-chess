import {
	BLACK_BISHOP,
	BLACK_KING,
	BLACK_PAWN, BLACK_ROOK,
	PIECE_COLORS,
	WHITE_KING, WHITE_KNIGHT,
	WHITE_PAWN,
	WHITE_ROOK,
} from "consts";
import translateFenToState from "../../../../translateFenToState";
import filterAbsolutePinSquares from "../filterAbsolutePinSquares";

describe("filterAbsolutePinSquares tests", () => {
	it("should return one square forward for pawn between its king and attacking rook ", () => {
		const state = translateFenToState("1r1r4/1pkp2p1/2pn4/1P6/5B2/7B/2R5/6KR b - - 0 1", true);

		const moves = filterAbsolutePinSquares(
			"C6",
			BLACK_PAWN,
			PIECE_COLORS.BLACK,
			["C5", "B5"],
			state);

		expect(moves).toHaveLength(1);
	});

	it("should return only forward squares for rook between its king and attacking rook", () => {
		const state = translateFenToState("2kr4/1p1p1pp1/2r5/8/8/7B/P1R5/6KR b - - 0 1");

		const moves = filterAbsolutePinSquares(
			"C6",
			BLACK_ROOK,
			PIECE_COLORS.BLACK,
			["A6", "B6", "D6", "E6", "F6", "G6", "H6", "C7", "C5", "C4", "C3", "C2"],
			state,
		);

		expect(moves).toHaveLength(5);
		expect(moves.includes("C7")).toBe(true);
		expect(moves.includes("C5")).toBe(true);
		expect(moves.includes("C4")).toBe(true);
		expect(moves.includes("C3")).toBe(true);
		expect(moves.includes("C2")).toBe(true);
	});


	it("should return 0 squares for bishop pinned to king by attacking rook", () => {
		const state = translateFenToState("2kr4/1p1p1pp1/2b5/8/8/7B/P1R5/6KR b - - 0 1");

		const moves = filterAbsolutePinSquares(
			"C6",
			BLACK_BISHOP  ,
			PIECE_COLORS.BLACK,
			["D5", "E4", "F3", "G2", "H1", "B5", "A4", "D7"],
			state
		);

		expect(moves).toHaveLength(0);
	});

	it("should return 0 squares for knight pinned to king by attacking queen", () => {
		const state = translateFenToState("2kr4/1p1p1pp1/1qr5/8/8/7B/P1R2N2/6KR w - - 0 1");

		const moves = filterAbsolutePinSquares(
			"F2",
			WHITE_KNIGHT,
			PIECE_COLORS.WHITE,
			["E4", "G4", "D1"],
			state
		);

		expect(moves).toHaveLength(0);
	});
});
