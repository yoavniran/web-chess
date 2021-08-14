import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import getSquareName from "../getSquareName";

const getAllowedDirections = (directions) => {
	return Object.values(MOVE_DIRECTIONS)
		.map((dir) => ({
			direction: dir,
			isAllowed: !!(directions & dir),
		}))
		.filter(({ isAllowed }) => isAllowed);
};

const DIRECTION_PARAMS = {
	[MOVE_DIRECTIONS.FORWARD]: (squareCoordinate, forwardModifier, backwardModifier, count) => {
		return [
			//starter
			() => squareCoordinate[1] + forwardModifier,
			//advancer
			(i) => i + forwardModifier,
			//calculator
			(i) => getSquareName(i, squareCoordinate[0])
		]
	},

	[MOVE_DIRECTIONS.BACKWARD]: (squareCoordinate, forwardModifier, backwardModifier, count) => {
		return [
			//starter
			() => squareCoordinate[1] + backwardModifier,
			//advancer
			(i) => i + backwardModifier,
			//calculator
			(i) => getSquareName(i, squareCoordinate[0])
		]
	},
};

const getDirectionParams = (direction, squareCoordinate, forwardModifier, backwardModifier, count) => {
	return DIRECTION_PARAMS[direction](squareCoordinate, forwardModifier, backwardModifier, count)
};

const getSquaresForParams = ([starter, advancer, calculator], count) => {
	let i = starter();
	let j = 0;
	const squares = [];

	while (i >= 0 && i < 8 && j < count) {
		squares.push(calculator(i));
		i = advancer(i);
		j++;
	}

	return squares;
};

const calculateSquaresForMove = (startSquare, color, directions, count) => {
	const forwardModifier = color === PIECE_COLORS.WHITE ? 1 : -1,
		backwardModifier = color === PIECE_COLORS.WHITE ? -1 : 1,
		//COL | ROW
		squareCoordinate = [startSquare[0].toLowerCase().charCodeAt() - 97, parseInt(startSquare[1]) - 1];

	const allowedDirections = getAllowedDirections(directions);

	console.log("calculateSquaresForMove !!!!! ", {
		startSquare, color, directions, count,
		forwardModifier,
		backwardModifier,
		squareCoordinate,
		allowedDirections,
	});

	const squares = allowedDirections.map(({ direction }) => {
		const params = getDirectionParams(direction, squareCoordinate, forwardModifier, backwardModifier, count);
		return getSquaresForParams(params, count);
	}).flat();


	return squares;
};

export default calculateSquaresForMove;
