import { MOVE_DIRECTIONS } from "consts";
import getMoveDirection from "../getMoveDirection";
import getSquareCoordinates from "../../utils/getSquareCoordinates";

describe("getMoveDirection tests", () => {
	it("should return DIAGONAL", () => {
		expect(getMoveDirection(
			getSquareCoordinates("B2"),
			getSquareCoordinates("D4")
		)).toBe(MOVE_DIRECTIONS.DIAGONAL);

		expect(getMoveDirection(
			getSquareCoordinates("H8"),
			getSquareCoordinates("A1")
		)).toBe(MOVE_DIRECTIONS.DIAGONAL);
	});

	it("should return SIDEWAYS", () => {
		expect(getMoveDirection(
			getSquareCoordinates("A4"),
			getSquareCoordinates("H4")
		)).toBe(MOVE_DIRECTIONS.SIDEWAYS);

		expect(getMoveDirection(
			getSquareCoordinates("G8"),
			getSquareCoordinates("E8")
		)).toBe(MOVE_DIRECTIONS.SIDEWAYS);
	});

	it("should return FORWARD", () => {
		expect(getMoveDirection(
			getSquareCoordinates("E1"),
			getSquareCoordinates("E4")
		)).toBe(MOVE_DIRECTIONS.FORWARD);

		expect(getMoveDirection(
			getSquareCoordinates("B7"),
			getSquareCoordinates("B8")
		)).toBe(MOVE_DIRECTIONS.FORWARD);
	});

	it("should return BACKWARD", () => {
		expect(getMoveDirection(
			getSquareCoordinates("G7"),
			getSquareCoordinates("G6")
		)).toBe(MOVE_DIRECTIONS.BACKWARD);

		expect(getMoveDirection(
			getSquareCoordinates("C4"),
			getSquareCoordinates("C2")
		)).toBe(MOVE_DIRECTIONS.BACKWARD);
	});
});
