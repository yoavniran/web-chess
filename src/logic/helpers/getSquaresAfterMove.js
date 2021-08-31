import { switchReturn } from "../../utils";

const getSquaresAfterNormalMove = (squares, startSquare, targetSquare, symbol, color) => {
	return {
		...squares,
		[startSquare]: {
			...squares[startSquare],
			isEmpty: true,
			symbol: false,
			pieceColor: null,
		},
		[targetSquare]: {
			...squares[targetSquare],
			isEmpty: false,
			symbol,
			pieceColor: color,
		},
	};
};

const getSquaresAfterCastle = () => {

};

const getSquaresAfterEnpassant = () => {

};

const getSquaresAfterMove = (squares, startSquare, targetSquare, symbol, color, takeInfo) => {
	//TODO: get is enpassant! need to remove pawn from correct square (even though pwn didnt move to it)
	//TODO: get is move is castle - calculate squares according to castle
	//TODO: handle promotion ! dont finalize move until client (UI) returns the promoted symbol

	return switchReturn(
		[squares, startSquare, targetSquare, symbol, color, takeInfo],
		getSquaresAfterCastle,
		getSquaresAfterEnpassant,
		getSquaresAfterNormalMove,
	);
};

export default getSquaresAfterMove;
