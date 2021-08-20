import { SIDEWAYS_VECTORS } from "consts";
import getMoveSidewaysVector from "../getMoveSidewaysVector";

describe("getMoveSidewaysVector tests", () => {
	it.each([
		[[0, 0], [1, 0], SIDEWAYS_VECTORS.RIGHT],
		[[4, 4], [7, 4], SIDEWAYS_VECTORS.RIGHT],
		[[4, 4], [3, 4], SIDEWAYS_VECTORS.LEFT],
		[[7, 7], [0, 7], SIDEWAYS_VECTORS.LEFT],
	])
	("should return correct vector for %s to %s = %s", (a, b, expected) => {
		expect(getMoveSidewaysVector(a, b))
			.toBe(expected);
	});

	it("should throw no sideways error", () => {
		expect(() => {
			getMoveSidewaysVector([0, 0], [0, 0]);
		}).toThrow("Provided move isn't sideways.");

		expect(() => {
			getMoveSidewaysVector([0, 0], [1, 1]);
		}).toThrow("Provided move isn't sideways.");
	});
});
