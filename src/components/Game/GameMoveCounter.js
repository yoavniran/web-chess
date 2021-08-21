import React from "react";
import { MoveCounter } from "../Clock";
import { useMoveCounterSelector, useTurnSelector } from "./state";

const GameMoveCounter = (props ) => {
	const move = useMoveCounterSelector(),
		turn = useTurnSelector();

	return (<MoveCounter {...props} move={move + 1} turn={turn}/>);
};

export default GameMoveCounter;
