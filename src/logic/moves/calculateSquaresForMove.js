import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import getSquareName from "../getSquareName";

const KNIGHT_MODIFIERS = [[+2, -1], [+2, +1], [+1, +2], [-1, +2], [-2, +1], [-2, -1], [+1, -2], [-1, -2]];

const getIsValidCoordinates = ([col, row]) => row >= 0 && row < 8 && col >= 0 && col < 8;

const getAllowedDirections = (directions) => {
	return Object.values(MOVE_DIRECTIONS)
		.map((dir) => ({
			direction: dir,
			isAllowed: !!(directions & dir),
		}))
		.filter(({ isAllowed }) => isAllowed);
};

const createSimpleDirectionsParams = (modifier) => ({
	starter: (startCoordinates) => startCoordinates[1] + modifier,
	advancer: (val) => val + modifier,
	calculator: (val, startCoordinates) => getSquareName(val, startCoordinates[0]),
});

const createSidewaysParams = (modifier) => ({
	...createSimpleDirectionsParams(modifier),
	starter: (startCoordinates) => startCoordinates[0] + modifier,
	calculator: (val, startCoordinates) => getSquareName(startCoordinates[1], val),
});

const createDiagonalParams = (rowMod, colMod) => ({
	starter: (squareCoordinate) => [squareCoordinate[0] + colMod, squareCoordinate[1] + rowMod],
	advancer: ([col, row]) => [col + colMod, row + rowMod],
	calculator: ([col, row]) => getSquareName(row, col),
	checker: getIsValidCoordinates,
});

const DIRECTION_PARAMS = {
	[MOVE_DIRECTIONS.FORWARD]: (color) =>
		[createSimpleDirectionsParams(color === PIECE_COLORS.WHITE ? 1 : -1)],

	[MOVE_DIRECTIONS.BACKWARD]: (color) =>
		[createSimpleDirectionsParams(color === PIECE_COLORS.WHITE ? -1 : 1)],

	[MOVE_DIRECTIONS.SIDEWAYS]: () => [
		//move toward col H
		createSidewaysParams(1),
		//move toward col A
		createSidewaysParams(-1),
	],

	[MOVE_DIRECTIONS.DIAGONAL]: () => [
		//NE
		createDiagonalParams(1, 1),
		//NW
		createDiagonalParams(1, -1),
		//SE
		createDiagonalParams(-1, 1),
		//SW
		createDiagonalParams(-1, -1),
	],

	[MOVE_DIRECTIONS.KNIGHT]: () => [{
		starter: () => 0,
		advancer: (val) => val + 1,
		calculator: (i, startCoordinates) => {
			const modifiers = KNIGHT_MODIFIERS[i],
				col = startCoordinates[0] + modifiers[0],
				row = startCoordinates  [1] + modifiers[1];
			return getIsValidCoordinates([col, row]) ? getSquareName(row, col) : undefined;
		},
		countOverride: 8,
	}],
};

const getDirectionParams = (direction, color) => DIRECTION_PARAMS[direction](color);

const getSquaresFromParams = (params, startCoordinates, count) => {
	const defaultChecker = (val) => val >= 0 && val < 8;
	const { starter, advancer, calculator, checker = defaultChecker, countOverride } = params;
	const squares = [];
	let i = starter(startCoordinates);
	let j = 0;

	while (checker(i) && j < (countOverride || count)) {
		const result = calculator(i, startCoordinates);

		if (result) {
			squares.push(result);
		}

		i = advancer(i);
		j++;
	}

	return squares;
};

const calculateSquaresForMove = (startSquare, color, directions, count) => {
	const startCoordinates = [startSquare[0].toLowerCase().charCodeAt() - 97, parseInt(startSquare[1]) - 1];
	const allowedDirections = getAllowedDirections(directions);

	const squares = allowedDirections.map(({ direction }) => {
		const paramsSets = getDirectionParams(direction, color);

		return paramsSets
			.map((params) => getSquaresFromParams(params, startCoordinates, count))
			.flat();
	}).flat();

	console.log("calculateSquaresForMove !!!!! ", {
		startSquare, color, directions, count,
		startCoordinates,
		allowedDirections,
		squares,
	});

	return squares;
};

export default calculateSquaresForMove;
