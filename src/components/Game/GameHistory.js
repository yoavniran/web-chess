import React from "react";
import { useMovesSelector } from "./state";
import MoveHistoryList from "../History/MoveHistoryList";

const GameHistory = ({
	                     useAlgebraicNotation = true,
	                     showWithEmojis = true,
                     }) => {

	const moves = useMovesSelector();

	console.log("RENDERING GAME HISTORY WITH MOVES = ", moves);

	return (<MoveHistoryList moves={moves} />);
};

export default GameHistory;
