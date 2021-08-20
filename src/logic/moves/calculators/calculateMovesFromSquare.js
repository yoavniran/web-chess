import {
	BLACK_BISHOP,
	BLACK_KING,
	BLACK_KNIGHT,
	BLACK_PAWN,
	BLACK_QUEEN,
	BLACK_ROOK,
	MOVE_TYPES,
	WHITE_BISHOP,
	WHITE_KING,
	WHITE_KNIGHT,
	WHITE_PAWN,
	WHITE_QUEEN,
	WHITE_ROOK,
} from "consts";
import getColorFromSymbol from "../../utils/getColorFromSymbol";
import pawnMovesDefinitions from "./definitions/pawnMovesDefinitions";
import queenMovesDefinitions from "./definitions/queenMovesDefinitions";
import moveCalculator from "./moveCalculator";

const PIECE_DEFINITIONS = {
	// [BLACK_KING]: kingCalculator,
	// [WHITE_KING]: kingCalculator,

	[BLACK_QUEEN]: queenMovesDefinitions,
	[WHITE_QUEEN]: queenMovesDefinitions,

	// [BLACK_KNIGHT]: knightCalculator,
	// [WHITE_KNIGHT]: knightCalculator,

	// [WHITE_BISHOP]: bishopCalculator,
	// [BLACK_BISHOP]: bishopCalculator,

	// [WHITE_ROOK]: rookCalculator,
	// [BLACK_ROOK]: rookCalculator,

	[WHITE_PAWN]: pawnMovesDefinitions,
	[BLACK_PAWN]: pawnMovesDefinitions,
};

const isRightTurn = (state, pieceColor) => {
	return state.turn === pieceColor;
};

const MOVE_CALCULATORS = {
	[MOVE_TYPES.MOVE]: moveCalculator,
	[MOVE_TYPES.EN_PASSANT]: () => [],
	[MOVE_TYPES.CASTLE]: () => [],
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

const calculateMovesFromSquare = (square, symbol, state) => {
	const pieceColor = getColorFromSymbol(symbol);
	const definitions = PIECE_DEFINITIONS[symbol];

	return calculateMoves(
		definitions,
		square,
		symbol,
		state,
		pieceColor,
	);
};

export default calculateMovesFromSquare;
