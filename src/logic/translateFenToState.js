import FenParser from "@chess-fu/fen-parser";
import { EMPTY, TURN_PIECE } from "consts";
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
 * @property {Object.<string, PieceSquare>} piecesSquares
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
 * Returns current game's squares with their info
 * @param parser
 * @param {boolean} isFlipped
 * @returns {Object.<string, PieceSquare>}
 */
const getPiecesSquares = (parser, isFlipped) => {
	const ranks = isFlipped ? parser.ranks.reverse() : parser.ranks;

	return [].concat(ranks.map((rowChars, row) => {
		const chars = isFlipped ? rowChars.split("").reverse() : rowChars.split("");
		return chars
			.map((c, col) => {
				const symbol = c !== EMPTY ? c : false;

				return {
					square: getSquareName(...getRowCol(row, col, isFlipped)),
					symbol,
					pieceColor: symbol && getColorFromSymbol(symbol),
					isEmpty: c === EMPTY,
				};
			});
	})).flat()
		.reduce((res, piece) => {
			res[piece.square] = piece;
			return res;
		}, {});
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

	return {
		piecesSquares: getPiecesSquares(parser, isFlipped),
		castles: parser.castles,
		halfmoveClock: parser.halfmoveClock,
		move: parser.moveNumber - 1,
		turn: TURN_PIECE[parser.turn],
		enpass: parser.enpass !== EMPTY ? parser.enpass : false,
	};
};

export default translateFenToState;
