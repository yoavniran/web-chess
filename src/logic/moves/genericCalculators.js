import { MOVE_TYPES } from "../../consts";
import calculateSquaresForMove from "./calculateSquaresForMove";

const isRightTurn = (state, pieceColor) => {
	return state.turn === pieceColor;
};

const regularMoveCalculator = (square, symbol, state, pieceColor, definition) => {
	const [count, directions, isEmpty, canBeTaken, ...extras] = definition;

	//all squares the piece could potentially move to (no limitations calculated)
	const moveSquares = calculateSquaresForMove(square, pieceColor, directions, count);

	//TODO FILTER out own pieces squares

	console.log("!!!!!!! regularMoveCalculator ",{
		moveSquares,
	} );

	return [];



	//return allowed square(s)
};

const MOVE_CALCULATORS = {
	[MOVE_TYPES.MOVE]: regularMoveCalculator,
	[MOVE_TYPES.TAKE]: () => [],
	[MOVE_TYPES.EN_PASSANT]: () => [],
};

const calculateMoves = (definitions, square, symbol, state, pieceColor) => {
	let allowedMoves;

	if (isRightTurn(state, pieceColor)) {
		allowedMoves = definitions.map(([defType, ...definition]) => {
			return MOVE_CALCULATORS[defType](square, symbol, state, pieceColor, definition);
		}).flat();






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
