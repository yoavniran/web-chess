import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import getMoveDirection from "../../getMoveDirection";
import getSquareCoordinates from "../../../utils/getSquareCoordinates";
import getAllMoveSquares from "../getAllMoveSquares";
import getMoveDiagonalVector from "../../getMoveDiagonalVector";
import getMoveSidewaysVector from "../../getMoveSidewaysVector";

const findTakes = (startSquare, pieceColor, moveSquares, state) => {
	const takeColor = pieceColor === PIECE_COLORS.WHITE ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE;

	return moveSquares.filter((ms) => {
		const squareState = state.piecesSquares[ms];
		return (squareState && !squareState.isEmpty && squareState.pieceColor === takeColor);
	});
};

const getSquareBeyondTake = (startSquare, takeSquare, pieceColor) => {
	const startCoordinates = getSquareCoordinates(startSquare),
		takeCoordinates = getSquareCoordinates(takeSquare),
		direction = getMoveDirection(startCoordinates, takeCoordinates),
		sidewaysVector = direction === MOVE_DIRECTIONS.SIDEWAYS ?
			getMoveSidewaysVector(startCoordinates, takeCoordinates) : undefined,
		diagonalVector = direction === MOVE_DIRECTIONS.DIAGONAL ?
			getMoveDiagonalVector(startCoordinates, takeCoordinates) : undefined;

	const moves = getAllMoveSquares(
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
 */
const filterBeyondTakeSquares = (startSquare, pieceColor, moveSquares, state) => {
	const possibleTakes = findTakes(startSquare, pieceColor, moveSquares, state);

	const removeSquares = possibleTakes.map((pt) =>
		getSquareBeyondTake(startSquare, pt, pieceColor),
	)
		.filter(Boolean);

	return moveSquares.filter((ms) => !~removeSquares.indexOf(ms));
};

export default filterBeyondTakeSquares;
