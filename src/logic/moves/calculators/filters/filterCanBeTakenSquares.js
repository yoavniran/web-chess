import { PIECE_COLORS } from "consts";
import getAttackingPiecesOnSquare from "logic/helpers/getAttackingPiecesOnSquare";

const getCanBeTakenOnSquare = (startSquare, targetSquare, color, opponentPieces, state) =>
	!!getAttackingPiecesOnSquare(
		targetSquare,
		color,
		[startSquare],
		state,
		{
			//1 attacker is enough, we dont need all of them
			bailOnFirst: true,
			//need to account for king's repelling force against another king
			ignoreTakesOnAttacker: true
		})
		.length;

const filterCanBeTakenSquares = (pieceColor, startSquare, moveSquares, state) => {
	const opponentPieces = pieceColor === PIECE_COLORS.WHITE ? state.blackPositions : state.whitePositions;

	return moveSquares.filter((targetSquare) =>
		!getCanBeTakenOnSquare(startSquare, targetSquare, pieceColor,opponentPieces, state));
};

export default filterCanBeTakenSquares;
