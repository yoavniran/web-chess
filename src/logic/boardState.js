import produce from "immer";
import {
	BLACK_INIT_PIECES,
	WHITE_INIT_PIECES,
	EMPTY,
	PIECE_COLORS,
	TURN_PIECE,
	INIT_CASTLES,
	BLACK_KING,
	WHITE_KING,
} from "consts";
import getCheckType from "./helpers/getCheckType";
import findPieceTypeSquares from "./helpers/findPieceTypeSquares";
import {
	getCastlesAfterMove, getColorPiecePositions,
	getEnpassantAfterMove,
	getFiftyMoveRuleCount,
} from "./moves/calculators/afterMove";
import getSquaresAfterMove from "./helpers/getSquaresAfterMove";
import getOppositeColor from "./helpers/getOppositeColor";

const getTakesForColor = (color, initPieces, state) => {
	return Object.entries(initPieces)
		.map(([symbol, count]) => {
			const piecePositions = findPieceTypeSquares(state, symbol);

			return piecePositions.length < count ?
				new Array(count - piecePositions.length)
					.fill({ symbol, color }) : [];
		}).flat();
};

const getTakeInfo = (state, targetSquare, move) => {
	const targetInfo = state.squares[targetSquare];

	return !targetInfo.isEmpty ?
		{
			square: targetSquare,
			symbol: targetInfo.symbol,
			pieceColor: targetInfo.pieceColor,
			move,
		} :
		null;
};

const getTakes = (data) =>
	getTakesForColor(PIECE_COLORS.WHITE, WHITE_INIT_PIECES, data)
		.concat(getTakesForColor(PIECE_COLORS.BLACK, BLACK_INIT_PIECES, data));

const getCacheKey = (startSquare, color, directions, count, options) =>
	`${startSquare}_${color}_${directions}_${count}_${JSON.stringify(options)}`;

const producer = produce((draft, { data } = {}) => {
	return {
		...draft,
		...data,
	};
});

/**
 * @returns {State}
 */
const getBoardStateForNextMove = (state, startSquare, targetSquare) => {
	const takeInfo = getTakeInfo(state, targetSquare, state.move),
		movingSymbol = state.squares[startSquare].symbol,
		movingColor = state.squares[startSquare].pieceColor;

	const newSquares = getSquaresAfterMove(state.squares, startSquare, targetSquare, movingSymbol, movingColor, takeInfo);

	const newWhitePositions = movingColor === PIECE_COLORS.WHITE ?
		getColorPiecePositions(movingColor, newSquares) : state.whitePositions;

	const newBlackPositions = movingColor === PIECE_COLORS.BLACK ?
		getColorPiecePositions(movingColor, newSquares) : state.blackPositions;

	return getStateBoardFromData({
		squares: newSquares,
		whitePositions: newWhitePositions,
		blackPositions: newBlackPositions,
		move: movingColor === PIECE_COLORS.BLACK ? state.move + 1 : state.move,
		turn: getOppositeColor(movingColor),
		castles: getCastlesAfterMove(state, movingSymbol, movingColor, startSquare),
		enpassant: getEnpassantAfterMove(state, movingSymbol, movingColor, startSquare, targetSquare),
		halfmoveClock: getFiftyMoveRuleCount(state.halfmoveClock, movingSymbol, !!takeInfo),
		takes: takeInfo ? state.takes.concat(takeInfo) : state.takes,
	});
};

const getStateBoardFromData = (data, calculateChecks = true) => {
	let state = null;
	let calculationsCache = {};

	const updateState = (next, calculateChecks) => {
		//enrich with methods
		state = producer(state, {
			data: {
				...next,
				updateWithNextMove: (startSquare, targetSquare) =>
					getBoardStateForNextMove(state, startSquare, targetSquare),
				getCachedCalculation,
				cacheCalculation,
				clone,
				getCacheSize,
			},
		});

		if (calculateChecks) {
			//enrich with checks
			state = producer(state, {
				data: {
					whiteCheck: getCheckType(WHITE_KING, state),
					blackCheck: getCheckType(BLACK_KING, state),
				},
			});
		}
	};

	const getCachedCalculation = (...params) => {
		return calculationsCache[getCacheKey(...params)];
	};

	const cacheCalculation = (moves, ...params) => {
		calculationsCache[getCacheKey(...params)] = moves;
	};

	const getCacheSize = () => Object.keys(calculationsCache).length;

	const clone = (overrides = {}) => {
		return getStateBoardFromData({
			...state,
			...overrides,
		}, false);
	};

	updateState({
			...data,
			takes: data.takes ?? getTakes(data),
			castles: data.castles ?? INIT_CASTLES,
			halfmoveClock: data.halfmoveClock ?? 0,
			move: data.move ?? 0,
			turn: data.turn,
			enpassant: data.enpassant && data.enpassant !== EMPTY ? `${data.enpassant[0].toUpperCase()}${data.enpassant[1]}` : false,
		},
		calculateChecks,
	);

	return state;
};

/**
 *
 * @param {object} data
 * @returns {State}
 */
const createBoardState = (data) =>
	getStateBoardFromData(data);

export default createBoardState;
