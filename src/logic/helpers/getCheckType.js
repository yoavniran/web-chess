import intersection from "lodash/intersection";
import { CHECK_TYPES, PIECE_COLORS } from "consts";
import { calculateSquares } from "../moves";
import findPieceTypeSquares from "./findPieceTypeSquares";
import getColorFromSymbol from "./getColorFromSymbol";
import getAttackingPiecesOnSquare from "./getAttackingPiecesOnSquare";
import { isKing } from "./is";

const getIsAbsolutePinned = (square, blockIntersect, state) => {

};

const getCanAttackBeBlocked = (attackInfo,  color, state) => {
	const ownPieces = color === PIECE_COLORS.WHITE ? state.whitePositions : state.blackPositions;

	return !!Object.entries(ownPieces)
		.find(([square, symbol]) => {
			if (!isKing(symbol)) {
				const moves = calculateSquares(
					square,
					symbol,
					state,
					color,
					{ ignoreTurn: true });

				const blockIntersect = intersection(moves, attackInfo.moves);
				console.log("!!!!! CHECK BLOCK: ", {
					square, symbol, blockIntersect
				});

				return !!blockIntersect.length &&
					!getIsAbsolutePinned(square, blockIntersect, state)
			}
		});
};

const getCanCheckBeBlocked = (color, attacks, state) => {
	//if more than one piece checking and king can't move its mate
	return attacks.length > 1 ? false :
		getCanAttackBeBlocked(attacks[0],  color, state);
};

const getCheckType = (symbol, state) => {
	let check = CHECK_TYPES.NONE;

	const square = findPieceTypeSquares(state, symbol)[0];
	const color = getColorFromSymbol(symbol);

	const attacks = getAttackingPiecesOnSquare(square,
		color === PIECE_COLORS.WHITE ? state.blackPositions : state.whitePositions, state);

	//square is being attacked (check or mate)
	if (attacks.length) {
		check = CHECK_TYPES.CHECK;

		//check if can move out of check
		const moves = calculateSquares(square, symbol, state, color);

		console.log("MOVES !!!", {  moves });

		if (!moves.length) {
			//look for piece that can block check
			check = getCanCheckBeBlocked( color, attacks, state) ?
				CHECK_TYPES.CHECK :
				CHECK_TYPES.MATE;
		}
	}

	return check;
};

export default getCheckType;
