import { MOVE_TYPES, MOVE_DIRECTIONS } from "consts";

const isTwoSquareMoveAllowed = (square, symbol, state, pieceColor) => {

};

const PAWN_MOVE_DEFINITIONS = [
	//type | count | direction | isEmpty | canBeTaken | checkers
	[MOVE_TYPES.MOVE, 1, MOVE_DIRECTIONS.FORWARD, true, true],
	[MOVE_TYPES.MOVE, 2, MOVE_DIRECTIONS.FORWARD, true, true, isTwoSquareMoveAllowed],
	[MOVE_TYPES.MOVE, 1, MOVE_DIRECTIONS.DIAGONAL, false, true],
	// [MOVE_TYPES.EN_PASSANT],

	//TODO Promote  ?!?!!?
];

export default PAWN_MOVE_DEFINITIONS;

// const pawnMovesDefinitions = (square, symbol, state, pieceColor) => {
// 	return calculateMoves(
// 		PAWN_MOVE_DEFINITIONS,
// 		square,
// 		symbol,
// 		state,
// 		pieceColor
// 	);
// };
//
// export default pawnMovesDefinitions;
