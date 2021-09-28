import { PIECE_COLORS } from "consts";
import {
	getCastlesAfterMove,
	getColorPiecePositions,
	getEnpassantAfterMove,
	getFiftyMoveRuleCount,
} from "../moves/calculators/afterMove";
import getSquaresAfterMove from "../helpers/getSquaresAfterMove";
import getOppositeColor from "../helpers/getOppositeColor";
import createChecksData from "./createChecksData";
import getDisambiguateTypeRequired from "../helpers/getDisambiguateTypeRequired";

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

/**
 *
 * @param {string} fromSquare
 * @param {Move} move
 * @param {string} symbol
 * @param {PIECE_COLORS} color
 * @param {Object.<string, PieceSquare>} prevSquares - the squares info before the move
 * @param {number} halfmoveClock
 * @param {State} state
 * @returns {History}
 */
const getUpdatedHistory = (fromSquare, move, symbol, color, prevSquares, halfmoveClock, state) => {
	const targetInfo = prevSquares[move.square];
	const isNewMove = color === PIECE_COLORS.WHITE;

	const ply = {
		previous: fromSquare,
		target: move.square,
		moveType: move.type,
		color,
		symbol,
		//move counter may have already incremented if last move was white's
		move: state.move - (isNewMove ? 0 : 1),
		disambiguationNeeded: getDisambiguateTypeRequired(fromSquare, move.square, symbol, color, state),
		// castle: getCastleType(fromSquare, move.square, symbol),
		take: targetInfo.isEmpty ? null : {
			symbol: targetInfo.symbol,
			color: targetInfo.pieceColor,
		},
		check: color === PIECE_COLORS.WHITE ? state.blackCheck : state.whiteCheck,
		boardData: {
			//store (simple) data about the board so its easier to rewind history without needing to recalculate
			castles: state.castles,
			enpassant: state.enpassant,
			whiteCheck: state.whiteCheck,
			blackCheck: state.blackCheck,
			halfmoveClock,
		}
	};

	const history = state.history || [];
	const historyMove = isNewMove ? [] : (history[history.length - 1] || []);
	const newHistory = isNewMove ? history : history.slice(0, -1);

	if (color === PIECE_COLORS.BLACK && !historyMove.length) {
		//in case loaded FEN with first ply being black's
		historyMove.push(null);
	}

	return newHistory.concat([historyMove.concat([ply])]);
};

/**
 * @param {State} state
 * @param {string} startSquare
 * @param {Move} move
 * @param {Function} getStateBoardFromData
 * @returns {State}
 */
const transitionToNextMove = (state, startSquare, move, getStateBoardFromData) => {
	const movingSymbol = state.squares[startSquare].symbol,
		movingColor = state.squares[startSquare].pieceColor,
		prevSquares = state.squares,
		{ square: targetSquare } = move;

	if (state.turn !== movingColor) {
		throw new Error(`WebChess - Wrong color (${movingColor}) turn.`);
	}

	const newSquares = getSquaresAfterMove(prevSquares, startSquare, move, movingSymbol, movingColor);

	const createHistoryData = (state) => {
		const halfmoveClock = getFiftyMoveRuleCount(state.halfmoveClock, movingSymbol, !prevSquares[targetSquare].isEmpty);
		const history = getUpdatedHistory(startSquare, move, movingSymbol, movingColor, prevSquares, halfmoveClock, state);

		return {
			history,
			halfmoveClock,
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

export default transitionToNextMove;
