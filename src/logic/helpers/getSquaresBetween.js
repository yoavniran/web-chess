import getDirectionParamsForMoveCalc from "./getDirectionParamsForMoveCalc";
import getDistance from "./getDistance";
import calculatePieceAllMoveSquares from "../moves/calculators/calculatePieceAllMoveSquares";
import { PIECE_COLORS } from "../../consts";
import getSquareCoordinates from "./getSquareCoordinates";

const getSquaresBetween = (start, end, state, infinite = false) => {
	const distance = infinite ? Infinity :
		getDistance(getSquareCoordinates(start), getSquareCoordinates(end));

	const {
		direction,
		diagonalVector,
		sidewaysVector,
	} = getDirectionParamsForMoveCalc(start, end);

	return calculatePieceAllMoveSquares(
		start,
		PIECE_COLORS.WHITE,
		direction,
		distance - 1,
		state,
		{ diagonalVector, sidewaysVector });
};

export default getSquaresBetween;
