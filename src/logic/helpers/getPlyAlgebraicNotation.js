import {
	CHECK_TYPES,
	NOTATION_DISAMBIGUATION_TYPES,
	PIECES_EMOJIS,
} from "consts";
import { switchReturn } from "utils";
import { isPawn } from "./is";

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
		() => ""
	);

/**
 * create notation for take move
 * @param {Ply} ply
 * @param {boolean} notPawn
 * @param {string} check
 * @returns {{emoji: string, normal: string} | boolean}
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
 * @returns {{emoji: string, normal: string}}
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
 * @returns {*}
 */
const createNotation = (ply) => {
	const notPawn = !isPawn(ply.symbol);
	const check = getCheckNotation(ply);

	return switchReturn([ply, notPawn, check],
		//castling
		(ply) => {
			//tODO!!!!!!!! CASTLING NOTATION!!
		},
		createTakeNotation,
		createNormalNotation,
	);
};

/**
 *
 * @param {Ply} ply
 * @returns {string}
 */
const getPlyAlgebraicNotation = (ply) => {
	return createNotation(ply);
};

export default getPlyAlgebraicNotation;
