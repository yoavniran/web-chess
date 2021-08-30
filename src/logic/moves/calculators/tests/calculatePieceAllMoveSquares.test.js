import { DIAGONAL_VECTORS, MOVE_DIRECTIONS, PIECE_COLORS, SIDEWAYS_VECTORS } from "consts";
import calculatePieceAllMoveSquares from "../calculatePieceAllMoveSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("calculatePieceAllMoveSquares tests", () => {

	it("should calculate one square forward for White G2", () => {
		const squares = calculatePieceAllMoveSquares("G2", PIECE_COLORS.WHITE, MOVE_DIRECTIONS.FORWARD, 1);

		expect(squares).toHaveLength(1);
		expect(squares[0]).toBe("G3");
	});

	it("should calculate one square forward for Black G7", () => {
		const squares = calculatePieceAllMoveSquares("G7", PIECE_COLORS.BLACK, MOVE_DIRECTIONS.FORWARD, 1);

		expect(squares).toHaveLength(1);
		expect(squares[0]).toBe("G6");
	});

	it("should calculate squares for White Rook A1", () => {
		const squares = calculatePieceAllMoveSquares(
			"A1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		expect(squares).toHaveLength(14);
		expect(findSquare("A2", squares)).toBe(true);
		expect(findSquare("A8", squares)).toBe(true);
		expect(findSquare("B1", squares)).toBe(true);
		expect(findSquare("H1", squares)).toBe(true);
		expect(findSquare("A1", squares)).toBe(false);
		expect(findSquare("B2", squares)).toBe(false);
	});

	it("should calculate squares for White Rook D4", () => {
		const squares = calculatePieceAllMoveSquares(
			"D4",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		expect(squares).toHaveLength(14);
		expect(findSquare("D1", squares)).toBe(true);
		expect(findSquare("D8", squares)).toBe(true);
		expect(findSquare("C4", squares)).toBe(true);
		expect(findSquare("H4", squares)).toBe(true);
		expect(findSquare("A4", squares)).toBe(true);
		expect(findSquare("D4", squares)).toBe(false);
		expect(findSquare("E5", squares)).toBe(false);
	});

	it("should calculate squares for BLACK Rook H8", () => {
		const squares = calculatePieceAllMoveSquares(
			"H8",
			PIECE_COLORS.BLACK,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		expect(squares).toHaveLength(14);
		expect(findSquare("D8", squares)).toBe(true);
		expect(findSquare("H1", squares)).toBe(true);
		expect(findSquare("H5", squares)).toBe(true);
		expect(findSquare("A8", squares)).toBe(true);
		expect(findSquare("H8", squares)).toBe(false);
		expect(findSquare("G7", squares)).toBe(false);
	});

	it("should calculate squares for White King E1", () => {
		const squares = calculatePieceAllMoveSquares(
			"E1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS | MOVE_DIRECTIONS.DIAGONAL,
			1,
		);

		expect(squares).toHaveLength(5);
		expect(findSquare("E2", squares)).toBe(true);
		expect(findSquare("D1", squares)).toBe(true);
		expect(findSquare("F1", squares)).toBe(true);
		expect(findSquare("F2", squares)).toBe(true);
		expect(findSquare("D2", squares)).toBe(true);
		expect(findSquare("E1", squares)).toBe(false);
	});

	it("should calculate squares for Black King D5", () => {
		const squares = calculatePieceAllMoveSquares(
			"D5",
			PIECE_COLORS.BLACK,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS | MOVE_DIRECTIONS.DIAGONAL,
			1,
		);

		expect(squares).toHaveLength(8);
		expect(findSquare("D4", squares)).toBe(true);
		expect(findSquare("D6", squares)).toBe(true);
		expect(findSquare("C4", squares)).toBe(true);
		expect(findSquare("E6", squares)).toBe(true);
		expect(findSquare("D5", squares)).toBe(false);
	});

	it("should calculate squares for Black Queen E5", () => {
		const squares = calculatePieceAllMoveSquares(
			"E5",
			PIECE_COLORS.BLACK,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS | MOVE_DIRECTIONS.DIAGONAL,
			Infinity,
		);

		expect(squares).toHaveLength(27);
		expect(findSquare("D6", squares)).toBe(true);
		expect(findSquare("F6", squares)).toBe(true);
		expect(findSquare("A1", squares)).toBe(true);
		expect(findSquare("H8", squares)).toBe(true);
		expect(findSquare("H2", squares)).toBe(true);
		expect(findSquare("E5", squares)).toBe(false);
	});

	it("should calculate squares for White Queen D4", () => {
		const squares = calculatePieceAllMoveSquares(
			"D5",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS | MOVE_DIRECTIONS.DIAGONAL,
			Infinity,
		);

		expect(squares).toHaveLength(27);
		expect(findSquare("G8", squares)).toBe(true);
		expect(findSquare("A8", squares)).toBe(true);
		expect(findSquare("A2", squares)).toBe(true);
		expect(findSquare("H1", squares)).toBe(true);
		expect(findSquare("E6", squares)).toBe(true);
		expect(findSquare("D5", squares)).toBe(false);
	});

	it("should calculate squares for White Knight E5", () => {
		const squares = calculatePieceAllMoveSquares(
			"E5",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.KNIGHT,
		);

		expect(squares).toHaveLength(8);
		expect(findSquare("F7", squares)).toBe(true);
		expect(findSquare("D7", squares)).toBe(true);
		expect(findSquare("G6", squares)).toBe(true);
		expect(findSquare("G4", squares)).toBe(true);
		expect(findSquare("F3", squares)).toBe(true);
		expect(findSquare("D3", squares)).toBe(true);
		expect(findSquare("C6", squares)).toBe(true);
		expect(findSquare("C4", squares)).toBe(true);
		expect(findSquare("E5", squares)).toBe(false);
	});

	it("should calculate squares for Black Knight B8", () => {
		const squares = calculatePieceAllMoveSquares(
			"B8",
			PIECE_COLORS.BLACK,
			MOVE_DIRECTIONS.KNIGHT,
		);

		expect(squares).toHaveLength(3);
		expect(findSquare("D7", squares)).toBe(true);
		expect(findSquare("C6", squares)).toBe(true);
		expect(findSquare("A6", squares)).toBe(true);
		expect(findSquare("B8", squares)).toBe(false);
	});

	it("should calculate squares for White Queen H3", () => {
		const possibleMovesForDirection = calculatePieceAllMoveSquares(
			"H3",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.DIAGONAL,
			1);

		expect(possibleMovesForDirection).toHaveLength(2);
	});

	it("should calculate squares for diagonal with specific vector", () => {

		const possibleMovesForDirection = calculatePieceAllMoveSquares(
			"H3",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.DIAGONAL,
			1,
			{ diagonalVector: DIAGONAL_VECTORS.SW });

		expect(possibleMovesForDirection).toHaveLength(1);
	});

	it("should calculate squares for sideways with specific vector", () => {
		const possibleMovesForDirection = calculatePieceAllMoveSquares(
			"F6",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
			{ sidewaysVector: SIDEWAYS_VECTORS.RIGHT },
		);

		expect(possibleMovesForDirection).toHaveLength(2);

	});
});
