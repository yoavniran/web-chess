import { PIECE_COLORS } from "consts";
import getColorFromSymbol from "./getColorFromSymbol";

/**
 * finds all squares occupied by this piece of the same color
 * @param {State} state
 * @param {string} symbol
 * @returns {string[]} square names
 */
const findPieceTypeSquares = (state, symbol) => {
	const color = getColorFromSymbol(symbol);
	const positions = color === PIECE_COLORS.WHITE ?
		state.whitePositions : state.blackPositions;

	return Object.entries(positions)
		.filter(([square, squareSymbol]) => squareSymbol === symbol)
		.map(([square]) => square);
};

export default findPieceTypeSquares;
