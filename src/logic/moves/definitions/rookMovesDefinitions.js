import { MOVE_DIRECTIONS, MOVE_TYPES, MOVE_SQUARE_STATE } from "consts";

const ROOK_MOVE_DEFINITIONS = [
	[
		//type
		MOVE_TYPES.MOVE,
		//count
		Infinity,
		//directions
		MOVE_DIRECTIONS.FORWARD |  MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
		// squareState
		MOVE_SQUARE_STATE.EITHER,
		//canBeTaken
		true
	]
];

export default ROOK_MOVE_DEFINITIONS;
