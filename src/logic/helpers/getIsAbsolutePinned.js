import { MOVE_TYPES, PIECE_COLORS } from "consts";
import { getColorPiecePositions } from "../moves/calculators/afterMove";
import getSquaresAfterMove from "./getSquaresAfterMove";
import getAttackingPiecesOnSquare from "./getAttackingPiecesOnSquare";

/**
 *
 * @param {string} square
 * @param {string} moveSquare
 * @param {PIECE_COLORS} color
 * @param {string} symbol
 * @param {string} checkSquare
 * @param {State} state
 * @returns {AttackInfo[]}
 */
export const getAbsolutePinAttacks = (square, moveSquare, color, symbol, checkSquare, state) => {
	//get board as if blocking piece moved
	const afterMoveSquares = getSquaresAfterMove(
		state.squares,
		square,
		{ square: moveSquare, type: MOVE_TYPES.MOVE },
		symbol,
		color);

	const attacks = getAttackingPiecesOnSquare(
		checkSquare,
		color,
		[],
		//get state as if blocking piece moved
		state.clone({
			squares: afterMoveSquares,
			whitePositions: getColorPiecePositions(PIECE_COLORS.WHITE, afterMoveSquares),
			blackPositions: getColorPiecePositions(PIECE_COLORS.BLACK, afterMoveSquares),
		}),
		{
			bailOnFirst: true,
		},
	);

	//find if king is attacked(checked) after blocking piece moved
	return attacks.filter(({ moves }) => moves.includes(checkSquare));
};

/**
 *
 * @param {string} square
 * @param {string} moveSquare
 * @param {PIECE_COLORS} color
 * @param {string} symbol
 * @param {string} checkSquare
 * @param {State} state
 * @returns {boolean}
 */
const getIsAbsolutePinned = (square, moveSquare, color, symbol, checkSquare, state) =>
	!!getAbsolutePinAttacks(
		square,
		moveSquare,
		color,
		symbol,
		checkSquare,
		state).length;

export default getIsAbsolutePinned;
