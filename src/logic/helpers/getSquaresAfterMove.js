import { switchReturn } from "utils";
import getColorFromSymbol from "./getColorFromSymbol";
import { isColumn, isEmptyChar } from "./is";
import { BLACK_ROOK, MOVE_TYPES, PIECE_COLORS, WHITE_ROOK } from "../../consts";

const getSquareData = (symbol, color, square = null, name) => {
	const useSymbol = symbol && !isEmptyChar(symbol) ? symbol : false;
	const pieceColor = color || (useSymbol ? getColorFromSymbol(useSymbol) : null);

	return {
		...square,
		name: name || square.name,
		symbol: useSymbol,
		pieceColor,
		isEmpty: !useSymbol,
	};
};

const getSquaresAfterNormalMove = (squares, startSquare, move, symbol, color) => {
	return {
		...squares,
		[startSquare]: getSquareData(false, null, squares[startSquare]),
		...(move.square ?
			{ [move.square]: getSquareData(symbol, color, squares[move.square]) } :
			{}),
	};
};

const getSquaresAfterCastle = (squares, startSquare, move, symbol, color) => {
	let newSquares = null;

	if (move.type === MOVE_TYPES.CASTLE) {
		const isQueenSide = isColumn(move.square, "C");
		const row = color === PIECE_COLORS.WHITE ? "1" : "8";
		//TODO: Add support for 960 (rook may be on different square)
		const rookSquare = (isQueenSide ? "A" : "H") + row;
		const newRookSquare = (isQueenSide ? "D" : "F") + row;
		const rook = color === PIECE_COLORS.WHITE ? WHITE_ROOK : BLACK_ROOK;

		newSquares = {
			...squares,
			[startSquare]: getSquareData(false, null, squares[startSquare]),
			[move.square]: getSquareData(symbol, color, squares[move.square]),
			[rookSquare]: getSquareData(false, null, squares[rookSquare]),
			[newRookSquare]: getSquareData(rook, color, squares[newRookSquare]),
		};
	}

	return newSquares;
};

const getSquaresAfterEnpassant = (squares, startSquare, move, symbol, color) => {
	if (move.type === MOVE_TYPES.EN_PASSANT) {

	}
};

/**
 * calculate the board squares after the requsted move
 * @param {Object.<string, PieceSquare>} squares - current squares
 * @param startSquare - square piece moves from
 * @param move - the requested move
 * @param symbol - the piece
 * @param color - the piece color
 * @return {Object.<string, PieceSquare>}
 */
const getSquaresAfterMove = (squares, startSquare, move, symbol, color) => {
	//TODO: get is enpassant! need to remove pawn from correct square (even though pwn didnt move to it)
	//TODO: handle promotion ! dont finalize move until client (UI) returns the promoted symbol

	return switchReturn(
		[squares, startSquare, move, symbol, color],
		getSquaresAfterCastle,
		getSquaresAfterEnpassant,
		getSquaresAfterNormalMove,
	);
};

export default getSquaresAfterMove;

export {
	getSquareData,
};
