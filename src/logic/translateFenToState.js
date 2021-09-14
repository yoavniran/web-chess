import FenParser from "@chess-fu/fen-parser";
import {
	BLACK_INIT_PIECES,
	PIECE_COLORS,
	TURN_PIECE,
} from "consts";
import getSquareName from "./helpers/getSquareName";
import { getSquareData } from "./helpers/getSquaresAfterMove";
import getBoardState from "./state/boardState";
import { isEmptyChar } from "./helpers/is";

const ALLOWED_PIECES_CHARS = Object.keys(BLACK_INIT_PIECES);

const getRowCol = (row, col, isFlipped) => [
	isFlipped ? row : 7 - row,
	isFlipped ? 7 - col : col,
];

const getFenRowSquares = (rowChars, row, isFlipped) => {
	const chars = isFlipped ? rowChars.split("").reverse() : rowChars.split("");
	return chars
		.map((c, col) => {
			if (!isEmptyChar(c) && !ALLOWED_PIECES_CHARS.includes(c.toLowerCase())) {
				throw new Error(`WebChess - INVALID FEN! Unknown piece symbol = ${c}`);
			}

			return getSquareData(c, null, null, getSquareName(...getRowCol(row, col, isFlipped)));
		});
};

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

	return []
		.concat(ranks.map((rowChars, row) =>
			getFenRowSquares(rowChars, row, isFlipped)))
		.flat()
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
			blackPositions: {},
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
		throw new Error(`WebChess - Invalid FEN - Could not parse: ${fen}`);
	}

	const parser = new FenParser(fen);
	const { squares, whitePositions, blackPositions } = getSquaresData(parser, isFlipped);

	return getBoardState({
		squares,
		whitePositions,
		blackPositions,
		castles: parser.castles,
		halfmoveClock: parser.halfmoveClock,
		enpassant: parser.enpass,
		move: (parser.moveNumber - 1),
		turn: TURN_PIECE[parser.turn],
	});
};

export default translateFenToState;
