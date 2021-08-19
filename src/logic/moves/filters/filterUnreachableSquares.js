import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import getSquareCoordinates from "../getSquareCoordinates";
import getDistance from "../getDistance";
import getMoveDirection from "./getMoveDirection";
import calculateSquaresForMove from "./calculateSquaresForMove";
import getMoveDiagonalVector from "./getMoveDiagonalVector";

/**
 * filter out squares that cannot be reached because a square in the path was removed (by another filter)
 * @param {string} startSquare
 * @param {string[]} moveSquares
 * @returns {string[]}
 */
const filterUnreachableSquares = (startSquare, moveSquares) => {
	const startCoordinates = getSquareCoordinates(startSquare);

	let remainingSquares = moveSquares.slice();
	let allowedSquares =  [];

	while (remainingSquares.length) {
		const square = remainingSquares.shift();
		const moveCoordinates = getSquareCoordinates(square);
		const direction = getMoveDirection(startCoordinates, moveCoordinates);
		const moveDistance = getDistance(startCoordinates, moveCoordinates);
		const diagonalVector = direction === MOVE_DIRECTIONS.DIAGONAL ?
			getMoveDiagonalVector(startCoordinates, moveCoordinates) : undefined;

		console.log("!!!!!!!FInding possible moves - ", {
			square  ,
			moveCoordinates,
			direction,
			moveDistance,
			remainingSquares,
			diagonalVector
		});

		const possibleMovesForDirection = calculateSquaresForMove(
			startSquare,
			PIECE_COLORS.WHITE,
			direction,
			moveDistance,
			{ diagonalVector } );

		console.log("!!!!!!! possibleMovesForDirection for square: " + square, {moveDistance, possibleMovesForDirection});

		if (possibleMovesForDirection.every((s) => !!~moveSquares.indexOf(s))) {
			//add squares to allowed (only new ones)
			const newAllowed = possibleMovesForDirection.filter((ps) => !~allowedSquares.indexOf(ps));
			allowedSquares = allowedSquares.concat(newAllowed);
		}

		//remove squares we already scanned
		remainingSquares = remainingSquares.filter((s) => !~possibleMovesForDirection.indexOf(s));
	}

	return allowedSquares;
};

export default filterUnreachableSquares;
