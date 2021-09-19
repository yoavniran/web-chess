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
import { isKing } from "../helpers/is";
import kingMovesDefinitions from "./definitions/kingMovesDefinitions";
import queenMovesDefinitions from "./definitions/queenMovesDefinitions";
import rookMovesDefinitions from "./definitions/rookMovesDefinitions";
import bishopMovesDefinitions from "./definitions/bishopMovesDefinitions";
import knightMovesDefinitions from "./definitions/knightMovesDefinitions";
import pawnMovesDefinitions from "./definitions/pawnMovesDefinitions";
import moveCalculator from "./calculators/moveCalculator";
import castleCalculator from "./calculators/castleCalculator";
import filterAbsolutePinSquares from "./calculators/filters/filterAbsolutePinSquares";

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
	[MOVE_TYPES.CASTLE]: castleCalculator,
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

const canCalculate = (pieceColor, symbol, state, options) => {
	return (
		//when ignoreTurn is on, we dont care about check or who's turn it is
		options.ignoreTurn ||
		//if checkmate no more moves allowed
		state.whiteCheck !== CHECK_TYPES.MATE &&
		state.blackCheck !== CHECK_TYPES.MATE &&
		//check if the right turn
		isRightTurn(state, pieceColor)
	);
};

export const calculateSquares = (square, symbol, pieceColor, state, options = {}) => {
	const definitions = PIECE_DEFINITIONS[symbol];

	const moves = calculateForDefinitions(
		definitions,
		square,
		symbol,
		state,
		pieceColor,
		options,
	);

	return (options.ignorePin || isKing(symbol)) ?
		moves :
		filterAbsolutePinSquares(square, symbol, pieceColor, moves, state);
};

const getMoveSquares = (square, symbol, state, options = {}) => {
	const pieceColor = getColorFromSymbol(symbol);

	return canCalculate(pieceColor, symbol, state, options) ?
		calculateSquares(square, symbol, pieceColor, state, options) : [];
};

export default getMoveSquares;
