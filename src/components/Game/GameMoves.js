import React, { useCallback } from "react";
import { useMovesSelector, useHistoryPositionLastPlySelector } from "./state";
import MoveHistoryList from "../Moves/MoveList";
import CompactMoveHistoryList from "../Moves/CompactMoveList";
import { useGameApi } from "./GameProvider";

const GameMoves = ({
	                     className,
	                     useAlgebraicNotation = true,
	                     showWithEmojis = true,
	                     showCompact = false,
	                     isTraversable = true,
                     }) => {
	const { goToPly } = useGameApi();

	const moves = useMovesSelector(false);
	const lastHistoryPly = useHistoryPositionLastPlySelector();
	const List = showCompact ? CompactMoveHistoryList : MoveHistoryList;

	console.log("GAME MOVES!!!!!!!!!", moves);

	const onPlyClick = useCallback((plyIndex) => {
		goToPly(...plyIndex);
	}, [goToPly]);

	return (<List
		className={className}
		moves={moves}
		showWithEmojis={showWithEmojis}
		onPlyClick={isTraversable ? onPlyClick : undefined}
		lastHistoryPly={lastHistoryPly}
	/>);
};

export default GameMoves;
