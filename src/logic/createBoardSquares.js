import getSquareTone from "./getSquareTone";
import getSquareName from "./getSquareName";

/**
 * @typedef BoardSquare
 * @type {object}
 * @property {string} name
 * @property {SQUARE_TONES} tone
 * @property {number} row
 * @property {number} col
 */


/**
 * returns board squares White by default
 * or for black when isFlipped is true
 * @param {boolean} isFlipped
 * @returns {BoardSquare[]}
 */
const createBoardSquares = (isFlipped = false) => {
	const rowStartIndex = isFlipped ? 0 : 7,
		rowLoopOp = isFlipped ? 1 : -1,
		colStartIndex = isFlipped ? 7 : 0,
		colLoopOp = isFlipped ? -1 : 1;

	const grid = new Array(64);

	//these loops iterate for both sides (isFlipped false/true) so:
	//For White: position [0:0] is A1
	//For Black: position [0:0] is H8
	for (let row = rowStartIndex, i2 = 0; i2 < 8; row += rowLoopOp, i2++) {
		for (let col = colStartIndex, j2 = 0; j2 < 8; col += colLoopOp, j2++) {
			const index = (i2 * 7) + j2 + i2;

			grid[index] = {
				name: getSquareName(row, col),
				tone: getSquareTone(row, col),
				row,
				col,
			};

			// console.log(" CELL !!! ", { index, row: i, col: j, i2, j2, square: grid[index] });
		}
	}

	return grid;
};

export default createBoardSquares;
