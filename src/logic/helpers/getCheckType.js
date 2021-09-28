import intersection from "lodash/intersection";
import { CHECK_TYPES, PIECE_COLORS } from "consts";
import { getNextMoveSquares } from "../moves";
import findPieceTypeSquares from "./findPieceTypeSquares";
import getColorFromSymbol from "./getColorFromSymbol";
import getAttackingPiecesOnSquare from "./getAttackingPiecesOnSquare";
import getOppositeColor from "./getOppositeColor";
import getIsAbsolutePinned from "./getIsAbsolutePinned";
import { isKing } from "./is";

const getCanTakeToGetOut = (checkSquare, attackInfo, color, state) => {
	const takesOnChecker = getAttackingPiecesOnSquare(
		attackInfo.square,
		getOppositeColor(color),
		[],
		state,
	);

	return !!takesOnChecker.find((take) => {
		return !getIsAbsolutePinned(
			take.square,
			attackInfo.square,
			color,
			take.symbol,
			checkSquare,
			state,
		);
	});
};

const getCanAttackBeBlocked = (checkSquare, attackInfo, color, state) => {
	const ownPieces = color === PIECE_COLORS.WHITE ? state.whitePositions : state.blackPositions;

	return !!Object.entries(ownPieces)
		//king cant check another king
		.filter(([square, symbol]) => !isKing(symbol))
		.find(([square, symbol]) => {
			const moves = getNextMoveSquares(
				square,
				symbol,
				color,
				state,
				{ ignoreTurn: true });

			const blockIntersect = intersection(moves, attackInfo.moves);

			return !!blockIntersect.length &&
				!getIsAbsolutePinned(
					square,
					blockIntersect[0],
					color,
					symbol,
					checkSquare,
					state);
		});
};

const getCanCheckBeBlocked = (checkSquare, color, attacks, state) => {
	//if more than one piece checking and king can't move its mate
	return attacks.length > 1 ? false :
		getCanAttackBeBlocked(checkSquare, attacks[0], color, state) ||
		getCanTakeToGetOut(checkSquare, attacks[0], color, state);
};

const getCheckType = (symbol, state) => {
	let check = CHECK_TYPES.NONE;

	const square = findPieceTypeSquares(state, symbol)[0];
	const color = getColorFromSymbol(symbol);

	const attacks = getAttackingPiecesOnSquare(
		square,
		color,
		[],
		state,
	);

	//square is being attacked (check or mate)
	if (attacks.length) {
		check = CHECK_TYPES.CHECK;

		//check if can move out of check
		const moves = getNextMoveSquares(square, symbol,  color, state);

		if (!moves.length) {
			//look for piece that can block check
			check = getCanCheckBeBlocked(square, color, attacks, state) ?
				CHECK_TYPES.CHECK :
				CHECK_TYPES.MATE;
		}
	}

	return check;
};

export default getCheckType;
