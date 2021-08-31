import intersection from "lodash/intersection";
import { CHECK_TYPES, PIECE_COLORS } from "consts";
import { calculateSquares } from "../moves";
import findPieceTypeSquares from "./findPieceTypeSquares";
import getColorFromSymbol from "./getColorFromSymbol";
import getAttackingPiecesOnSquare from "./getAttackingPiecesOnSquare";
import { isKing } from "./is";
import getSquaresAfterMove from "./getSquaresAfterMove";
import { getColorPiecePositions } from "../moves/calculators/afterMove";

const getIsAbsolutePinned = (square, blockIntersect, color, symbol, checkSquare, state) => {
	const opponentPieces = color === PIECE_COLORS.WHITE ? state.blackPositions : state.whitePositions;

	//get board as if blocking piece moved to block
	const afterMoveSquares = getSquaresAfterMove(
		state.squares,
		square,
		blockIntersect[0],
		symbol,
		color);

	console.log("!!!! AFTER MOVE SQUAREs = ", afterMoveSquares);

	//get state as if blocking piece moved
	const checkState = {
		...state,
		squares: afterMoveSquares,
		whitePositions: color === PIECE_COLORS.WHITE ?
			getColorPiecePositions(PIECE_COLORS.WHITE, afterMoveSquares ) : opponentPieces,
		blackPositions: color === PIECE_COLORS.BLACK ?
			getColorPiecePositions(PIECE_COLORS.BLACK, afterMoveSquares) : opponentPieces,
	}

	const attacks = getAttackingPiecesOnSquare(
		checkSquare,
		opponentPieces,
		[],
		checkState
	);

	console.log("ATTACKS AFTER block is made", {
		checkSquare,
		...attacks[0]
	});
	//find if king is attacked(checked) after blocking piece moved
	return !!attacks.find(({ moves }) => moves.includes(checkSquare));
};

const getCanAttackBeBlocked = (checkSquare, attackInfo, color, state) => {
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

				console.log(
					"FIND BLOCK",
					{
						symbol,
						attackInfo,
						moves,
						blockIntersect
					}
				);

				return !!blockIntersect.length &&
					!getIsAbsolutePinned(
						square,
						blockIntersect,
						color,
						symbol,
						checkSquare,
						state)
			}
		});
};

const getCanCheckBeBlocked = (checkSquare, color, attacks, state) => {
	//if more than one piece checking and king can't move its mate
	return attacks.length > 1 ? false :
		getCanAttackBeBlocked(checkSquare, attacks[0],  color, state);
};

const getCheckType = (symbol, state) => {
	let check = CHECK_TYPES.NONE;

	const square = findPieceTypeSquares(state, symbol)[0];
	const color = getColorFromSymbol(symbol);

	const attacks = getAttackingPiecesOnSquare(
		square,
		color === PIECE_COLORS.WHITE ? state.blackPositions : state.whitePositions,
		[],
		state
	);

	//square is being attacked (check or mate)
	if (attacks.length) {
		check = CHECK_TYPES.CHECK;

		//check if can move out of check
		const moves = calculateSquares(square, symbol, state, color);

		if (!moves.length) {
			//look for piece that can block check
			check = getCanCheckBeBlocked( square, color, attacks, state) ?
				CHECK_TYPES.CHECK :
				CHECK_TYPES.MATE;
		}
	}

	return check;
};

export default getCheckType;
