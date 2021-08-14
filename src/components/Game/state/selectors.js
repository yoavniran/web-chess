import { selector } from "recoil";
import { GameCurrentPosition, GameStartingPosition } from "./atoms";

const selectGameCurrentPosition = selector({
	key: "selectGameCurrentPosition",
	get: ({ get }) => get(GameCurrentPosition) || get(GameStartingPosition),
});

export {
	selectGameCurrentPosition
}
