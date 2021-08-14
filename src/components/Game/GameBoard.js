import React from "react";
import Board from "../Board";
import {
	useBoardPiecesSelector,
	useIsFlippedSelector,
	useSelectedPieceSetter,
	useSelectedPieceSquareSelector,
} from "./state";

/**
 * Board connected to Game Context
 */
const GameBoard = ({ className }) => {
	const piecesSquares = useBoardPiecesSelector(),
		isFlipped = useIsFlippedSelector(),
		selectedPieceSquare = useSelectedPieceSquareSelector(),
		setSelectedPiece = useSelectedPieceSetter();

	return (<Board
		className={className}
		isFlipped={isFlipped}
		pieces={piecesSquares}
		selectedPieceSquare={selectedPieceSquare}
		onPieceSelected={setSelectedPiece}
	/>);
};

export default GameBoard;
