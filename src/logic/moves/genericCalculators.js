import { MOVE_TYPES } from "../../consts";
import regularMoveCalculator from "./calculators/regularMoveCalculator";

const isRightTurn = (state, pieceColor) => {
	return state.turn === pieceColor;
};



const MOVE_CALCULATORS = {
	[MOVE_TYPES.MOVE]: regularMoveCalculator,
	[MOVE_TYPES.TAKE]: () => [],
	[MOVE_TYPES.EN_PASSANT]: () => [],
};

const calculateMoves = (definitions, square, symbol, state, pieceColor) => {
	let allowedMoves = [];

	if (isRightTurn(state, pieceColor)) {
		definitions.forEach(([defType, ...definition]) => {
			allowedMoves = MOVE_CALCULATORS[defType](square, symbol, state, pieceColor, definition, allowedMoves);
		});
	}

	console.log(`FOUND ${allowedMoves.length} AVAILABLE MOVES !!!!! `, {
		definitions,
		square,
		symbol,
		state,
		pieceColor,
	});

	return allowedMoves;
};

export {
	calculateMoves,
};
