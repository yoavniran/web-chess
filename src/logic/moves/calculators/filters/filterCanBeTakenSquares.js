import { PIECE_COLORS } from "consts";
import getAttackingPiecesOnSquare from "logic/helpers/getAttackingPiecesOnSquare";

const getCanBeTakenOnSquare = (startSquare, targetSquare, opponentPieces, state) =>
	!!getAttackingPiecesOnSquare(
		targetSquare,
		opponentPieces,
		[startSquare],
		state)
		.length;

const filterCanBeTakenSquares = (pieceColor, startSquare, moveSquares, state) => {
	const opponentPieces = pieceColor === PIECE_COLORS.WHITE ? state.blackPositions : state.whitePositions;

	return moveSquares.filter((targetSquare) =>
		!getCanBeTakenOnSquare(startSquare, targetSquare, opponentPieces, state));
};

export default filterCanBeTakenSquares;
