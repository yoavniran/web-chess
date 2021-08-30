import FenParser from "@chess-fu/fen-parser";
import {
	BLACK_INIT_PIECES, BLACK_KING,
	EMPTY,
	PIECE_COLORS,
	TURN_PIECE,
	WHITE_INIT_PIECES,
	WHITE_KING,
} from "consts";
import getSquareName from "./helpers/getSquareName";
import getColorFromSymbol from "./helpers/getColorFromSymbol";
import getCheckType from "./helpers/getCheckType";
import findPieceTypeSquares from "./helpers/findPieceTypeSquares";

const getRowCol = (row, col, isFlipped) => {
	return [
		isFlipped ? row : 7 - row,
		isFlipped ? 7 - col : col,
	];
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
			blackPositions: {},
		});
};

const getTakesForColor = (color, initPieces, state) => {
	return Object.entries(initPieces)
		.map(([symbol, count]) => {
			const piecePositions = findPieceTypeSquares(state, symbol);

			return piecePositions.length < count ?
				new Array(count - piecePositions.length)
					.fill({symbol, color}) : [];
		}).flat()
};

const getTakes = (positions) => {
	return getTakesForColor(PIECE_COLORS.WHITE, WHITE_INIT_PIECES,positions)
		.concat(getTakesForColor(PIECE_COLORS.BLACK, BLACK_INIT_PIECES, positions));
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
		squares,
		whitePositions,
		blackPositions,
		takes: getTakes({ whitePositions, blackPositions }),
		castles: parser.castles,
		halfmoveClock: parser.halfmoveClock,
		move: parser.moveNumber - 1,
		turn: TURN_PIECE[parser.turn],
		enpass: parser.enpass !== EMPTY ? `${parser.enpass[0].toUpperCase()}${parser.enpass[1]}` : false,
		// whiteCheck: getCheckType(WHITE_KING, { squares, whitePositions, blackPositions }),
		// blackCheck: getCheckType(BLACK_KING, { squares, whitePositions, blackPositions }),
	};
};

export default translateFenToState;
