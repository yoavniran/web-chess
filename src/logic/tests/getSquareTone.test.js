import getSquareTone from "../getSquareTone";
import { SQUARE_TONES } from "consts";

describe("getSquareTone tests", () => {
	it("should return DARK for first square (A1 OR H8)", () => {
		expect(getSquareTone(0,0)).toBe(SQUARE_TONES.DARK);
	});

	it("should return LIGHT for last square on first row (A7 OR H1", () => {
		expect(getSquareTone(0,7)).toBe(SQUARE_TONES.LIGHT);
	});

	it("should return DARK for D4 or E5", () => {
		expect(getSquareTone(3,3)).toBe(SQUARE_TONES.DARK);
	});

	it("should return LIGHT for D5 or E4", () => {
		expect(getSquareTone(3,4)).toBe(SQUARE_TONES.LIGHT);
	});
});
