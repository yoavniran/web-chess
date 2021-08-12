import { EMPTY } from "consts";
import FenParser from "@chess-fu/fen-parser";
import getSquareName from "./getSquareName";

const getRowCol = (row, col, isFlipped) => {
	return [
		isFlipped ? row : 7 - row,
		isFlipped ? 7 - col : col,
	];
};

const getPiecesSquares = (parser, isFlipped) => {
	const ranks = isFlipped ? parser.ranks.reverse() : parser.ranks;

	return [].concat(ranks.map((rowChars, row) => {
		const chars = isFlipped ? rowChars.split("").reverse() : rowChars.split("");
		return chars
			.map((c, col) => {
				return {
					square: getSquareName(...getRowCol(row, col, isFlipped)),
					symbol: c !== EMPTY ? c : false,
					isEmpty: c === EMPTY,
				};
			});
	})).flat();
};

const translateFenToState = (fen, isFlipped = false) => {
	if (!FenParser.isFen(fen)) {
		throw new Error("PROVIDED FEN ISNT VALID !!!! ", fen);
	}

	const parser = new FenParser(fen);

	return {
		piecesSquares: getPiecesSquares(parser, isFlipped),
		castles: parser.castles,
		ply: parser.halfmoveClock,
		move: parser.moveNumber - 1,
		turn: parser.turn,
		enpass: parser.enpass !== EMPTY ? parser.enpass : false,
	};
};

export default translateFenToState;
