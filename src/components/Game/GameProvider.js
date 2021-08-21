import React, { createContext, useEffect, useMemo } from "react";
import { RecoilRoot } from "recoil";
import { usePreviousValue } from "beautiful-react-hooks";
import { INITIAL_FEN } from "consts";
import createGameApi from "./gameApi";
import {
	useGameStartingPositionSetter,
	useToggleGameBoardIsFlipped,
} from "./state";

const GameContext = createContext(null);

const useGameApi = ({ position }) => {
	const setStartingPosition = useGameStartingPositionSetter();
	const toggleIsFlipped = useToggleGameBoardIsFlipped();

	useEffect(() => {
		console.log("useGameApi HOOK rendered with position = ", position);
		setStartingPosition(position);
	}, [setStartingPosition, position]);

	const gameApi = useMemo(() => createGameApi({
		// position,

		toggleIsFlipped,
		setStartingPosition,
	}), [toggleIsFlipped, setStartingPosition]);

	window.__wcGameApi = gameApi;

	return gameApi;
};

const ProviderWithState = ({
	                           children,
	                           position = INITIAL_FEN,
	                           showHistory = true,
	                           highlightMoves = true,
	                           highlightChecks = true,

	                           // time = false,
	                           // bonus = false,
                           }) => {
	const prevPosition = usePreviousValue(position);

	useEffect(() => {
		if (prevPosition && position !== prevPosition) {
			throw new Error("Initial game position prop cannot be changed!");
		}
	}, [position, prevPosition]);

	const gameApi = useGameApi({
		position,
	});

	return (<GameContext.Provider value={gameApi}>
		{children}
	</GameContext.Provider>);
};

const GameProvider = (props) => {

	return (<RecoilRoot>
		<ProviderWithState {...props} />
	</RecoilRoot>);
};

export default GameProvider;

export {
	GameContext,
};
