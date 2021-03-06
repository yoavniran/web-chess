import {
	CHECK_TYPES, MOVE_TYPES,
	NOTATION_DISAMBIGUATION_TYPES,
	PIECES_EMOJIS,
} from "consts";
import { switchReturn } from "utils";
import { isColumn, isPawn, isWhite } from "./is";

const getCheckNotation = (ply) => {
	return ply.check === CHECK_TYPES.MATE ? "#" :
		(ply.check === CHECK_TYPES.CHECK ? "+" : "");
};

/**
 *
 * @param {Ply} ply
 * @returns {string}
 */
const getDisambiguationNotation = (ply) =>
	switchReturn(
		[ply.disambiguationNeeded, ply.previous, ply.symbol],
		(disamb, prev) => disamb === NOTATION_DISAMBIGUATION_TYPES.ROW && prev[1],
		(disamb, prev) => disamb === NOTATION_DISAMBIGUATION_TYPES.COLUMN && prev[0],
		(disamb, prev, symbol) => isPawn(symbol) && !!ply.take && prev[0],
		() => "",
	);

/**
 * create notation for take move
 * @param {Ply} ply
 * @param {boolean} notPawn
 * @param {string} check
 * @returns {Notation | boolean}
 */
const createTakeNotation = (ply, notPawn, check) => {
	const disNot = getDisambiguationNotation(ply);

	return !!ply.take && {
		emoji: `${notPawn ? PIECES_EMOJIS[ply.symbol] : ""}${disNot}x${ply.target}${check}`,
		normal: `${notPawn ? ply.symbol : ""}${disNot}x${ply.target}${check}`,
	};
};

/**
 * create notation for normal move
 * @param {Ply} ply
 * @param {boolean} notPawn
 * @param {string} check
 * @returns {Notation}
 */
const createNormalNotation = (ply, notPawn, check) => {
	const disNot = getDisambiguationNotation(ply);

	return {
		emoji: `${notPawn ? PIECES_EMOJIS[ply.symbol] : ""}${disNot}${ply.target}${check}`,
		normal: `${notPawn ? ply.symbol : ""}${disNot}${ply.target}${check}`,
	};
};

/**
 *
 * @param {Ply} ply
 * @returns {Notation | boolean}
 */
const createCastlingNotation = (ply) => {
	const notation = ply.moveType === MOVE_TYPES.CASTLE &&
	(isColumn(ply.target, "G") ? "O-O" : "O-O-O");

	return notation && {
		emoji: notation,
		normal: notation,
		isCastle: true,
	};
};

/**
 *
 * @param {Ply} ply
 * @returns PlyAlgebraicNotation
 */
const getPlyAlgebraicNotation = (ply) => {
	const notPawn = !isPawn(ply.symbol);
	const check = getCheckNotation(ply);

	/**
	 * @type {Notation}
	 */
	const notation = switchReturn([ply, notPawn, check],
		createCastlingNotation,
		createTakeNotation,
		createNormalNotation,
	);

	return {
		isCastle: false,
		...notation,
		index: [ply.move, isWhite(ply.symbol) ? 0 : 1],
		isPawn: !notPawn,
	};
};

export default getPlyAlgebraicNotation;
