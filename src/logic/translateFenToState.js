import FenParser from "@chess-fu/fen-parser";
import {
	BLACK_INIT_PIECES,
	EMPTY,
	PIECE_COLORS,
} from "consts";
import getSquareName from "./helpers/getSquareName";
import getColorFromSymbol from "./helpers/getColorFromSymbol";
import getBoardState from "./boardState";

const ALLOWED_PIECES_CHARS = Object.keys(BLACK_INIT_PIECES);

const getRowCol = (row, col, isFlipped) => [
	isFlipped ? row : 7 - row,
	isFlipped ? 7 - col : col,
];

const getFenRowSquares = (rowChars, row, isFlipped) => {
	const chars = isFlipped ? rowChars.split("").reverse() : rowChars.split("");
	return chars
		.map((c, col) => {
			const symbol = c !== EMPTY ? c : false;
			const pieceColor = symbol ? getColorFromSymbol(symbol) : null;

			if (symbol && !ALLOWED_PIECES_CHARS.includes(symbol.toLowerCase())) {
				throw new Error(`INVALID FEN! Unknown piece symbol = ${symbol}`);
			}

			return {
				name: getSquareName(...getRowCol(row, col, isFlipped)),
				symbol,
				pieceColor,
				isEmpty: c === EMPTY,
			};
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
		throw new Error("Invalid FEN - Could not parse", fen);
	}

	const parser = new FenParser(fen);
	const { squares, whitePositions, blackPositions } = getSquaresData(parser, isFlipped);

	return getBoardState(
		squares,
		whitePositions,
		blackPositions,
		parser.castles,
		parser.halfmoveClock,
		parser.enpass,
		parser.moveNumber,
		parser.turn
	);
};

export default translateFenToState;
