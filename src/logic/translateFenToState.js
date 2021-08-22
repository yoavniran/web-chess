import FenParser from "@chess-fu/fen-parser";
import { EMPTY, PIECE_COLORS, TURN_PIECE } from "consts";
import getSquareName from "./utils/getSquareName";
import getColorFromSymbol from "./utils/getColorFromSymbol";

const getRowCol = (row, col, isFlipped) => {
	return [
		isFlipped ? row : 7 - row,
		isFlipped ? 7 - col : col,
	];
};

/**
 * @typedef State
 * @type {object}
 * @property {Object.<string, PieceSquare>} squares
 * @property {Object.<string, string>} whitePositions
 * @property {Object.<string, string>} blackPositions
 * @property {string} castles
 * @property {number} halfMoveClock
 * @property {number} move
 * @property {TURN_PIECE} turn
 * @property {boolean | string} enpass
 */

/**
 * @typedef PieceSquare
 * @type {object}
 * @property {string} square
 * @property {string} symbol
 * @property {PIECE_COLOR} pieceColor
 * @property {boolean} isEmpty
 */

/**
 * Returns:
 *  - current game's squares with their info
 *  - current white pieces positions
 *  - current black pieces positions
 * @param parser
 * @param {boolean} isFlipped
 * @returns {squares: Object.<string, PieceSquare>, whitePositions: Object.<string, string>, blackPositions: Object.<string, string>}
 */
const getSquaresData = (parser, isFlipped) => {
	const ranks = isFlipped ? parser.ranks.reverse() : parser.ranks;

	const blackPositions = {},
		whitePositions = {};

	return [].concat(ranks.map((rowChars, row) => {
		const chars = isFlipped ? rowChars.split("").reverse() : rowChars.split("");
		return chars
			.map((c, col) => {
				const symbol = c !== EMPTY ? c : false;
				const pieceColor = symbol ? getColorFromSymbol(symbol) : null;

				return {
					name: getSquareName(...getRowCol(row, col, isFlipped)),
					symbol,
					pieceColor,
					isEmpty: c === EMPTY,
				};
			});
	})).flat()
		.reduce((res, square) => {
			res.squares[square.name] = square;

			if (!square.isEmpty) {
				if (square.pieceColor === PIECE_COLORS.WHITE) {
					res.whitePositions[square.name] = square.symbol;
				} else {
					res.blackPositions[square.name] = square.symbol;
				}
			}

			return res;
		}, {
			squares: {},
			whitePositions: {},
			blackPositions: {}
		});
};

/**
 * translateFenToState
 * @param fen
 * @param isFlipped
 * @returns {State}
 */
const translateFenToState = (fen, isFlipped = false) => {
	if (!FenParser.isFen(fen)) {
		throw new Error("PROVIDED FEN ISNT VALID !!!! ", fen);
	}

	const parser = new FenParser(fen);

	const { squares, whitePositions, blackPositions } = getSquaresData(parser, isFlipped);

	return {
		squares, //: getPiecesSquares(parser, isFlipped),
		whitePositions,
		blackPositions,
		castles: parser.castles,
		halfmoveClock: parser.halfmoveClock,
		move: parser.moveNumber - 1,
		turn: TURN_PIECE[parser.turn],
		enpass: parser.enpass !== EMPTY ? parser.enpass : false,
	};
};

export default translateFenToState;
