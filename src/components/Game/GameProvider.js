import React, { createContext, useContext, useEffect, useMemo } from "react";
import {
	RecoilRoot,
	// useRecoilSnapshot,
	useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver,
} from "recoil";
import { usePreviousValue } from "beautiful-react-hooks";
import { INITIAL_FEN } from "consts";
import createGameApi from "./gameApi";
import {
	useGameStartingPositionSetter,
	useToggleGameBoardIsFlipped,
	useRewindForwardSetter,
 atoms } from "./state";

const { GameCurrentPosition, GameMoves } = atoms;

const GameContext = createContext(null);

const useGameApiInitializer = ({ position }) => {
	const setStartingPosition = useGameStartingPositionSetter(),
		toggleFlipped = useToggleGameBoardIsFlipped(),
		rewindForward = useRewindForwardSetter();

	useEffect(() => {
		setStartingPosition(position);
	}, [setStartingPosition, position]);

	const gameApi = useMemo(() => createGameApi({
		// position,

		toggleFlipped,
		setStartingPosition,
		rewindForward,
	}), [toggleFlipped, setStartingPosition, rewindForward]);

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

	const gameApi = useGameApiInitializer({
		position,
	});

	return (<GameContext.Provider value={gameApi}>
		{children}
	</GameContext.Provider>);
};

const useGameApi = () => {
	return useContext(GameContext);
};

const GameTracker = () => {
	useRecoilTransactionObserver(({ snapshot, previousSnapshot }) => {
		// eslint-disable-next-line no-console
		console.log("### TRANSACTION OBSERVER --- GAME STATUS", {
			position: snapshot.getLoadable(GameCurrentPosition).contents,
			moves: snapshot.getLoadable(GameMoves).contents,
		});
		// const currentSquares = snapshot.getLoadable(GameCurrentPosition).contents?.squares,
		// 	prevSquares = previousSnapshot.getLoadable(GameCurrentPosition).contents?.squares;
		//
		// console.log("TRANSACTION !", currentSquares === prevSquares);
	});

	// const snapshot = useRecoilSnapshot();
	//
	// const loadable = snapshot.getLoadable(GameCurrentPosition);
	// 		console.log("CURRENT GAME POSITION STATE = ", {
	// 			status: loadable.state,
	// 			content: loadable.contents
	// 		});

	return null;
};

const GameProvider = (props) => {
	return (<RecoilRoot>
		<ProviderWithState {...props} />
		<GameTracker/>
	</RecoilRoot>);
};

export default GameProvider;

export {
	GameContext,
	useGameApi
};
