import React from "react";
import Board from "../Board";
import {
	useBoardPiecesSelector,
	useIsFlippedSelector,
} from "./state";

/**
 * Board connected to Game Context
 */
const GameBoard = ({}) => {
	const piecesSquares = useBoardPiecesSelector();
	const isFlipped = useIsFlippedSelector();

	return (<Board
		isFlipped={isFlipped}
		pieces={piecesSquares}
	/>);
};

export default GameBoard;
