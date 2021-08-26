import { PIECE_COLORS } from "../consts";
import {
	getCastlesAfterMove,
	getEnpassantAfterMove,
	getColorPositionAfterMove,
	getFiftyMoveRuleCount,
} from "./moves/calculators/afterMove";

const getSquaresAfterMove = (squares, startSquare, targetSquare, symbol, color) => {
	return {
		...squares,
		[startSquare]: {
			...squares[startSquare],
			isEmpty: true,
			symbol: false,
			pieceColor: null,
		},
		[targetSquare]: {
			...squares[targetSquare],
			isEmpty: false,
			symbol,
			pieceColor: color,
		},
	};
};

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

	return {
		...state,
		squares:
			getSquaresAfterMove(squares, startSquare, targetSquare, movingSymbol, movingColor),
		whitePositions: movingColor === PIECE_COLORS.WHITE ?
			getColorPositionAfterMove(whitePositions, startSquare, targetSquare, movingSymbol) : whitePositions,
		blackPositions: movingColor === PIECE_COLORS.BLACK ?
			getColorPositionAfterMove(blackPositions, startSquare, targetSquare, movingSymbol) : blackPositions,
		//move is counted after WHITE & BLACK PLAYED (2 Ply)
		move: movingColor === PIECE_COLORS.BLACK ? state.move + 1 : state.move,
		turn: movingColor === PIECE_COLORS.WHITE ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE,
		castles: getCastlesAfterMove(state, movingSymbol, movingColor, startSquare),
		enpassant: getEnpassantAfterMove(state, movingSymbol, movingColor, startSquare, targetSquare),
		halfmoveClock: getFiftyMoveRuleCount(state.halfMoveClock, movingSymbol, !!takeInfo),
		takes: !!takeInfo ? state.takes.concat(takeInfo) : state.takes,
	};
};

export default applyMoveToState;
