import { useSetRecoilState } from "recoil";
import {
	GameBoardSettings,
} from "./atoms";
import { useCallback } from "react";

const createSimpleSetterHook = (atom, customSetter = undefined) => {
	return () => {
		const recoilSetter = useSetRecoilState(atom);

		return useCallback((value) => {
			recoilSetter(customSetter ?
				(current) => customSetter(current, value) : value);
		}, [recoilSetter]);
	};
};

const useToggleGameBoardIsFlipped =
	createSimpleSetterHook(GameBoardSettings,
		(current) => {
			return {
				...current,
				isFlipped: !current.isFlipped,
			};
		});

export {
	useToggleGameBoardIsFlipped,
};
