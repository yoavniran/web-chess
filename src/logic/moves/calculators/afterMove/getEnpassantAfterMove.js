import { PIECE_COLORS } from "consts";
import { isPawn, isPawnStartPosition } from "logic/helpers/is";
import getSquareCoordinates from "logic/helpers/getSquareCoordinates";
import getSquareName from "logic/helpers/getSquareName";

/**
 *
 * @param {State} state
 * @param {string} symbol
 * @param {string} color
 * @param {string} startSquare
 * @param {string} targetSquare
 * @returns {string}
 */
const getEnpassantAfterMove = (state, symbol, color, startSquare, targetSquare) => {
	let enpassant = false;

	if (isPawn(symbol) && isPawnStartPosition(symbol, startSquare)) {
		const targetCoordinates = getSquareCoordinates(targetSquare);
		if (Math.abs(getSquareCoordinates(startSquare)[1] - targetCoordinates[1]) === 2) {
			const enpRow = color === PIECE_COLORS.WHITE ?
				targetCoordinates[1] - 1 : targetCoordinates[1] + 1;
			enpassant = getSquareName(enpRow, targetCoordinates[0]);
		}
	}

	return enpassant;
};

export default getEnpassantAfterMove;
