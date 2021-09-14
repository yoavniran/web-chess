import produce from "immer";
import {
	BLACK_INIT_PIECES,
	WHITE_INIT_PIECES,
	EMPTY,
	PIECE_COLORS,
	INIT_CASTLES,
} from "consts";
import findPieceTypeSquares from "../helpers/findPieceTypeSquares";
import transitionToNextMove from "./transitionToNextMove";
import createChecksData from "./createChecksData";
import transitionToHistory from "./transitionToHistory";
import { getColorPiecePositions } from "../moves/calculators/afterMove";

const getTakesForColor = (color, initPieces, state) => {
	return Object.entries(initPieces)
		.map(([symbol, count]) => {
			const piecePositions = findPieceTypeSquares(state, symbol);

			return piecePositions.length < count ?
				new Array(count - piecePositions.length)
					.fill({ symbol, color }) : [];
		}).flat();
};

const createTakesData = (state) =>
	!state.takes ? {
		takes: getTakesForColor(PIECE_COLORS.WHITE, WHITE_INIT_PIECES, state)
			.concat(getTakesForColor(PIECE_COLORS.BLACK, BLACK_INIT_PIECES, state)),
	} : null;

const getCacheKey = (startSquare, color, directions, count, options) =>
	`${startSquare}_${color}_${directions}_${count}_${JSON.stringify(options)}`;

const producer = produce((draft, { data } = {}) => {
	return {
		...draft,
		...data,
	};
});

//TODO: implement !
const getEmptySquares = () => {
	throw new Error("IMP!");
};

const getInitSquaresAndPieces = (data) => {
	const squares = data.squares ?? getEmptySquares();

	return {
		squares,
		whitePositions: data.whitePositions ?? getColorPiecePositions(PIECE_COLORS.WHITE, squares),
		blackPositions: data.blackPositions ?? getColorPiecePositions(PIECE_COLORS.BLACK, squares),
	};
};

const getStateBoardFromData = (data, ...dataCreators) => {
	let calculationsCache = {};

	const getCachedCalculation = (...params) =>
		calculationsCache[getCacheKey(...params)];

	const cacheCalculation = (moves, ...params) => {
		calculationsCache[getCacheKey(...params)] = moves;
	};

	const getCacheSize = () => Object.keys(calculationsCache).length;

	const clone = (overrides = {}) => {
		return getStateBoardFromData({
			...state,
			...overrides,
		});
	};

	let state = producer(null, {
		data: {
			...data,
			...getInitSquaresAndPieces(data),
			castles: data.castles ?? INIT_CASTLES,
			halfmoveClock: data.halfmoveClock ?? 0,
			enpassant: data.enpassant && data.enpassant !== EMPTY ? `${data.enpassant[0].toUpperCase()}${data.enpassant[1]}` : false,
			move: data.move ?? 0,
			turn: data.turn ?? PIECE_COLORS.WHITE,
			history: data.history ?? [],
			updateWithNextMove: (startSquare, targetSquare) =>
				transitionToNextMove(state, startSquare, targetSquare, getStateBoardFromData),
			navigate: (ply) =>
				transitionToHistory(state, ply, getStateBoardFromData),
			getCachedCalculation,
			cacheCalculation,
			clone,
			getCacheSize,
		},
	});

	//enrich with custom updaters
	dataCreators.forEach((fn) => {
		const data = fn(state);
		if (data) {
			state = producer(state, { data });
		}
	});

	return state;
};

/**
 *
 * @param {object} data
 * @returns {State}
 */
const createBoardState = (data) =>
	getStateBoardFromData(
		data,
		createChecksData,
		createTakesData,
	);

export default createBoardState;
