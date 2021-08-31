import { BLACK_KING, PIECE_COLORS, WHITE_KING } from "../consts";
import {
	getCastlesAfterMove,
	getEnpassantAfterMove,
	getColorPiecePositions,
	getFiftyMoveRuleCount,
} from "./moves/calculators/afterMove";
import getSquaresAfterMove from "./helpers/getSquaresAfterMove";
import getCheckType from "./helpers/getCheckType";

const getTakeInfo = (state, startSquare, targetSquare, move) => {
	const targetInfo = state.squares[targetSquare];
	return !targetInfo.isEmpty ?
		{
			square: targetSquare,
			symbol: targetInfo.symbol,
			color: targetInfo.pieceColor,
			move,
		} :
		null;
};

const applyMoveToState = (state, startSquare, targetSquare) => {
	const { squares, whitePositions, blackPositions } = state;
	const movingSymbol = squares[startSquare].symbol,
		movingColor = squares[startSquare].pieceColor;

	const takeInfo = getTakeInfo(state, startSquare, targetSquare, state.move);
	const newSquares = getSquaresAfterMove(squares, startSquare, targetSquare, movingSymbol, movingColor, takeInfo);
	const newWhitePositions = movingColor === PIECE_COLORS.WHITE ?
			getColorPiecePositions(movingColor, newSquares) : whitePositions;
	const newBlackPositions =movingColor === PIECE_COLORS.BLACK ?
		getColorPiecePositions(movingColor, newSquares) : blackPositions;

	return {
		...state,
		squares: newSquares,
		whitePositions: newWhitePositions,
		blackPositions: newBlackPositions,
		//move is counted after WHITE & BLACK PLAYED (2 Ply)
		move: movingColor === PIECE_COLORS.BLACK ? state.move + 1 : state.move,
		turn: movingColor === PIECE_COLORS.WHITE ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE,
		castles: getCastlesAfterMove(state, movingSymbol, movingColor, startSquare),
		enpassant: getEnpassantAfterMove(state, movingSymbol, movingColor, startSquare, targetSquare),
		halfmoveClock: getFiftyMoveRuleCount(state.halfMoveClock, movingSymbol, !!takeInfo),
		takes: !!takeInfo ? state.takes.concat(takeInfo) : state.takes,
		whiteCheck: getCheckType(WHITE_KING, { newSquares, whitePositions, blackPositions }),
		blackCheck: getCheckType(BLACK_KING, { newSquares, whitePositions, blackPositions }),
	};
};

export default applyMoveToState;