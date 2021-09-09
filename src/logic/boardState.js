import produce from "immer";
import {
	BLACK_INIT_PIECES,
	WHITE_INIT_PIECES,
	EMPTY,
	PIECE_COLORS,
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

const getLastPly = (history) => {
	const lastMove = history.slice(-1)[0];
	return lastMove.slice(-1)[0];
};

const getUpdatedTakes = (takes, history) => {
	const lastPly = getLastPly(history);

	return lastPly.take ? takes.concat({
		...lastPly.take,
		square: lastPly.target,
		move: lastPly.move,
	}) : takes;
};

const getUpdatedHistory = (fromSquare, toSquare, symbol, color, state) => {
	const targetInfo = state.squares[toSquare];
	const ply = {
		previous: fromSquare,
		target: toSquare,
		color,
		symbol,
		move: state.move,
		take: targetInfo.isEmpty ? null : {
			symbol: targetInfo.symbol,
			color: targetInfo.pieceColor,
		},
	};

	const history = state.history || [];
	const isNewMove = color === PIECE_COLORS.WHITE;
	const move = isNewMove ? [] : (history[history.length - 1] || []);
	const newHistory = isNewMove ? history : history.slice(0, -1);

	return newHistory.concat([move.concat([ply])]);
};

/**
 *
 * @param {History} history
 * @returns {boolean}
 */
const getIsLastPlyTake = (history) => {
	const lastPly = getLastPly(history);
	return !!lastPly.take;
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
	const movingSymbol = state.squares[startSquare].symbol,
		movingColor = state.squares[startSquare].pieceColor;

	const newSquares = getSquaresAfterMove(state.squares, startSquare, targetSquare, movingSymbol, movingColor);
	const history = getUpdatedHistory(startSquare, targetSquare, movingSymbol, movingColor, state);

	return getStateBoardFromData({
		squares: newSquares,
		whitePositions: getColorPiecePositions(PIECE_COLORS.WHITE, newSquares),
		blackPositions: getColorPiecePositions(PIECE_COLORS.BLACK, newSquares),
		move: movingColor === PIECE_COLORS.BLACK ? state.move + 1 : state.move,
		turn: getOppositeColor(movingColor),
		castles: getCastlesAfterMove(state, movingSymbol, movingColor, startSquare),
		enpassant: getEnpassantAfterMove(state, movingSymbol, movingColor, startSquare, targetSquare),
		halfmoveClock: getFiftyMoveRuleCount(state.halfmoveClock, movingSymbol, getIsLastPlyTake(history)),
		history,
		takes: getUpdatedTakes(state.takes, history),
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
			history: data.history ?? [],
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
