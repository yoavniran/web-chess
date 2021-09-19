import { MOVE_TYPES, MOVE_DIRECTIONS, MOVE_SQUARE_STATE } from "consts";

const KNIGHT_MOVES_DEFINITIONS = [
	//type | count | direction | squareState | canBeTaken | testers
	[MOVE_TYPES.MOVE, 1, MOVE_DIRECTIONS.KNIGHT, MOVE_SQUARE_STATE.EITHER, true],
];

export default KNIGHT_MOVES_DEFINITIONS;
