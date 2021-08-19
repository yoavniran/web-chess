import sortSquaresByClosest from "../sortSquaresByClosest";

const isCloser = (a, b, squares) => squares.indexOf(a) <= squares.indexOf(b);

describe("sortSquaresByClosest tests", () => {

	it("should sort by closest to A1", () => {
			const sorted = sortSquaresByClosest("A1",
				["H8", "B1", "D4", "H1", "A4", "A2", "B2", "F2", "D7", "E3"]);

			expect(isCloser("B1", "H8", sorted)).toBe(true);
			expect(isCloser("E3", "H1", sorted)).toBe(true);
			expect(isCloser("E3", "D7", sorted)).toBe(true);
			expect(isCloser("A2", "A4", sorted)).toBe(true);
	});

	it("should sort by closest D4", () => {
		const sorted = sortSquaresByClosest("D4",
			["G8", "A1", "H8", "E6", "E5", "E4", "D1", "C3"]);

		expect(isCloser("A1", "H8", sorted)).toBe(true);
		expect(isCloser("E4", "E6", sorted)).toBe(true);
		expect(isCloser("E5", "E6", sorted)).toBe(true);
		expect(isCloser("E4", "D1", sorted)).toBe(true);
		expect(isCloser("D1", "G8", sorted)).toBe(true);
	});

});
