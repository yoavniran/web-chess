import React, { createContext, useEffect, useMemo } from "react";
import { RecoilRoot, useRecoilSnapshot, useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver } from "recoil";
import { usePreviousValue } from "beautiful-react-hooks";
import { INITIAL_FEN } from "consts";
import createGameApi from "./gameApi";
import {
	useGameStartingPositionSetter,
	useToggleGameBoardIsFlipped,
} from "./state";
import { GameCurrentPosition, GameMoves } from "./state/atoms";

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

const GameTracker = () => {
	// useRecoilCallback(({snapshot}) =>
	// 	() => {
	//
	// 	// const numItemsInCart = await snapshot.getPromise(itemsInCart);    console.log('Items in cart: ', numItemsInCart);
	// });
	useRecoilTransactionObserver(({snapshot, previousSnapshot}) => {
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
		<GameTracker />
	</RecoilRoot>);
};

export default GameProvider;

export {
	GameContext,
};
