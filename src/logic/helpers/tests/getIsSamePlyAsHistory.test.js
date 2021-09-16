import getIsSamePlyAsHistory from "../getIsSamePlyAsHistory";

describe("getIsSamePlyAsHistory tests", () => {
	it.each([
		[[[{}, {}], [{ move: 1 }, { move: 1 }]], [1, 1], true],
		[[[{ move: 5 }]], [5, 0], true],
		[[[{ move: 0 }, { move: 0 }]], [0, 1], true],
		[[[{ move: 0 }, {}]], [0, 0], false],
		[[], [0, 0], false],
	])("should match history %s with ply: %s and result = %s",
		(history, ply, expected) => {
			expect(getIsSamePlyAsHistory({ history }, ply)).toBe(expected);
		});
});
