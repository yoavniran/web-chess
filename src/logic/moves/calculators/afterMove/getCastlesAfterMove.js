import { CASTLE_SIDES, EMPTY } from "consts";
import { isEmptyChar, isKing, isRook, isRookStartPosition } from "logic/helpers/is";
import { getCanCastle, CASTLE_POSITIONS, CASTLES_RGX } from "logic/helpers/castleHelpers";
import getSquareCoordinates from "logic/helpers/getSquareCoordinates";

const getCastlesAfterMove = (state, symbol, color, startSquare) => {
	let newCastles;

	if (!isEmptyChar(state.castles)) {
		const chars = CASTLES_RGX.exec(state.castles);

		if (isKing(symbol) && getCanCastle(state.castles, color)) {
			chars[CASTLE_POSITIONS[color + CASTLE_SIDES.KING]] = "";
			chars[CASTLE_POSITIONS[color + CASTLE_SIDES.QUEEN]] = "";
		} else if (isRook(symbol) && isRookStartPosition(symbol, startSquare)) {
			const [col] = getSquareCoordinates(startSquare);
			chars[CASTLE_POSITIONS[color + (col === 0 ? CASTLE_SIDES.QUEEN : CASTLE_SIDES.KING)]] = "";
		}

		newCastles = chars.slice(1).filter(Boolean).join("") || EMPTY;
	}

	return newCastles || state.castles;
};

export default getCastlesAfterMove;
