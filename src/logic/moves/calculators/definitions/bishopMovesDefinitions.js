import { MOVE_DIRECTIONS, MOVE_TYPES, MOVE_SQUARE_STATE } from "consts";

const BISHOP_MOVE_DEFINITIONS = [
	[
		//type
		MOVE_TYPES.MOVE,
		//count
		Infinity,
		//directions
		MOVE_DIRECTIONS.DIAGONAL,
		// squareState
		MOVE_SQUARE_STATE.EITHER,
		//canBeTaken
		true
	]
];

export default BISHOP_MOVE_DEFINITIONS;
