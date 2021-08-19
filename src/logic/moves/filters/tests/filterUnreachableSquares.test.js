import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import calculateSquaresForMove from "../calculateSquaresForMove";
import filterUnreachableSquares from "../filterUnreachableSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterUnreachableSquares tests", () => {
	it("should filter all squares for Rook on A1", () => {
		const moveSquares = calculateSquaresForMove(
			"A1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity
		).filter((s) => s !== "A2" && s !== "B1");

		const filtered = filterUnreachableSquares("A1", moveSquares);

		expect(filtered).toHaveLength(0);
	});

	it("should filter forward squares for Rook on A1", () => {
		const moveSquares = calculateSquaresForMove(
			"A1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity
		).filter((s) => s !== "A2");

		const filtered = filterUnreachableSquares("A1", moveSquares);

		expect(filtered).toHaveLength(7);
	});

	it("should keep all squares for Rook on A1", () => {
		const moveSquares = calculateSquaresForMove(
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
		const moveSquares = [
			"H1",//unreachable (backward)
			"G4", "F5", "E6",
			"C8",//unreachable (diagonal)
			"H4", "H5",
			"H7", "H8", //unreachable (forward)
			"G3", "F3", "E3", "D3", "C3", "B3", "A3"
		];

		const filtered = filterUnreachableSquares("H3", moveSquares);

		expect(filtered).toHaveLength(12);
	});



});
