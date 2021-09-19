import {
	CASTLE_SIDES,
	CHECK_TYPES,
	MOVE_TYPES,
	PIECE_COLORS,
} from "consts";
import { getCastleOptions } from "logic/helpers/castleHelpers";
import getAttackingPiecesOnSquare from "../../helpers/getAttackingPiecesOnSquare";
import getSquaresBetween from "../../helpers/getSquaresBetween";
import filterNonEmptySquares from "./filters/filterNonEmptySquares";

const getMovesForSide = (target, square, color, state) => {
	const moves = getSquaresBetween(square, target, state).concat(target);

	const isCastleAttacked = !!moves.find((square) =>
		getAttackingPiecesOnSquare(square, color, [], state,
			{ bailOnFirst: true, ignoreTakesOnAttacker: true }).length);

	const filtered = !isCastleAttacked ? filterNonEmptySquares(moves, state) : [];

	return filtered.length === moves.length ?
		[{ square: target, type: MOVE_TYPES.CASTLE }] : [];
};

const getCastleMoves = (square, symbol, state, pieceColor) => {
	const castleOptions = getCastleOptions(state.castles, pieceColor);

	const kingSideCastle = castleOptions[CASTLE_SIDES.KING] ?
		getMovesForSide(castleOptions[CASTLE_SIDES.KING], square, pieceColor, state) :
		[];

	const queenSideCastle = castleOptions[CASTLE_SIDES.QUEEN] ?
		getMovesForSide(castleOptions[CASTLE_SIDES.QUEEN], square, pieceColor, state) :
		[];

	return kingSideCastle.concat(queenSideCastle);
};

const castleCalculator = (square, symbol, state, pieceColor) => {
	const check = pieceColor === PIECE_COLORS.WHITE ? state.whiteCheck : state.blackCheck;

	return check === CHECK_TYPES.NONE ?
		getCastleMoves(square, symbol, state, pieceColor) : [];
};

export default castleCalculator;
