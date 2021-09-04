import { PIECE_COLORS } from "consts";
import getOppositeColor from "logic/helpers/getOppositeColor";
import calculatePieceAllMoveSquares from "../calculatePieceAllMoveSquares";
import getDirectionParamsForMoveCalc from "../../../helpers/getDirectionParamsForMoveCalc";

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

const getSquareBeyondTake = (startSquare, takeSquare, state) => {
	const {
		direction,
		diagonalVector,
		sidewaysVector,
	} = getDirectionParamsForMoveCalc(startSquare, takeSquare);

	const moves = calculatePieceAllMoveSquares(
		takeSquare,
		PIECE_COLORS.WHITE,
		direction,
		1,
		state,
		{ diagonalVector, sidewaysVector });

	return moves[0];
};

/**
 * filter out squares that cannot be reached because they are after a possible take
 * @param {string} startSquare
 * @param {PIECE_COLORS} pieceColor
 * @param {string[]} moveSquares
 * @param {State} state
 * @param {{expectedTake: string[] | undefined, considerEmpty: string[] | undefined }} options
 */
const filterBeyondTakeSquares = (startSquare, pieceColor, moveSquares, state, options = {}) => {
	const possibleTakes = findTakes(startSquare, pieceColor, moveSquares, state, options);

	const removeSquares = possibleTakes.map((pt) =>
		getSquareBeyondTake(startSquare, pt, state),
	)
		.filter(Boolean);

	return moveSquares.filter((ms) => !~removeSquares.indexOf(ms));
};

export default filterBeyondTakeSquares;
