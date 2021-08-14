import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import calculateSquaresForMove from "../calculateSquaresForMove";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("calculateSquaresForMove tests", () => {

	it("should calculate one square forward for White G2", () => {
		const squares = calculateSquaresForMove("G2", PIECE_COLORS.WHITE, MOVE_DIRECTIONS.FORWARD, 1);

		expect(squares).toHaveLength(1);
		expect(squares[0]).toBe("G3");
	});

	it("should calculate one square forward for Black G7", () => {
		const squares = calculateSquaresForMove("G7", PIECE_COLORS.BLACK, MOVE_DIRECTIONS.FORWARD, 1);

		expect(squares).toHaveLength(1);
		expect(squares[0]).toBe("G6");
	});

	it("should calculate squares for White Rook A1", () => {
		const squares = calculateSquaresForMove(
			"A1",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD,
			Infinity
		);


		expect(squares).toHaveLength(7);
		expect(squares[0]).toBe("A2");
		expect(squares[6]).toBe("A8");
	});

	it("should calculate squares for White Rook D4", () => {
		const squares = calculateSquaresForMove(
			"D4",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD,
			Infinity
		);

		console.log("!!!!1 ", squares);

		expect(squares).toHaveLength(7);
		expect(findSquare("D1", squares)).toBe(true);
		expect(findSquare("D8", squares)).toBe(true);
		expect(findSquare("D4", squares)).toBe(false);
	});

});
