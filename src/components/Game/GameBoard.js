import React from "react";
import Board from "../Board";
import {
	useAllowedMovesSquaresSelector,
	useBoardPiecesSelector,
	useIsFlippedSelector,
	useSelectedPieceSetter,
	useSelectedPieceSquareSelector,
	useUnselectPieceSetter,
} from "./state";

/**
 * Board connected to Game Context
 */
const GameBoard = ({ className }) => {
	const piecesSquares = useBoardPiecesSelector(),
		isFlipped = useIsFlippedSelector(),
		selectedPieceSquare = useSelectedPieceSquareSelector(),
		setSelectedPiece = useSelectedPieceSetter(),
		unselectPiece = useUnselectPieceSetter(),
		allowedMovesSquares = useAllowedMovesSquaresSelector();

	return (<Board
		className={className}
		isFlipped={isFlipped}
		pieces={piecesSquares}
		selectedPieceSquare={selectedPieceSquare}
		onPieceSelected={setSelectedPiece}
		onPieceUnselected={unselectPiece}
		allowedMoveSquares={allowedMovesSquares}
	/>);
};

export default GameBoard;
