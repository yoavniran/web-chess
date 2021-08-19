import { MOVE_DIRECTIONS } from "consts";

const getMoveDirection = (start, square) => {
	if (start[0] !== square[0] && start[1] !== square[1]) {
		return MOVE_DIRECTIONS.DIAGONAL;
	} else if (start[0] !== square[0] && start[1] === square[1]) {
		return MOVE_DIRECTIONS.SIDEWAYS;
	} else if (start[0] === square[0]) {
		return start[1] < square[1] ?
			MOVE_DIRECTIONS.FORWARD : MOVE_DIRECTIONS.BACKWARD;
	}
};

export default getMoveDirection;
