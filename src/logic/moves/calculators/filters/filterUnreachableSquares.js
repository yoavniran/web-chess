import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import { addArrayToSet } from "utils";
import getSquareCoordinates from "../../../helpers/getSquareCoordinates";
import getDistance from "../../../helpers/getDistance";
import getAllMoveSquares from "../getAllMoveSquares";
import getMoveDirection from "../../getMoveDirection";
import getMoveDiagonalVector from "../../getMoveDiagonalVector";

/**
 * filter out squares that cannot be reached because a square in the path was removed (by another filter)
 * @param {string} startSquare
 * @param {string[]} moveSquares
 * @returns {string[]}
 */
const filterUnreachableSquares = (startSquare, moveSquares) => {
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

		const possibleMovesForDirection = getAllMoveSquares(
			startSquare,
			PIECE_COLORS.WHITE,
			direction,
			getDistance(startCoordinates, moveCoordinates),
			{ diagonalVector } );

		let removeStartIndex = 0;

		if (possibleMovesForDirection.every((s) => !!~moveSquares.indexOf(s))) {
			//add squares to allowed (only new ones)
			addArrayToSet(possibleMovesForDirection, allowedSquares);
		} else {
			//remove the squares that cannot be reached
			removeStartIndex = possibleMovesForDirection.findIndex((ps) => !~moveSquares.indexOf(ps));
		}

		let removeSquares = possibleMovesForDirection.slice(removeStartIndex);
		//remove squares we already scanned
		remainingSquares = remainingSquares.filter((s) => !~removeSquares.indexOf(s));
	}

	return [...allowedSquares.values()];
};

export default filterUnreachableSquares;
