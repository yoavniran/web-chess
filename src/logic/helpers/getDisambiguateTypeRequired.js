import { NOTATION_DISAMBIGUATION_TYPES } from "consts";
import { isBishop, isKnight, isQueen, isRook } from "./is";
import findPieceTypeSquares from "./findPieceTypeSquares";
import { getNextMoveSquares } from "../moves";
import getSquareCoordinates from "./getSquareCoordinates";

/**
 *
 * @param {string} fromSquare
 * @param {string} toSquare
 * @param {string} symbol
 * @param {PIECE_COLORS} color
 * @param {State} state
 * @returns {NOTATION_DISAMBIGUATION_TYPES}
 */
const getDisambiguateTypeRequired = (fromSquare, toSquare, symbol, color, state) => {
	let result = NOTATION_DISAMBIGUATION_TYPES.NONE;

	//promotions can cause multiple queens/bishops(same color)
	if (isRook(symbol) || isKnight(symbol) || isQueen(symbol) || isBishop(symbol)) {
		const samePieceSquares = findPieceTypeSquares(state, symbol);

		if (samePieceSquares.length > 1) {
			//there is more than one of this piece type
			const competitorSquares = samePieceSquares.filter((square) =>
				square !== fromSquare &&
				getNextMoveSquares(square, symbol, color, state).includes(toSquare),
			);

			if (competitorSquares.length) {
				const fromCoordinates = getSquareCoordinates(fromSquare);

				//find whether there's a competitor square on same column or row that is better candidate for disambiguation
				const mostSimilar = (competitorSquares.length > 1 && competitorSquares.find((square) => {
					const compCoordinates = getSquareCoordinates(square);
					return fromCoordinates[0] === compCoordinates[0] || fromCoordinates[1] === compCoordinates[1];
				})) || competitorSquares[0];

				const similarCoordinates = getSquareCoordinates(mostSimilar);

				result = fromCoordinates[0] === similarCoordinates[0] ?
					NOTATION_DISAMBIGUATION_TYPES.ROW :
					NOTATION_DISAMBIGUATION_TYPES.COLUMN;
			}
		}
	}

	return result;
};

export default getDisambiguateTypeRequired;
