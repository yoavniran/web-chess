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
	return definitions
		.reduce((res, [defType, ...definition]) => {
			const moves = MOVE_CALCULATORS[defType](square, symbol, state, pieceColor, definition, options);
			moves.forEach((move) => res.set(move.square, move));
			return res;
		}, new Map());
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

/**
 * convert Map to object-map
 * @param {Map.<string, Move>} movesMap
 * @return {Record.<string, Move>}
 */
const getMovesFromMap = (movesMap) =>
	[...movesMap.entries()]
	.reduce((res, [key, move]) => {
		res[key] = move;
		return res;
	}, {})

const getFilteredFromAbsolutePins = (movesMap, square, symbol, pieceColor, state) => {
	const moves = getMovesFromMap(movesMap);
	const filtered = filterAbsolutePinSquares(square, symbol, pieceColor, Object.keys(moves), state);

	return movesMap.size === filtered.length ?
		getMovesFromMap(movesMap) :
		filtered.reduce((res, square) => {
			res[square] = movesMap.get(square);
			return res;
		}, {});
};

/**
 *
 * @param square
 * @param symbol
 * @param pieceColor
 * @param state
 * @param options
 * @return {Record.<string, Move>}
 */
const calculateMoves = (square, symbol, pieceColor, state, options = {}) => {
	const definitions = PIECE_DEFINITIONS[symbol];

	const movesMap = calculateForDefinitions(
		definitions,
		square,
		symbol,
		state,
		pieceColor,
		options,
	);

	return (options.ignorePin || isKing(symbol)) ?
		getMovesFromMap(movesMap) :
		getFilteredFromAbsolutePins(movesMap, square, symbol, pieceColor, state);
};

/**
 *
 * @param square
 * @param symbol
 * @param pieceColor
 * @param state
 * @param options
 * @return {string[]}
 */
const getNextMoveSquares = (square, symbol, pieceColor, state, options = {}) => {
	const movesMap = calculateMoves(square, symbol, pieceColor, state, options);
	return Object.values(movesMap)
		.map((m) => m.square);
};

/**
 *
 * @param square
 * @param symbol
 * @param state
 * @param options
 * @return {Record.<string,Move>}
 */
const getNextMoves = (square, symbol, state, options = {}) => {
	const pieceColor = getColorFromSymbol(symbol);

	return canCalculate(pieceColor, symbol, state, options) ?
		calculateMoves(square, symbol, pieceColor, state, options) : [];
};

export default getNextMoves;

export {
	getNextMoveSquares,
};
