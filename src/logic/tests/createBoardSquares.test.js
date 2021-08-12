import { SQUARE_TONES } from "consts";
import createBoardSquares from "../createBoardSquares";

describe("createBoardSquares tests", () => {

	it("should create board squares for white", () => {
		const squares = createBoardSquares();

		expect(squares).toHaveLength(64);

		squares.forEach((square, index) => {
			const expectedTone = ((index + (square.row % 2) + 1) % 2) ? SQUARE_TONES.DARK : SQUARE_TONES.LIGHT;
			expect(square.tone).toBe(expectedTone);
		});

		expect(squares[0].name).toBe("A8");
		expect(squares[63].name).toBe("H1");
	});

	it("should create board squares for black", () => {
		const squares = createBoardSquares(true);

		expect(squares).toHaveLength(64);
		expect(squares[0].name).toBe("H1");
		expect(squares[63].name).toBe("A8");

		squares.forEach((square, index) => {
			const expectedTone = ((index + (square.row % 2) + 1) % 2) ? SQUARE_TONES.LIGHT : SQUARE_TONES.DARK;
			expect(square.tone).toBe(expectedTone);
		});
	});
});
