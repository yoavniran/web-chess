import { PIECE_COLORS } from "consts";
import getAttackingPiecesOnSquare from "logic/helpers/getAttackingPiecesOnSquare";

const getCanBeTakenOnSquare = (targetSquare, startSquare, opponentPieces, state) =>
	!!getAttackingPiecesOnSquare(
		startSquare,
		targetSquare,
		opponentPieces,
		state)
		.length;

const filterCanBeTakenSquares = (pieceColor, startSquare, moveSquares, state) => {
	const opponentPieces = pieceColor === PIECE_COLORS.WHITE ? state.blackPositions : state.whitePositions;

	return moveSquares.filter((targetSquare) =>
		!getCanBeTakenOnSquare(targetSquare, startSquare,opponentPieces, state));
};

export default filterCanBeTakenSquares;
