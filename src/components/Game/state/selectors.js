import { selector } from "recoil";
import atoms from "./atoms";

const { GameCurrentPosition, GameStartingPosition, GameHistoryPosition } = atoms;

//tODO: use selectorFamily to allow not getting history position when not needed !!!!!!!
const selectGameCurrentPosition = selector({
	key: "selectGameCurrentPosition",
	get: ({ get }) => get(GameHistoryPosition) || get(GameCurrentPosition) || get(GameStartingPosition),
});

export {
	selectGameCurrentPosition,
};
