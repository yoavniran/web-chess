import React from "react";
import Board from "../Board";
import {
	useAllowedMovesSquaresSelector,
	useBoardSquaresSelector,
	useIsFlippedSelector, usePieceDestinationSetter,
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
		allowedMovesSquares = useAllowedMovesSquaresSelector(),
		setPieceDestinationSquare = usePieceDestinationSetter();

	return (<Board
		className={className}
		isFlipped={isFlipped}
		squares={squares}
		selectedPieceSquare={selectedPieceSquare}
		selectPiece={setSelectedPiece}
		unselectPiece={unselectPiece}
		allowedMoveSquares={allowedMovesSquares}
		movePiece={setPieceDestinationSquare}
	/>);
};

export default GameBoard;
