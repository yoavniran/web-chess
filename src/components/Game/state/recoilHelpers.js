import { useCallback } from "react";
import {
	atom,
	isRecoilValue,
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
	useRecoilTransaction_UNSTABLE as useRecoilTransaction,
} from "recoil";

export const createTransactionHookSetter = (setter) => {
	return () => useRecoilTransaction((actions) =>
		(...args) => {
			setter(actions, ...args);
		});
};

export const createStateHookSetter = (key, setter) => {
	const stateSelector = selector({
		key,
		get: ({ get }) => null,
		set: ({ set, get /*, reset */ }, value) => {
			console.log(`>>>>>>>> STATE HOOK ${key} - setter called `, { value });
			setter(set, value, get);
		},
	});

	return () => useRecoilState(stateSelector)[1];
};

export const createSelectorHook = (key, getter) => {
	const hookSelector = selector({
		key,
		get: ({ get }) => isRecoilValue(getter) ?
			//get atom directly
			get(getter) :
			//execute getter callback
			getter(get),
	});

	const useHook = () => useRecoilValue(hookSelector);
	useHook.selector = hookSelector;

	return useHook;
};

export const createSimpleSetterHook = (atom, customSetter = undefined) => {
	return () => {
		const recoilSetter = useSetRecoilState(atom);

		return useCallback((value) => {
			recoilSetter(customSetter ?
				(current) => customSetter(current, value) : value);
		}, [recoilSetter]);
	};
};

// export const getKeys = (keys) =>
// 	keys.reduce((res, key) => {
// 		res[key] = key;
// 		return res;
// 	}, {});

export const createAtoms = (list) =>
	Object.entries(list)
		.reduce((res, [name, defaults]) => {
			res.keys[name] = name;
			res.atoms[name] = atom({ key: name, default: defaults });
			return res;
		}, { keys: {}, atoms: {} });
