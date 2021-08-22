import { PIECE_COLORS } from "consts";
import calculateMovesFromSquare from "../calculateMovesFromSquare";

const getCanBeTakenOnSquare = (targetSquare, opponentPieces, state) => {
	return !!Object.entries(opponentPieces)
		.find(([square, symbol]) => {
			const moveSquares = calculateMovesFromSquare(
				square, symbol, state, { ignoreTurn: true, expectedTake: [targetSquare], expectedOccupied: [targetSquare] });

			return !!~moveSquares.indexOf(targetSquare);
		});
};

const filterCanBeTakenSquares = (startSquare, pieceColor, moveSquares, state) => {
	const opponentPieces = pieceColor === PIECE_COLORS.WHITE ? state.blackPositions : state.whitePositions;

	return moveSquares.filter((targetSquare) =>
		!getCanBeTakenOnSquare(targetSquare, opponentPieces, state));
};

export default filterCanBeTakenSquares;
