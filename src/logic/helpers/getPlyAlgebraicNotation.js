

// const NOTATION_CREATORS = {
// 	NORMAL: ()
// };

import { switchReturn } from "../../utils";
import { isPawn } from "./is";
import { PIECES_EMOJIS } from "../../consts";

const getDisambiguationNotation = () => {

};

/**
 *
 * @param {Ply} ply
 * @returns {*}
 */
const createNotation = (ply) =>
	switchReturn([ply],
		//castling
		(ply) => {

		},
		//take
		(ply) => {
			if (ply.take) {

			}
		},

		/**
		 * create notation for normal move
		 * @param {Ply} ply
		 * @returns {{emoji: string}}
		 */
		(ply) => {
		return {
				emoji: `${PIECES_EMOJIS[ply.symbol]}${ply.disambiguationNeeded ? ply.previous[0]: "" }`
			}
			// if (isPawn(ply.symbol)){
			//
			// }
		});


/**
 *
 * @param {Ply} ply
 * @returns {}
 */
const getPlyAlgebraicNotation = (ply) => {
const notation  = createNotation(ply);


//TODO: is check?

	return
};

export default getPlyAlgebraicNotation;
