import getDistance from "../getDistance";
import getSquareCoordinates from "../getSquareCoordinates";

const getDistanceForSquares = (start, end) =>
	getDistance(getSquareCoordinates(start), getSquareCoordinates(end));

describe("getDistance Tests", () => {

	it.each([
		["A1", "H8", 7],
		["A2", "D4", 3],
		["C6", "A8", 2],
		["D1", "E7", 6],
		["A7", "E3", 4],
		["H1", "C5", 5],
		["E3", "F4", 1],
	])("should calculate distance for %s, %s = %s", (start, end, expected) => {
		expect(getDistanceForSquares(start, end)).toBe(expected);
	});
});
