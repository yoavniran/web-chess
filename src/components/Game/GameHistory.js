import React, { useCallback } from "react";
import { useMovesSelector, useLatestPlySelector } from "./state";
import MoveHistoryList from "../History/MoveHistoryList";
import CompactMoveHistoryList from "../History/CompactMoveHistoryList";
import { useGameApi } from "./GameProvider";

const GameHistory = ({
	                     className,
	                     useAlgebraicNotation = true,
	                     showWithEmojis = true,
	                     showCompact = false,
	                     isTraversable = true,
                     }) => {
	const moves = useMovesSelector();
	// const latestPly = useLatestPlySelector();
	const { goToPly } = useGameApi();
	const HistoryList = showCompact ? CompactMoveHistoryList : MoveHistoryList;

	const onPlyClick = useCallback((plyIndex) => {
		goToPly(...plyIndex);
	}, [goToPly]);

	return (<HistoryList
		className={className}
		moves={moves}
		showWithEmojis={showWithEmojis}
		onPlyClick={isTraversable ? onPlyClick : undefined}
	/>);
};

export default GameHistory;
