import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import { addArrayToSet } from "utils";
import getSquareCoordinates from "logic/helpers/getSquareCoordinates";
import getDistance from "logic/helpers/getDistance";
import calculatePieceAllMoveSquares from "../calculatePieceAllMoveSquares";
import getMoveDirection from "../../getMoveDirection";
import getMoveDiagonalVector from "../../getMoveDiagonalVector";
import getMoveSidewaysVector from "../../getMoveSidewaysVector";

/**
 * filter out squares that cannot be reached because a square in the path was removed (by another filter)
 * @param {string} startSquare
 * @param {string[]} moveSquares
 * @returns {string[]}
 */
const filterUnreachableSquares = (startSquare, moveSquares, state) => {
	const allowedSquares = new Set();
	const startCoordinates = getSquareCoordinates(startSquare);

	//reverse the squares so we deal with the farthest first (reduces iterations)
	let remainingSquares = moveSquares.slice().reverse();

	while (remainingSquares.length) {
		const square = remainingSquares.shift();
		const moveCoordinates = getSquareCoordinates(square);
		const direction = getMoveDirection(startCoordinates, moveCoordinates);

		if (direction === MOVE_DIRECTIONS.KNIGHT) {
			//Knight doesnt have "unreachable" squares
			addArrayToSet(moveSquares, allowedSquares);
			break;
		}

		const diagonalVector = direction === MOVE_DIRECTIONS.DIAGONAL ?
			getMoveDiagonalVector(startCoordinates, moveCoordinates) : undefined;

		const sidewaysVector = direction === MOVE_DIRECTIONS.SIDEWAYS ?
			getMoveSidewaysVector(startCoordinates, moveCoordinates) : undefined;

		const possibleMovesForDirection = calculatePieceAllMoveSquares(
			startSquare,
			PIECE_COLORS.WHITE,
			direction,
			getDistance(startCoordinates, moveCoordinates),
			state,
			{ diagonalVector, sidewaysVector } );

		let removeStartIndex = 0;

		if (possibleMovesForDirection.every((s) => !!~moveSquares.indexOf(s))) {
			//add squares to allowed (only new ones)
			addArrayToSet(possibleMovesForDirection, allowedSquares);
		} else {
			//remove the squares that cannot be reached
			removeStartIndex = possibleMovesForDirection.findIndex((ps) => !moveSquares.includes(ps));
		}

		let removeSquares = possibleMovesForDirection.slice(removeStartIndex);
		//remove squares we already scanned
		remainingSquares = remainingSquares.filter((s) => !~removeSquares.indexOf(s));
	}

	return [...allowedSquares.values()];
};

export default filterUnreachableSquares;
