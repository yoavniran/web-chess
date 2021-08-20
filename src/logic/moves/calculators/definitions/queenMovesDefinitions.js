import { MOVE_DIRECTIONS, MOVE_TYPES } from "consts";

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
		// isEmpty
		false,
		//canBeTaken
		true
	]
];

export default QUEEN_MOVE_DEFINITIONS;
