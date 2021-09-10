import produce from "immer";
import {
	BLACK_INIT_PIECES,
	WHITE_INIT_PIECES,
	EMPTY,
	PIECE_COLORS,
	INIT_CASTLES,
	BLACK_KING,
	WHITE_KING,
	CASTLE_SIDES,
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
import getDisambiguateTypeRequired from "./helpers/getDisambiguateTypeRequired";
import { isKing } from "./helpers/is";

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

const getCastleType = (fromSquare, toSquare, symbol) => {
	if (isKing(symbol)) {

	}

	return false;
};

/**
 *
 * @param {string} fromSquare
 * @param {string} toSquare
 * @param {string} symbol
 * @param {PIECE_COLORS} color
 * @param {Object.<string, PieceSquare>} prevSquares - the squares info before the move
 * @param {State} state
 * @returns {History}
 */
const getUpdatedHistory = (fromSquare, toSquare, symbol, color, prevSquares, state) => {
	const targetInfo = prevSquares[toSquare];
	const isNewMove = color === PIECE_COLORS.WHITE;

	const ply = {
		previous: fromSquare,
		target: toSquare,
		color,
		symbol,
		move: state.move - (isNewMove ? 0 : 1),
		disambiguationNeeded: getDisambiguateTypeRequired(fromSquare, toSquare, symbol, color, state),
		castle: getCastleType(fromSquare, toSquare, symbol),
		take: targetInfo.isEmpty ? null : {
			symbol: targetInfo.symbol,
			color: targetInfo.pieceColor,
		},
		check: color === PIECE_COLORS.WHITE ? state.blackCheck : state.whiteCheck,
	};

	const history = state.history || [];
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

const createTakesData = (state) =>
	!state.takes ? {
		takes: getTakesForColor(PIECE_COLORS.WHITE, WHITE_INIT_PIECES, state)
			.concat(getTakesForColor(PIECE_COLORS.BLACK, BLACK_INIT_PIECES, state)),
	} : null;

const getCacheKey = (startSquare, color, directions, count, options) =>
	`${startSquare}_${color}_${directions}_${count}_${JSON.stringify(options)}`;

const createChecksData = (state) => ({
	whiteCheck: getCheckType(WHITE_KING, state),
	blackCheck: getCheckType(BLACK_KING, state),
});

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
		movingColor = state.squares[startSquare].pieceColor,
		prevSquares = state.squares;

	const newSquares = getSquaresAfterMove(prevSquares, startSquare, targetSquare, movingSymbol, movingColor);

	const createHistoryData = (state) => {
		const history = getUpdatedHistory(startSquare, targetSquare, movingSymbol, movingColor, prevSquares, state);

		return {
			history,
			halfmoveClock: getFiftyMoveRuleCount(state.halfmoveClock, movingSymbol, getIsLastPlyTake(history)),
			takes: getUpdatedTakes(state.takes, history),
		};
	};

	return getStateBoardFromData({
			...state,
			squares: newSquares,
			whitePositions: getColorPiecePositions(PIECE_COLORS.WHITE, newSquares),
			blackPositions: getColorPiecePositions(PIECE_COLORS.BLACK, newSquares),
			move: movingColor === PIECE_COLORS.BLACK ? state.move + 1 : state.move,
			turn: getOppositeColor(movingColor),
			castles: getCastlesAfterMove(state, movingSymbol, movingColor, startSquare),
			enpassant: getEnpassantAfterMove(state, movingSymbol, movingColor, startSquare, targetSquare),
		},
		createChecksData,
		createHistoryData,
	);
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
			castles: data.castles ?? INIT_CASTLES,
			halfmoveClock: data.halfmoveClock ?? 0,
			move: data.move ?? 0,
			// turn: data.turn,
			enpassant: data.enpassant && data.enpassant !== EMPTY ? `${data.enpassant[0].toUpperCase()}${data.enpassant[1]}` : false,
			history: data.history ?? [],
			updateWithNextMove: (startSquare, targetSquare) =>
				getBoardStateForNextMove(state, startSquare, targetSquare),
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
