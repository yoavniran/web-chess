import { selectorFamily } from "recoil";
import atoms from "./atoms";

const { GameCurrentPosition, GameStartingPosition, GameHistoryPosition } = atoms;

const selectGameCurrentPosition = selectorFamily({
	key: "selectGameCurrentPosition",
	get: (withHistory = true) => ({ get }) =>
		(withHistory && get(GameHistoryPosition)) ||
		get(GameCurrentPosition) ||
		get(GameStartingPosition),
});

export {
	selectGameCurrentPosition,
};
