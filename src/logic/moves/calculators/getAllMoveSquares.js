import { MOVE_DIRECTIONS, PIECE_COLORS, DIAGONAL_VECTORS, SIDEWAYS_VECTORS } from "consts";
import getSquareName from "../../utils/getSquareName";
import getSquareCoordinates from "../../utils/getSquareCoordinates";
import sortSquaresByClosest from "../../sortSquaresByClosest";

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

const createSidewaysParams = (modifier, vector, options) => ({
	...createSimpleDirectionsParams(modifier),
	starter: (startCoordinates) => startCoordinates[0] + modifier,
	calculator: (val, startCoordinates) => getSquareName(startCoordinates[1], val),
	//allow calling code to request moves for only specified vectors
	countOverride: options?.sidewaysVector && !(options.sidewaysVector & vector) ? 0 : undefined,
});

const createDiagonalParams = (rowMod, colMod, vector, options) => ({
	_vector: vector,
	starter: (squareCoordinate) => [squareCoordinate[0] + colMod, squareCoordinate[1] + rowMod],
	advancer: ([col, row]) => [col + colMod, row + rowMod],
	calculator: ([col, row]) => getSquareName(row, col),
	checker: getIsValidCoordinates,
	//allow calling code to request moves for only specified vectors
	countOverride: options?.diagonalVector && !(options.diagonalVector & vector) ? 0 : undefined,
});

const DIRECTION_PARAMS = {
	[MOVE_DIRECTIONS.FORWARD]: (color) =>
		[createSimpleDirectionsParams(color === PIECE_COLORS.WHITE ? 1 : -1)],

	[MOVE_DIRECTIONS.BACKWARD]: (color) =>
		[createSimpleDirectionsParams(color === PIECE_COLORS.WHITE ? -1 : 1)],

	[MOVE_DIRECTIONS.SIDEWAYS]: (color, options) => [
		//move toward col H
		createSidewaysParams(1, SIDEWAYS_VECTORS.RIGHT, options),
		//move toward col A
		createSidewaysParams(-1, SIDEWAYS_VECTORS.LEFT, options),
	],

	[MOVE_DIRECTIONS.DIAGONAL]: (color, options) => [
		createDiagonalParams(1, 1, DIAGONAL_VECTORS.NE, options),
		createDiagonalParams(1, -1, DIAGONAL_VECTORS.NW, options),
		createDiagonalParams(-1, 1, DIAGONAL_VECTORS.SE, options),
		createDiagonalParams(-1, -1, DIAGONAL_VECTORS.SW, options),
	],

	[MOVE_DIRECTIONS.KNIGHT]: () => [{
		starter: () => 0,
		advancer: (val) => val + 1,
		calculator: (i, startCoordinates) => {
			const modifiers = KNIGHT_MODIFIERS[i],
				col = startCoordinates[0] + modifiers[0],
				row = startCoordinates[1] + modifiers[1];
			return getIsValidCoordinates([col, row]) ? getSquareName(row, col) : undefined;
		},
		countOverride: 8,
	}],
};

const getDirectionParams = (direction, color, options) => DIRECTION_PARAMS[direction](color, options);

const getSquaresFromParams = (params, startCoordinates, count) => {
	const defaultChecker = (val) => val >= 0 && val < 8;
	const { starter, advancer, calculator, checker = defaultChecker, countOverride } = params;
	const squares = [];
	let i = starter(startCoordinates);
	let j = 0;

	while (checker(i) && j < (countOverride ?? count)) {
		const result = calculator(i, startCoordinates);

		if (result) {
			squares.push(result);
		}

		i = advancer(i);
		j++;
	}

	return squares;
};

const getAllMoveSquares = (startSquare, color, directions, count, options = {}) => {
	const startCoordinates = getSquareCoordinates(startSquare);
	const allowedDirections = getAllowedDirections(directions);

	const squares = allowedDirections.map(({ direction }) => {
		const paramsSets = getDirectionParams(direction, color, options);

		return paramsSets
			.map((params) => getSquaresFromParams(params, startCoordinates, count))
			.flat();
	}).flat();

	//return squares sorted by closest to starting square
	return sortSquaresByClosest(startSquare, squares);
};

export default getAllMoveSquares;
