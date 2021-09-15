import isUndefined from "lodash/isUndefined";
import { PIECE_COLORS } from "consts";
import { getSquareData } from "../helpers/getSquaresAfterMove";
import { getColorPiecePositions } from "../moves/calculators/afterMove";
import getOppositeColor from "../helpers/getOppositeColor";

/**
 *
 * @param {Object.<string, PieceSquare>} squares
 * @param {Ply} ply
 */
const revertPlyOnSquares = (squares, ply) => {
	const prevSquare = squares[ply.previous];
	const targetSquare = squares[ply.target];

	return {
		...squares,
		[ply.previous]: getSquareData(ply.symbol, ply.color, prevSquare),
		[ply.target]: ply.take ?
			getSquareData(ply.take.symbol, ply.take.color, targetSquare) :
			getSquareData(false, null, targetSquare),
	};
};

/**
 *
 * @param {State} state
 * @param {number} toMove
 * @param {number} toTurn
 */
const getHistorySquares = (state, toMove, toTurn) => {
	const { history, squares } = state;
	let newSquares = { ...squares };

	if (toMove <= state.move) {
		let currentMove = state.move - (state.turn === PIECE_COLORS.WHITE ? 1 : 0);
		let historyIndex = history.length - 1;

		while (currentMove >= toMove && !!~historyIndex) {
			const [whitePly, blackPly] = history[historyIndex];
			const moreMoves = currentMove !== toMove;

			if (blackPly && (moreMoves || !toTurn)) {
				//revert black ply if we need to get to white's ply
				newSquares = revertPlyOnSquares(newSquares, blackPly);
			}

			if (moreMoves) {
				//revert white ply if we need to get to a previous move
				newSquares = revertPlyOnSquares(newSquares, whitePly);
			}

			currentMove -= 1;
			historyIndex -= 1;
		}
	}

	return newSquares;
};

const getFirstPlyMoveIndex = (history) => {
	const firstPly = history[0][0];
	return firstPly.color === PIECE_COLORS.BLACK ? firstPly.move : Math.max(firstPly.move - 1, 0);
};

const getMoveIndexAfterRewind = (state, lastMove, toTurn, isReset) =>
	isReset ? getFirstPlyMoveIndex(state.history) : lastMove[toTurn].move;

const getTurnAfterRewind = (state, lastMove, toTurn, isReset) =>
	isReset ? state.history[0][0].color : getOppositeColor(lastMove[toTurn].color);

const getHistoryDestination = (plyDestination) =>
	Array.isArray(plyDestination) ? plyDestination : [plyDestination, 0];

const getStateForPly = (state, ply, getStateBoardFromData) => {
	const [toMove, toTurn] = getHistoryDestination(ply);
	const isReset = !~toMove;
	const rewindMoveIndex = !isReset ?
		state.history.findIndex(([whitePly]) => whitePly.move === toMove) : 0;

	if (!isReset && (!~rewindMoveIndex || !state.history[rewindMoveIndex][toTurn])) {
		throw new Error(`WebChess - Cannot navigate to ply: [${ply.join(",")}] - it doesn't exist in history!`);
	}

	const newSquares = getHistorySquares(state, toMove, toTurn);

	//TODO! Deal with castle!!!
	//tODO! deal with promotion (rewind...) !!!

	const createUpdatedHistory = (state) => {
		const newHistory = rewindMoveIndex ? state.history.slice(0, rewindMoveIndex) : [];
		const lastMove = isReset ? null : state.history[rewindMoveIndex];

		if (lastMove) {
			newHistory.push([
				lastMove[0],
				toTurn ? lastMove[1] : undefined,
				//dont leave undefined ply because it takes up slot and cause issues with slice
			].filter(Boolean));
		}

		const newTakes = state.takes.filter((take) =>
			//take was taken based on FEN (not from game move)
			isUndefined(take.move) ||
			//if reset then filter all in game takes
			!isReset &&
			//filter out takes that happened after ply we're rewinding to
			(take.move <= toMove && (toTurn || take.color === PIECE_COLORS.BLACK)));

		return {
			history: newHistory,
			move: getMoveIndexAfterRewind(state, lastMove, toTurn, isReset),
			turn: getTurnAfterRewind(state, lastMove, toTurn, isReset),
			takes: newTakes,
			...lastMove?.[toTurn].boardData,
		};
	};

	return getStateBoardFromData({
			...state,
			squares: newSquares,
			whitePositions: getColorPiecePositions(PIECE_COLORS.WHITE, newSquares),
			blackPositions: getColorPiecePositions(PIECE_COLORS.BLACK, newSquares),
		},
		createUpdatedHistory,
	);
}

/**
 *
 * @param {State} state
 * @param {Array.<number> | number} ply
 * @param {Function} getStateBoardFromData
 * @returns {State}
 */
const transitionToHistory = (state, ply, getStateBoardFromData) => {

};

export default transitionToHistory;
