import filterNonEmptySquares from "../filterNonEmptySquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterNonEmptySquares tests", () => {

	it("should remove non-empty squares", () => {

		const filtered = filterNonEmptySquares(
			["A1", "B1", "H8", "G7"],
			{
				piecesSquares: {
					"A1": { isEmpty: true },
					"B1": { isEmpty: false },
					"H8": { isEmpty: false },
					"G7": { isEmpty: true },
				},
			});

		expect(findSquare("A1", filtered)).toBe(true);
		expect(findSquare("B1", filtered)).toBe(false);
		expect(findSquare("H8", filtered)).toBe(false);
		expect(findSquare("G7", filtered)).toBe(true);
	});
});
