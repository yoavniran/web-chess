import intersection from "lodash/intersection";
import findPieceTypeSquares from "logic/helpers/findPieceTypeSquares";
import { getAbsolutePinAttacks } from "logic/helpers/getIsAbsolutePinned";
import { BLACK_KING, PIECE_COLORS, WHITE_KING } from "../../../../consts";

/**
 *
 * @param {string} startSquare
 * @param {string} symbol
 * @param {PIECE_COLORS} pieceColor
 * @param {Array.<string>} moveSquares
 * @param {State} state
 */
const filterAbsolutePinSquares = (startSquare, symbol, pieceColor, moveSquares, state) => {
	const kingSquare = findPieceTypeSquares(state,
		pieceColor === PIECE_COLORS.WHITE ? WHITE_KING : BLACK_KING)[0];

	const attacks = getAbsolutePinAttacks(
		startSquare,
		//simulate as if piece was removed from board
		null,
		pieceColor,
		symbol,
		kingSquare,
		state);

	return attacks.reduce((newMoves, attack) => {
		return intersection(newMoves , attack.moves.concat(attack.square));
	}, moveSquares);
};

export default filterAbsolutePinSquares;
