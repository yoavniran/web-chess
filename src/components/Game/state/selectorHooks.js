import { PIECE_COLORS } from "consts";
// import { selector, useRecoilValue, isRecoilValue } from "recoil";
import {
	// GameCurrentPosition,
	// GameStartingPosition,
	GameBoardSettings,
	SelectedPieceData,
	SelectedPieceAvailableMoves,
} from "./atoms";
import { createSelectorHook } from "./recoilHelpers";
import { selectGameCurrentPosition } from "./selectors";

// const createSelectorHook = (key, getter) => {
// 	const hookSelector = selector({
// 		key,
// 		get: ({ get }) => isRecoilValue(getter) ?
// 			//get atom directly
// 			get(getter) :
// 			//execute getter callback
// 			getter(get),
// 	});
//
// 	const useHook = () => useRecoilValue(hookSelector);
// 	useHook.selector = hookSelector;
//
// 	return useHook;
// };

const useBoardSquaresSelector = createSelectorHook(
	"BoardSquaresSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition);
		return currentPosition?.squares;
	},
);

const useIsFlippedSelector = createSelectorHook(
	"IsFlippedSelector",
	(get) => {
		return get(GameBoardSettings).isFlipped;
	},
);

const useMoveCounterSelector = createSelectorHook(
	"MoveCounterSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition);
		return currentPosition?.move;
	},
);

const useTurnSelector = createSelectorHook(
	"TurnSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition);
		return currentPosition?.turn;
	},
);

const useSelectedPieceSquareSelector = createSelectorHook(
	"SelectedPieceSquareSelector",
	SelectedPieceData,
);

const useAllowedMovesSquaresSelector = createSelectorHook(
	"AllowedMovesSquaresSelector",
	SelectedPieceAvailableMoves,
);

const useChecksSelector = createSelectorHook(
	"ChecksSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition);
		return {
			[PIECE_COLORS.WHITE]: currentPosition.whiteCheck,
			[PIECE_COLORS.BLACK]: currentPosition.blackCheck
		};
	},
);

const useMovesSelector = createSelectorHook(
	"MovesSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition);
		console.log("MOVE SELECTOR RUNNING FOR POSITION = ", currentPosition);

		return currentPosition.history.map(([whitePly, blackPly]) =>{
			return
		});
	});

export {
	useBoardSquaresSelector,
	useIsFlippedSelector,
	useMoveCounterSelector,
	useTurnSelector,
	useSelectedPieceSquareSelector,
	useAllowedMovesSquaresSelector,
	useChecksSelector,
	useMovesSelector,
};
