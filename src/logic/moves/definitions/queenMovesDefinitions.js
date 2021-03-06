import { MOVE_DIRECTIONS, MOVE_TYPES, MOVE_SQUARE_STATE } from "consts";

const QUEEN_MOVE_DEFINITIONS = [
	[
		//type
		MOVE_TYPES.MOVE,
		//count
		Infinity,
		//directions
		MOVE_DIRECTIONS.SIDEWAYS |
		MOVE_DIRECTIONS.FORWARD |
		MOVE_DIRECTIONS.BACKWARD |
		MOVE_DIRECTIONS.DIAGONAL,
		// squareState
		MOVE_SQUARE_STATE.EITHER,
		//canBeTaken
		true
	]
];

export default QUEEN_MOVE_DEFINITIONS;
