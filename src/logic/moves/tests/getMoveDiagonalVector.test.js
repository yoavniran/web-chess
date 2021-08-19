import { DIAGONAL_VECTORS } from "../../../consts";
import getMoveDiagonalVector from "../getMoveDiagonalVector";

describe("getMoveDiagonalVector tests", () => {

	it.each([
		[[0,0], [1,1], DIAGONAL_VECTORS.NE],
		[[4,4], [7,7], DIAGONAL_VECTORS.NE],
		[[4,4], [3,5], DIAGONAL_VECTORS.NW],
		[[7,0], [0,7], DIAGONAL_VECTORS.NW],
		[[3,3], [7,0], DIAGONAL_VECTORS.SE],
		[[0,6], [2,4], DIAGONAL_VECTORS.SE],
		[[7,3], [5,1], DIAGONAL_VECTORS.SW],
		[[7,7], [0,0], DIAGONAL_VECTORS.SW],
	])
	("should return correct vector for %s to %s = %s", (a, b, expected) => {
		expect(getMoveDiagonalVector(a,b))
			.toBe(expected);
	});

	it("should throw no diagonal error", () => {
		expect(() => {
			getMoveDiagonalVector([0,0], [1, 0]);
		}).toThrow("Provided move isn't diagonal.")
	});
});
