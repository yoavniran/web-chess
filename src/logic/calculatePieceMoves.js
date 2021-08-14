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
} from "consts";
import getColorFromSymbol from "./getColorFromSymbol";
import pawnMoveCalculator from "./moves/pawnMoveCalculator";

const kingCalculator = (square, symbol, state, isFlipped) => {

};

const queenCalculator = (square, symbol, state, isFlipped) => {

};

const knightCalculator = (square, symbol, state, isFlipped) => {

};

const bishopCalculator = (square, symbol, state, isFlipped) => {

};

const rookCalculator = (square, symbol, state, isFlipped) => {

};

const MOVE_CALCULATORS = {
	[BLACK_KING]: kingCalculator,
	[WHITE_KING]: kingCalculator,

	[BLACK_QUEEN]: queenCalculator,
	[WHITE_QUEEN]: queenCalculator,

	[BLACK_KNIGHT]: knightCalculator,
	[WHITE_KNIGHT]: knightCalculator,

	[WHITE_BISHOP]: bishopCalculator,
	[BLACK_BISHOP]: bishopCalculator,

	[WHITE_ROOK]: rookCalculator,
	[BLACK_ROOK]: rookCalculator,

	[WHITE_PAWN]: pawnMoveCalculator,
	[BLACK_PAWN]: pawnMoveCalculator,
};

const calculatePieceMoves = (square, symbol, state) => {
	const pieceColor = getColorFromSymbol(symbol);

	return MOVE_CALCULATORS[symbol](
		square,
		symbol,
		state,
		pieceColor,
	);
};

export default calculatePieceMoves;
