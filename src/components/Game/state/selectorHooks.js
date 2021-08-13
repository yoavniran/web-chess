import { selector, useRecoilValue } from "recoil";
import {
	GameCurrentPosition,
	GameStartingPosition,
	GameBoardSettings,
	SelectedPiece,
} from "./atoms";

const createSelectorHook = (key, getter) => {
	const hookSelector = selector({
		key,
		get: ({ get }) => getter(get),
	});

	const hook = () => useRecoilValue(hookSelector);
	hook.selector = hookSelector;

	return hook;
};

const selectGameCurrentPosition = selector({
	key: "selectGameCurrentPosition",
	get: ({ get }) => get(GameCurrentPosition) || get(GameStartingPosition),
});

const useBoardPiecesSelector = createSelectorHook(
	"BoardPiecesSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition); // get(GameCurrentPosition) || get(GameStartingPosition);
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
	(get) => get(SelectedPiece),
);

export {
	useBoardPiecesSelector,
	useIsFlippedSelector,
	useMoveCounterSelector,
	useTurnSelector,
	useSelectedPieceSquareSelector,
};
