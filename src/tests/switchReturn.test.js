import { switchReturn } from "../utils";

describe("switchReturn tests", () => {

	it("should return first case", () => {

		const case1 = (a, b) => a + b === 3;
		const case2 = jest.fn();

		const result = switchReturn([1, 2], case1, case2);

		expect(result).toBe(true);
		expect(case2).not.toHaveBeenCalled();
	});

	it("should return last case", () => {

		const result = switchReturn([1, 2],
			(a, b) => false,
			() => undefined,
			() => null,
			(a, b) => a + b);

		expect(result).toBe(3);
	});

	it("should return undefined if not found", () => {
		const result = switchReturn([1, 2],
			() => undefined,
			(a, b) => a > b,
			() => null,
			() => false,
		);

		expect(result).toBeUndefined();
	});
});
