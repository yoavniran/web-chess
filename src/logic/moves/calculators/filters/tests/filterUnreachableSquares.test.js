import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import calculatePieceAllMoveSquares from "../../calculatePieceAllMoveSquares";
import filterUnreachableSquares from "../filterUnreachableSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

const removeSquares = (squares, removeSquares) =>
	squares.filter((s) => !~removeSquares.indexOf(s));

describe("filterUnreachableSquares tests", () => {
	it("should filter all squares for Rook on A1", () => {
		const moveSquares = removeSquares(calculatePieceAllMoveSquares(
			"A1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity
		), ["A2", "B1"]);

		const filtered = filterUnreachableSquares("A1", moveSquares);

		expect(filtered).toHaveLength(0);
	});

	it("should filter forward squares for Rook on A1", () => {
		const moveSquares = calculatePieceAllMoveSquares(
			"A1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity
		).filter((s) => s !== "A2");

		const filtered = filterUnreachableSquares("A1", moveSquares);

		expect(filtered).toHaveLength(7);
	});

	it("should keep all squares for Rook on A1", () => {
		const moveSquares = calculatePieceAllMoveSquares(
			"A1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity
		);

		const filtered = filterUnreachableSquares("A1", moveSquares);

		expect(filtered).toHaveLength(14);

		moveSquares.forEach((s) =>
			expect(findSquare(s, filtered)).toBe(true)
		);
	});

	it("should filter unreachable paths for Queen on H3", () => {
		const moveSquares = removeSquares(calculatePieceAllMoveSquares(
			"H3",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS | MOVE_DIRECTIONS.DIAGONAL,
			Infinity
		), [
			//make H1 unreachable (backward)
			"H2",
			//make C8 unreachable (diagonal)
			"D7",
			//make H7, H8 unreachable (forward)
			"H6"]);

		const filtered = filterUnreachableSquares("H3", moveSquares);

		expect(filtered).toHaveLength(14);
		expect(findSquare("G3", filtered)).toBe(true);
		expect(findSquare("F5", filtered)).toBe(true);
		expect(findSquare("H4", filtered)).toBe(true);
		expect(findSquare("A3", filtered)).toBe(true);
		expect(findSquare("H7", filtered)).toBe(false);
		expect(findSquare("H8", filtered)).toBe(false);
		expect(findSquare("C8", filtered)).toBe(false);
		expect(findSquare("H1", filtered)).toBe(false);
	});

	it("should filter unreachable paths for Bishop on G5", () => {
		const moveSquares = removeSquares(calculatePieceAllMoveSquares(
			"G5",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.DIAGONAL,
			Infinity
		), [
			//make E7, D8 unreachable
			"F6",
			//make C1 unreachable
			"D2",
			]);

		const filtered = filterUnreachableSquares("G5", moveSquares);

		expect(filtered).toHaveLength(4);
		expect(findSquare("H4", filtered)).toBe(true);
		expect(findSquare("H6", filtered)).toBe(true);
		expect(findSquare("E3", filtered)).toBe(true);
		expect(findSquare("C1", filtered)).toBe(false);
		expect(findSquare("D8", filtered)).toBe(false);
		expect(findSquare("E7", filtered)).toBe(false);
	});

	it("should not filter paths for Knight on G1", () => {
			const moveSquares = ["F3", "H3"];

			const filtered = filterUnreachableSquares("G1", moveSquares);
			expect(filtered).toHaveLength(2);
	});
});
