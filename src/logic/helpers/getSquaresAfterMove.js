import { switchReturn } from "utils";
import getColorFromSymbol from "./getColorFromSymbol";
import { isEmptyChar } from "./is";

const getSquareData = (symbol, color, square = null, name) => {
	const useSymbol = symbol && !isEmptyChar(symbol) ? symbol : false;
	const pieceColor = color || (useSymbol ? getColorFromSymbol(useSymbol) : null);

	return {
		...square,
		name: name || square.name,
		symbol: useSymbol,
		pieceColor,
		isEmpty: !useSymbol,
	}
};

const getSquaresAfterNormalMove = (squares, startSquare, targetSquare, symbol, color) => {
	return {
		...squares,
		[startSquare]: getSquareData(false, null, squares[startSquare]),
		...(targetSquare ?
			{ [targetSquare]: getSquareData(symbol, color, squares[targetSquare]) } :
			{}),
	};
};

const getSquaresAfterCastle = () => {

};

const getSquaresAfterEnpassant = () => {

};

const getSquaresAfterMove = (squares, startSquare, targetSquare, symbol, color) => {
	//TODO: get is enpassant! need to remove pawn from correct square (even though pwn didnt move to it)
	//TODO: get is move is castle - calculate squares according to castle
	//TODO: handle promotion ! dont finalize move until client (UI) returns the promoted symbol

	return switchReturn(
		[squares, startSquare, targetSquare, symbol, color],
		getSquaresAfterCastle,
		getSquaresAfterEnpassant,
		getSquaresAfterNormalMove,
	);
};

export default getSquaresAfterMove;

export {
	getSquareData
};
