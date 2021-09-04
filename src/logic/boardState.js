import produce from "immer";
import {
	BLACK_INIT_PIECES,
	WHITE_INIT_PIECES,
	EMPTY,
	PIECE_COLORS,
	TURN_PIECE,
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

const getTakesForColor = (color, initPieces, state) => {
	return Object.entries(initPieces)
		.map(([symbol, count]) => {
			const piecePositions = findPieceTypeSquares(state, symbol);

			return piecePositions.length < count ?
				new Array(count - piecePositions.length)
					.fill({ symbol, color }) : [];
		}).flat();
};

const getTakeInfo = (state, startSquare, targetSquare, move) => {
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

const getTakes = (positions) =>
	getTakesForColor(PIECE_COLORS.WHITE, WHITE_INIT_PIECES, positions)
		.concat(getTakesForColor(PIECE_COLORS.BLACK, BLACK_INIT_PIECES, positions));

const updateState = produce((draft, payload) => {
	const next = { ...draft, ...payload };

	return {
		...next,
		whiteCheck: getCheckType(WHITE_KING, next),
		blackCheck: getCheckType(BLACK_KING, next),
	};
});

const getCacheKey = (startSquare, color, directions, count, options) =>
	`${startSquare}_${color}_${directions}_${count}_${JSON.stringify(options)}`;

/**
 *
 * @param squares
 * @param whitePositions
 * @param blackPositions
 * @param castles
 * @param halfmoveClock
 * @param enpassant
 * @param moveNumber
 * @param turn
 * @returns {State}
 */
const getBoardState = (squares, whitePositions, blackPositions, castles, halfmoveClock, enpassant, moveNumber, turn) => {
	let state;
	let calculationsCache = {};

	/**
	 * @returns {State}
	 */
	const updateWithNextMove = (startSquare, targetSquare) => {
		//reset cache on update
		calculationsCache = {};

		const takeInfo = getTakeInfo(state, startSquare, targetSquare, state.move),
		 movingSymbol = state.squares[startSquare].symbol,
			movingColor = squares[startSquare].pieceColor;

		console.log("TAKE INFO - ", {
			startSquare, targetSquare, takeInfo
		});

		const newSquares = getSquaresAfterMove(squares, startSquare, targetSquare, movingSymbol, movingColor, takeInfo);

		const newWhitePositions = movingColor === PIECE_COLORS.WHITE ?
			 		getColorPiecePositions(movingColor, newSquares) : whitePositions;

		const newBlackPositions = movingColor === PIECE_COLORS.BLACK ?
					getColorPiecePositions(movingColor, newSquares) : blackPositions;

		state = updateState(state, {
			squares: newSquares,
			whitePositions: newWhitePositions,
			blackPositions: newBlackPositions,
			move: movingColor === PIECE_COLORS.BLACK ? state.move + 1 : state.move,
			turn: movingColor === PIECE_COLORS.WHITE ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE,
			castles: getCastlesAfterMove(state, movingSymbol, movingColor, startSquare),
			enpassant: getEnpassantAfterMove(state, movingSymbol, movingColor, startSquare, targetSquare),
			halfmoveClock: getFiftyMoveRuleCount(state.halfMoveClock, movingSymbol, !!takeInfo),
			takes: takeInfo ? state.takes.concat(takeInfo) : state.takes,
		});

		return state;
	};

	const getCachedCalculation = (...params) => {
		return calculationsCache[getCacheKey(...params)];
	};

	const cacheCalculation = (moves, ...params) => {
		calculationsCache[getCacheKey(...params)] = moves;
	};

	state = updateState({
		squares,
		whitePositions,
		blackPositions,
		takes: getTakes({ whitePositions, blackPositions }),
		castles,
		halfmoveClock,
		move: moveNumber - 1,
		turn: TURN_PIECE[turn],
		enpassant: enpassant !== EMPTY ? `${enpassant[0].toUpperCase()}${enpassant[1]}` : false,

		updateWithNextMove,
		getCachedCalculation,
		cacheCalculation,
	});

	return state;
};

export default getBoardState;
