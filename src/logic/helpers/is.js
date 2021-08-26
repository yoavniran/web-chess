import {
	BLACK_KING,
	BLACK_ROOK,
	WHITE_KING,
	WHITE_ROOK,
	BLACK_QUEEN,
	WHITE_QUEEN,
	BLACK_PAWN,
	WHITE_PAWN,
	BLACK_BISHOP,
	WHITE_BISHOP,
	BLACK_KNIGHT,
	WHITE_KNIGHT,

	PIECE_COLORS,
	EMPTY,
} from "consts";
import { switchReturn } from "utils";
import getColorFromSymbol from "./getColorFromSymbol";
import getSquareCoordinates from "./getSquareCoordinates";

export const isKing = (symbol) => symbol === BLACK_KING || symbol === WHITE_KING;

export const isRook = (symbol) => symbol === BLACK_ROOK || symbol === WHITE_ROOK;

export const isQueen = (symbol) => symbol === BLACK_QUEEN || symbol === WHITE_QUEEN;

export const isBishop = (symbol) => symbol === BLACK_BISHOP || symbol === WHITE_BISHOP;

export const isKnight = (symbol) => symbol === BLACK_KNIGHT || symbol === WHITE_KNIGHT;

export const isPawn = (symbol) => symbol === BLACK_PAWN || symbol === WHITE_PAWN;

export const isBlack = (symbol) => getColorFromSymbol(symbol) === PIECE_COLORS.BLACK;

export const isWhite = (symbol) => getColorFromSymbol(symbol) === PIECE_COLORS.WHITE;

export const isEmptyChar = (char) => char === EMPTY;

export const isRookStartPosition = (symbol, square) =>
	switchReturn([getColorFromSymbol(symbol), getSquareCoordinates(square)],
		(color, [col, row]) =>
			color === PIECE_COLORS.WHITE && row === 0 && (col === 0 || col === 7),
		(color, [col, row]) =>
			color === PIECE_COLORS.BLACK && row === 7 && (col === 0 || col === 7),
	);

export const isPawnStartPosition = (symbol, square) =>
	switchReturn([getColorFromSymbol(symbol), getSquareCoordinates(square)],
		(color, [col, row]) =>
			color === PIECE_COLORS.WHITE && row === 1,
		(color, [col, row]) =>
			color === PIECE_COLORS.BLACK && row === 6
);
