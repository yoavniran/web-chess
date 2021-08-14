import { MOVE_TYPES, MOVE_DIRECTIONS } from "consts";
import { calculateMoves } from "./genericCalculators";

const isTwoSquareMoveAllowed = (square, symbol, state, pieceColor) => {

};

const PAWN_MOVE_DEFINITIONS = [
	//type | count | direction | isEmpty | canBeTaken | extras
	[MOVE_TYPES.MOVE, 1, MOVE_DIRECTIONS.FORWARD, true, true],
	[MOVE_TYPES.MOVE, 2, MOVE_DIRECTIONS.FORWARD, true, true, isTwoSquareMoveAllowed],
	[MOVE_TYPES.TAKE, 1, MOVE_DIRECTIONS.DIAGONAL, false, true],
	[MOVE_TYPES.EN_PASSANT],
];

const pawnMoveCalculator = (square, symbol, state, pieceColor) => {
	console.log("!!!!!  pawnCalculator", {
		square,
		symbol,
		state,
		pieceColor,
		PAWN_MOVE_DEFINITIONS,
	});

	return calculateMoves(
		PAWN_MOVE_DEFINITIONS,
		square,
		symbol,
		state,
		pieceColor
	);
};

export default pawnMoveCalculator;
