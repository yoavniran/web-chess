import { selector, useRecoilValue } from "recoil";
import {
	GameCurrentPosition,
	GameStartingPosition,
	GameBoardSettings,
} from "./atoms";

const createSelectorHook = (key, getter) => {
	const hookSelector = selector({
		key,
		get: ({ get }) => getter(get),
	});

	return () => useRecoilValue(hookSelector);
}

const useBoardPiecesSelector = createSelectorHook(
	"BoardPiecesSelector",
	(get) => {
		const currentPosition = get(GameCurrentPosition) || get(GameStartingPosition);
		return currentPosition?.piecesSquares;
	},
);

const useIsFlippedSelector = createSelectorHook(
	"IsFlippedSelector",
	(get) => {
		return get(GameBoardSettings).isFlipped;
	},
);

export {
	useBoardPiecesSelector,
	useIsFlippedSelector,
};
