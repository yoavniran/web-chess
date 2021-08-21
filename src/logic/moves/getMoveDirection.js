import { MOVE_DIRECTIONS } from "consts";
import { switchReturn } from "utils";

const getMoveDirection = (a, b) =>
	switchReturn([a, b],
		(a, b) =>
			!!((Math.abs(a[0] - b[0]) === 2 && Math.abs(a[1] - b[1]) === 1) ||
			(Math.abs(a[0] - b[0]) === 1 && Math.abs(a[1] - b[1]) === 2)) && MOVE_DIRECTIONS.KNIGHT,
		(a, b) =>
			a[0] !== b[0] && a[1] !== b[1] && MOVE_DIRECTIONS.DIAGONAL,
		(a, b) =>
			a[0] !== b[0] && a[1] === b[1] && MOVE_DIRECTIONS.SIDEWAYS,
		(a, b) =>
			a[0] === b[0] && (a[1] < b[1] ? MOVE_DIRECTIONS.FORWARD : MOVE_DIRECTIONS.BACKWARD),
	);

export default getMoveDirection;
