import { MOVE_DIRECTIONS } from "consts";
import getMoveDirection from "../getMoveDirection";
import getSquareCoordinates from "../../utils/getSquareCoordinates";

describe("getMoveDirection tests", () => {

	it.each([
		["B2", "D4"],
		["H8", "A1"],
		["D4", "E5"],
		["D3", "E4"],
		["E4", "D3"],
		["F5", "H7"],
	])("should return DIAGONAL (%s, %s)", (start, end) => {
		expect(getMoveDirection(
			getSquareCoordinates(start),
			getSquareCoordinates(end),
		)).toBe(MOVE_DIRECTIONS.DIAGONAL);
	});

	it.each([
		["A4", "H4"],
		["G8", "E8"],
		["B4", "A4"],
		["C5", "G5"],
	])("should return SIDEWAYS (%s, %s)", (start, end) => {
		expect(getMoveDirection(
			getSquareCoordinates(start),
			getSquareCoordinates(end),
		)).toBe(MOVE_DIRECTIONS.SIDEWAYS);
	});

	it.each([
		["E1", "E4"],
		["B7", "B8"],
		["F1", "F2"],
	])("should return FORWARD (%s, %s)", (start, end) => {
		expect(getMoveDirection(
			getSquareCoordinates(start),
			getSquareCoordinates(end),
		)).toBe(MOVE_DIRECTIONS.FORWARD);
	});

	it.each([
		["G7", "G6"],
		["C4", "C2"],
		["H8", "H6"],
	])("should return BACKWARD (%s, %s)", (start, end) => {
		expect(getMoveDirection(
			getSquareCoordinates(start),
			getSquareCoordinates(end),
		)).toBe(MOVE_DIRECTIONS.BACKWARD);
	});

	it.each([
		["G1", "H3"],
		["H3", "G1"],
		["H3", "G5"],
		["G5", "H3"],
		["F3", "H4"],
		["C6", "D4"],
		["D5", "B6"],
		["E8", "F6"],
	])("should return KNIGHT (%s, %s)", (start, end) => {
		expect(getMoveDirection(
			getSquareCoordinates(start),
			getSquareCoordinates(end),
		)).toBe(MOVE_DIRECTIONS.KNIGHT);
	});
});
