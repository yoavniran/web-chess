import {
	BLACK_KING,
	BLACK_PAWN,
	BLACK_QUEEN,
	BLACK_ROOK,
	WHITE_PAWN,
	WHITE_QUEEN,
	WHITE_KING,
	WHITE_ROOK,
	BLACK_KNIGHT,
	BLACK_BISHOP,
	WHITE_KNIGHT,

	INITIAL_FEN,
	PIECE_COLORS,
	CHECK_TYPES,
} from "consts";
import translateFenToState from "../translateFenToState";

const getSquareSymbol = (name, squares) => squares[name].symbol;

describe("translateFenToState tests", () => {

	it("should translate initial position for White", () => {
		const state = translateFenToState(INITIAL_FEN);

		expect(getSquareSymbol("A1", state.squares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("H1", state.squares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("E1", state.squares)).toBe(WHITE_KING);
		expect(getSquareSymbol("D1", state.squares)).toBe(WHITE_QUEEN);
		expect(getSquareSymbol("G1", state.squares)).toBe(WHITE_KNIGHT);
		expect(getSquareSymbol("B2", state.squares)).toBe(WHITE_PAWN);
		expect(getSquareSymbol("H2", state.squares)).toBe(WHITE_PAWN);

		expect(getSquareSymbol("A8", state.squares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("H8", state.squares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("E8", state.squares)).toBe(BLACK_KING);
		expect(getSquareSymbol("D8", state.squares)).toBe(BLACK_QUEEN);
		expect(getSquareSymbol("B7", state.squares)).toBe(BLACK_PAWN);
		expect(getSquareSymbol("H7", state.squares)).toBe(BLACK_PAWN);

		expect(state.move).toBe(0);
		expect(state.turn).toBe(PIECE_COLORS.WHITE);


		expect(Object.keys(state.blackPositions)).toHaveLength(16);
		expect(Object.keys(state.whitePositions)).toHaveLength(16);

		expect(state.blackPositions["A7"]).toBe(BLACK_PAWN);
		expect(state.blackPositions["G8"]).toBe(BLACK_KNIGHT);

		expect(state.whitePositions["E1"]).toBe(WHITE_KING);
		expect(state.whitePositions["B2"]).toBe(WHITE_PAWN);
	});

	it("should translate initial position for Black", () => {
		const state = translateFenToState(INITIAL_FEN, true);

		expect(getSquareSymbol("A1", state.squares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("H1", state.squares)).toBe(WHITE_ROOK);
		expect(getSquareSymbol("E1", state.squares)).toBe(WHITE_KING);
		expect(getSquareSymbol("D1", state.squares)).toBe(WHITE_QUEEN);
		expect(getSquareSymbol("G1", state.squares)).toBe(WHITE_KNIGHT);
		expect(getSquareSymbol("B2", state.squares)).toBe(WHITE_PAWN);
		expect(getSquareSymbol("H2", state.squares)).toBe(WHITE_PAWN);

		expect(getSquareSymbol("A8", state.squares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("H8", state.squares)).toBe(BLACK_ROOK);
		expect(getSquareSymbol("E8", state.squares)).toBe(BLACK_KING);
		expect(getSquareSymbol("D8", state.squares)).toBe(BLACK_QUEEN);
		expect(getSquareSymbol("G8", state.squares)).toBe(BLACK_KNIGHT);
		expect(getSquareSymbol("B7", state.squares)).toBe(BLACK_PAWN);
		expect(getSquareSymbol("H7", state.squares)).toBe(BLACK_PAWN);

		expect(state.move).toBe(0);
		expect(state.turn).toBe(PIECE_COLORS.WHITE);
	});

	it("should translate advanced position for White", () => {
		const state = translateFenToState("4q3/3pP1rk/p1bB2pp/1P6/1P6/3Q2P1/5P1P/R3R1K1 b - - 0 29");

		expect(getSquareSymbol("E8", state.squares)).toBe(BLACK_QUEEN);
		expect(getSquareSymbol("G1", state.squares)).toBe(WHITE_KING);
		expect(getSquareSymbol("A6", state.squares)).toBe(BLACK_PAWN);
		expect(getSquareSymbol("B5", state.squares)).toBe(WHITE_PAWN);
		expect(getSquareSymbol("F5", state.squares)).toBe(false);

		expect(state.move).toBe(28);
		expect(state.turn).toBe(PIECE_COLORS.BLACK);

		expect(state.blackPositions["E8"]).toBe(BLACK_QUEEN);
		expect(state.whitePositions["B4"]).toBe(WHITE_PAWN);
		expect(state.whitePositions["G3"]).toBe(WHITE_PAWN);
	});

	it("should register 0 takes for init FEN", () => {
		const state = translateFenToState(INITIAL_FEN);
		expect(state.takes).toHaveLength(0);
	});

	it("should register missing pieces as takes", () => {
		const state = translateFenToState("1nbqk1nr/ppp3pp/8/8/8/8/PPPPP2P/R1B1KB1R w KQk - 0 1");

		const countTakesForPiece = (symbol) =>
			state.takes.filter(({ symbol: takeSymbol }) => takeSymbol === symbol).length;

		expect(countTakesForPiece(WHITE_KING)).toBe(0);
		expect(countTakesForPiece(BLACK_QUEEN)).toBe(0);
		expect(countTakesForPiece(WHITE_KNIGHT)).toBe(2);
		expect(countTakesForPiece(WHITE_ROOK)).toBe(0);
		expect(countTakesForPiece(BLACK_ROOK)).toBe(1);
		expect(countTakesForPiece(WHITE_PAWN)).toBe(2);
		expect(countTakesForPiece(BLACK_PAWN)).toBe(3);
		expect(countTakesForPiece(BLACK_BISHOP)).toBe(1);
	});

	it("should mark white king is in check", () => {
		const state = translateFenToState("8/1R2P1rk/p1bBp1pp/8/1P6/6PN/5PKP/q7 w - - 0 29");

		expect(state.whiteCheck).toBe(CHECK_TYPES.CHECK);
	});

	it("should throw on invalid FEN", () => {
		expect(() => translateFenToState("abd")).toThrow("WebChess - Invalid FEN - Could not parse");

		expect(() => translateFenToState("r1bqk1r1/ppp12pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R b KQkq - 9 13"))
			.toThrow("WebChess - INVALID FEN! Unknown piece symbol")
	});
});
