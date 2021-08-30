import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import getMoveDirection from "../../getMoveDirection";
import getSquareCoordinates from "logic/helpers/getSquareCoordinates";
import getOppositeColor from "logic/helpers/getOppositeColor";
import calculatePieceAllMoveSquares from "../calculatePieceAllMoveSquares";
import getMoveDiagonalVector from "../../getMoveDiagonalVector";
import getMoveSidewaysVector from "../../getMoveSidewaysVector";

const findTakes = (startSquare, pieceColor, moveSquares, state, options) => {
	const { expectedTake, considerEmpty } = options;
	const takeColor = getOppositeColor(pieceColor);

	return moveSquares.filter((ms) => {
		const squareState = state.squares[ms];

		return !considerEmpty?.includes(ms) &&
			((squareState && !squareState.isEmpty && squareState.pieceColor === takeColor) ||
			expectedTake?.includes(ms));
	});
};

const getSquareBeyondTake = (startSquare, takeSquare) => {
	const startCoordinates = getSquareCoordinates(startSquare),
		takeCoordinates = getSquareCoordinates(takeSquare),
		direction = getMoveDirection(startCoordinates, takeCoordinates),
		sidewaysVector = direction === MOVE_DIRECTIONS.SIDEWAYS ?
			getMoveSidewaysVector(startCoordinates, takeCoordinates) : undefined,
		diagonalVector = direction === MOVE_DIRECTIONS.DIAGONAL ?
			getMoveDiagonalVector(startCoordinates, takeCoordinates) : undefined;

	const moves = calculatePieceAllMoveSquares(
		takeSquare,
		PIECE_COLORS.WHITE,
		direction,
		1,
		{ diagonalVector, sidewaysVector });

	return moves[0];
};

/**
 * filter out squares that cannot be reached because they are after a possible take
 * @param startSquare
 * @param pieceColor
 * @param moveSquares
 * @param {State} state
 * @param {{expectedTake: string[] | undefined, considerEmpty: string[] | undefined }} options
 */
const filterBeyondTakeSquares = (startSquare, pieceColor, moveSquares, state, options = {}) => { //expectedTake = []) => {
	const possibleTakes = findTakes(startSquare, pieceColor, moveSquares, state, options);

	const removeSquares = possibleTakes.map((pt) =>
		getSquareBeyondTake(startSquare, pt),
	)
		.filter(Boolean);

	return moveSquares.filter((ms) => !~removeSquares.indexOf(ms));
};

export default filterBeyondTakeSquares;
