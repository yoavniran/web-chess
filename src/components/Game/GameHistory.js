import React from "react";
import { useMovesSelector } from "./state";
import MoveHistoryList from "../History/MoveHistoryList";

const GameHistory = ({
	                     className,
	                     useAlgebraicNotation = true,
	                     showWithEmojis = true,
	                     showCompact = false,
                     }) => {

	const moves = useMovesSelector();

	return (<MoveHistoryList
		className={className}
		moves={moves}
		showWithEmojis={showWithEmojis}
	/>);
};

export default GameHistory;
