import getMoveDirection from "../moves/getMoveDirection";
import { MOVE_DIRECTIONS } from "../../consts";
import getMoveSidewaysVector from "../moves/getMoveSidewaysVector";
import getMoveDiagonalVector from "../moves/getMoveDiagonalVector";
import getSquareCoordinates from "./getSquareCoordinates";

const getDirectionParamsForMoveCalc = (startSquare, takeSquare) => {
	const startCoordinates = getSquareCoordinates(startSquare),
		takeCoordinates = getSquareCoordinates(takeSquare),
		direction = getMoveDirection(startCoordinates, takeCoordinates),
		sidewaysVector = direction === MOVE_DIRECTIONS.SIDEWAYS ?
			getMoveSidewaysVector(startCoordinates, takeCoordinates) : undefined,
		diagonalVector = direction === MOVE_DIRECTIONS.DIAGONAL ?
			getMoveDiagonalVector(startCoordinates, takeCoordinates) : undefined;

	return {
		direction,
		sidewaysVector,
		diagonalVector,
	};
};

export default getDirectionParamsForMoveCalc;
