import { selector, useRecoilValue } from "recoil";
import {
	// GameCurrentPosition,
	// GameStartingPosition,
	GameBoardSettings,
	SelectedPieceData,
	SelectedPieceAvailableMoves,
} from "./atoms";
import { selectGameCurrentPosition } from "./selectors";

const createSelectorHook = (key, getter) => {
	const hookSelector = selector({
		key,
		get: ({ get }) => getter(get),
	});

	const useHook = () => useRecoilValue(hookSelector);
	useHook.selector = hookSelector;

	return useHook;
};

const useBoardPiecesSelector = createSelectorHook(
	"BoardPiecesSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition);
		return currentPosition?.piecesSquares;
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
	(get) => get(SelectedPieceData),
);

const useAllowedMovesSquaresSelector = createSelectorHook(
	"AllowedMovesSquaresSelector",
	(get) => get(SelectedPieceAvailableMoves),
);

export {
	useBoardPiecesSelector,
	useIsFlippedSelector,
	useMoveCounterSelector,
	useTurnSelector,
	useSelectedPieceSquareSelector,
	useAllowedMovesSquaresSelector,
};
