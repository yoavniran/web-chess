import React from "react";
import { useMovesSelector } from "./state";
import MoveHistoryList from "../History/MoveHistoryList";
import CompactMoveHistoryList from "../History/CompactMoveHistoryList";

const GameHistory = ({
	                     className,
	                     useAlgebraicNotation = true,
	                     showWithEmojis = true,
	                     showCompact = false,
                     }) => {

	const moves = useMovesSelector();

	return (showCompact ?
		<CompactMoveHistoryList
			className={className}
			moves={moves}
			showWithEmojis={showWithEmojis}
		/> :
		<MoveHistoryList
			className={className}
			moves={moves}
			showWithEmojis={showWithEmojis}
		/>);
};

export default GameHistory;
