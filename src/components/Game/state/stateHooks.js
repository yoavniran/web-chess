import { selector, useRecoilState } from "recoil";
import isString from "lodash/isString";
import { translateFenToState } from "logic";
import {
	GameBoardSettings,
	GameMoves,
	GameCurrentPosition,
	GameStartingPosition,
} from "./atoms";

const getSetter = (atom, setter) => ({ set }, value) => {
	setter ? setter({ set }, value) : set(atom, value);
};

const createSimpleStateHook = (key, atom, customSetter = undefined) => {
	const setter = getSetter(atom, customSetter);

	const simpleStateSelector = selector({
		key,
		get: ({ get }) => get(atom),
		set: ({ set }, value) => {
			console.log(`>>>>>>>> SIMPLE STATE HOOK ${key} - setter called `, { value });
			setter({ set }, value);
		},
	});

	return () => useRecoilState(simpleStateSelector);
};

const useGameCurrentPosition =
	createSimpleStateHook("selectGameCurrentPosition", GameCurrentPosition);

const useGameStartingPosition =
	createSimpleStateHook("selectGameStartingPosition", GameStartingPosition,
		({ set }, value) => {
			const newPosition = isString(value) ?
				translateFenToState(value) :
				value;

			set(GameStartingPosition, newPosition);
		});

export {
	useGameCurrentPosition,
	useGameStartingPosition,
};
