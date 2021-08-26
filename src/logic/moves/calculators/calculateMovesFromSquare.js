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
import { addArrayToSet } from "../../../utils";
import getColorFromSymbol from "../../helpers/getColorFromSymbol";
import kingMovesDefinitions from "./definitions/kingMovesDefinitions";
import queenMovesDefinitions from "./definitions/queenMovesDefinitions";
import rookMovesDefinitions from "./definitions/rookMovesDefinitions";
import bishopMovesDefinitions from "./definitions/bishopMovesDefinitions";
import knightMovesDefinitions from "./definitions/knightMovesDefinitions";
import pawnMovesDefinitions from "./definitions/pawnMovesDefinitions";
import moveCalculator from "./moveCalculator";

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

const isRightTurn = (state, pieceColor) => {
	return state.turn === pieceColor;
};

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
				res
			);

			return res;
		}, new Set());

	return [...movesSet.values()];
};

const canCalculate = (state, pieceColor, options) =>
	options.ignoreTurn || isRightTurn(state, pieceColor);

const calculateMovesFromSquare = (square, symbol, state, options = {}) => {
	const pieceColor = getColorFromSymbol(symbol);
	const definitions = PIECE_DEFINITIONS[symbol];

	return canCalculate(state, pieceColor, options) ? calculateForDefinitions(
		definitions,
		square,
		symbol,
		state,
		pieceColor,
		options,
	) : [];
};

export default calculateMovesFromSquare;
