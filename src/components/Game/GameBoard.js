import React from "react";
import Board from "../Board";
import {
	useAllowedMovesSquaresSelector,
	useBoardSquaresSelector,
	useIsFlippedSelector,
	useSelectedPieceSetter,
	useSelectedPieceSquareSelector,
	useUnselectPieceSetter,
} from "./state";

/**
 * Board connected to Game Context
 */
const GameBoard = ({ className }) => {
	const squares = useBoardSquaresSelector(),
		isFlipped = useIsFlippedSelector(),
		selectedPieceSquare = useSelectedPieceSquareSelector(),
		setSelectedPiece = useSelectedPieceSetter(),
		unselectPiece = useUnselectPieceSetter(),
		allowedMovesSquares = useAllowedMovesSquaresSelector();

	return (<Board
		className={className}
		isFlipped={isFlipped}
		squares={squares}
		selectedPieceSquare={selectedPieceSquare}
		onPieceSelected={setSelectedPiece}
		onPieceUnselected={unselectPiece}
		allowedMoveSquares={allowedMovesSquares}
	/>);
};

export default GameBoard;
