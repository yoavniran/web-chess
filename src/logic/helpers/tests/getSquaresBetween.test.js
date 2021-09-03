import getSquaresBetween from "../getSquaresBetween";

describe("getSquaresBetween tests", () => {

	it.each([
		["C6", "G2", ["D5", "E4", "F3"]],
		["H4", "A4", ["G4", "F4", "E4", "D4", "C4", "B4"]],
		["H8", "B2", ["G7", "F6", "E5", "D4", "C3"]],
	])("should return squares between: %s->%s = %s", (start, end, expected) => {
		expect(getSquaresBetween(start, end))
			.toEqual(expected);
	});
});
