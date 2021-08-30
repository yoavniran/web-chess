import {
	BLACK_BISHOP,
	BLACK_KING,
	BLACK_KNIGHT,
	BLACK_PAWN,
	BLACK_QUEEN,
	BLACK_ROOK,
	WHITE_BISHOP,
	WHITE_KING,
	WHITE_KNIGHT,
	WHITE_PAWN,
	WHITE_QUEEN,
	WHITE_ROOK,

	MOVE_TYPES,
	CHECK_TYPES,
} from "consts";
import { addArrayToSet } from "../../utils";
import getColorFromSymbol from "../helpers/getColorFromSymbol";
import getCheckType from "../helpers/getCheckType";
import { isKing } from "../helpers/is";
import kingMovesDefinitions from "./calculators/definitions/kingMovesDefinitions";
import queenMovesDefinitions from "./calculators/definitions/queenMovesDefinitions";
import rookMovesDefinitions from "./calculators/definitions/rookMovesDefinitions";
import bishopMovesDefinitions from "./calculators/definitions/bishopMovesDefinitions";
import knightMovesDefinitions from "./calculators/definitions/knightMovesDefinitions";
import pawnMovesDefinitions from "./calculators/definitions/pawnMovesDefinitions";
import moveCalculator from "./calculators/moveCalculator";

const PIECE_DEFINITIONS = {
	[BLACK_KING]: kingMovesDefinitions,
	[WHITE_KING]: kingMovesDefinitions,

	[BLACK_QUEEN]: queenMovesDefinitions,
	[WHITE_QUEEN]: queenMovesDefinitions,

	[BLACK_KNIGHT]: knightMovesDefinitions,
	[WHITE_KNIGHT]: knightMovesDefinitions,

	[WHITE_BISHOP]: bishopMovesDefinitions,
	[BLACK_BISHOP]: bishopMovesDefinitions,

	[WHITE_ROOK]: rookMovesDefinitions,
	[BLACK_ROOK]: rookMovesDefinitions,

	[WHITE_PAWN]: pawnMovesDefinitions,
	[BLACK_PAWN]: pawnMovesDefinitions,
};

const isRightTurn = (state, pieceColor) =>
	state.turn === pieceColor;

const MOVE_CALCULATORS = {
	[MOVE_TYPES.MOVE]: moveCalculator,
	[MOVE_TYPES.EN_PASSANT]: () => [],
	[MOVE_TYPES.CASTLE]: () => [],
};

const calculateForDefinitions = (definitions, square, symbol, state, pieceColor, options) => {
	const movesSet = definitions
		.reduce((res, [defType, ...definition]) => {
			addArrayToSet(
				MOVE_CALCULATORS[defType](square, symbol, state, pieceColor, definition, options),
				res,
			);

			return res;
		}, new Set());

	return [...movesSet.values()];
};

const getNotInCheck = (state, pieceColor) =>
		getCheckType(pieceColor, state) === CHECK_TYPES.NONE;

const canCalculate = (state, pieceColor, symbol, options) =>
	//when ignoreTurn is on, we dont care about check or who's turn it is
	(options.ignoreTurn || (
		(!isKing(symbol) || !getNotInCheck(state, pieceColor)) &&
		isRightTurn(state, pieceColor)));

export const calculateSquares = (square, symbol, state, pieceColor, options = {}) => {
	const definitions = PIECE_DEFINITIONS[symbol];

	return calculateForDefinitions(
		definitions,
		square,
		symbol,
		state,
		pieceColor,
		options,
	);
};

const getMoveSquares = (square, symbol, state, options = {}) => {
	const pieceColor = getColorFromSymbol(symbol);

	return canCalculate(state, pieceColor, symbol, options) ?
		calculateSquares(square, symbol, state, pieceColor, options) : [];
};

export default getMoveSquares;
