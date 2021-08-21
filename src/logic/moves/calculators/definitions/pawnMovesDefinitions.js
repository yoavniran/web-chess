import { MOVE_TYPES, MOVE_DIRECTIONS, PIECE_COLORS, MOVE_SQUARE_STATE } from "consts";
import getSquareCoordinates from "../../../utils/getSquareCoordinates";

const isTwoSquareMoveAllowed = (square, symbol, state, pieceColor) => {
	const coordinates = getSquareCoordinates(square);
	return pieceColor === PIECE_COLORS.WHITE ? coordinates[1] === 1 : coordinates[1] === 6
};

const PAWN_MOVE_DEFINITIONS = [
	//type | count | direction | squareState | canBeTaken | testers
	[MOVE_TYPES.MOVE, 1, MOVE_DIRECTIONS.FORWARD, MOVE_SQUARE_STATE.ONLY_EMPTY, true],
	[MOVE_TYPES.MOVE, 2, MOVE_DIRECTIONS.FORWARD, MOVE_SQUARE_STATE.ONLY_EMPTY, true, isTwoSquareMoveAllowed],
	[MOVE_TYPES.MOVE, 1, MOVE_DIRECTIONS.DIAGONAL, MOVE_SQUARE_STATE.ONLY_OCCUPIED, true],
	// [MOVE_TYPES.EN_PASSANT],

	//TODO Promote  ?!?!!?
];

export default PAWN_MOVE_DEFINITIONS;
