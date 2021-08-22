import filterNonOccupiedSquares from "../filterNonOccupiedSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterNonOccupiedSquares tests", () => {

	it("should remove non-occupied squares", () => {

		const filtered = filterNonOccupiedSquares(
			["A1", "B1", "H8", "G7"],
			{
				squares: {
					"A1": { isEmpty: true },
					"B1": { isEmpty: false },
					"H8": { isEmpty: false },
					"G7": { isEmpty: true },
				},
			}, null);

		expect(findSquare("A1", filtered)).toBe(false);
		expect(findSquare("B1", filtered)).toBe(true);
		expect(findSquare("H8", filtered)).toBe(true);
		expect(findSquare("G7", filtered)).toBe(false);
	});

	it("should consider expectedTake param", () => {
		const filtered = filterNonOccupiedSquares(
			["A1", "B1", "H8", "G7"],
			{
				squares: {
					"A1": { isEmpty: true },
					"B1": { isEmpty: false },
					"H8": { isEmpty: false },
					"G7": { isEmpty: true },
				},
			}, ["G7"]);

		expect(findSquare("A1", filtered)).toBe(false);
		expect(findSquare("B1", filtered)).toBe(true);
		expect(findSquare("H8", filtered)).toBe(true);
		expect(findSquare("G7", filtered)).toBe(true);
	});
});
