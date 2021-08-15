import { selector, useRecoilState, isRecoilValue } from "recoil";
import isString from "lodash/isString";
import { calculatePieceMoves, translateFenToState, translateStateToFen } from "logic";
import {
	GameMoves,
	GameCurrentPosition,
	GameStartingPosition,
	GameStartingPositionFen,
	SelectedPieceData,
	SelectedPieceAvailableMoves,
} from "./atoms";
import {  selectGameCurrentPosition } from  "./selectors";

// const getSetter = (atom, setter) => ({ set }, value) => {
// 	setter ? setter({ set }, value) : set(atom, value);
// };

const createStateHookSetter = (key, setter) => {
	// const isAtom = isRecoilValue(customSetterOrAtom);
	// const setter = getSetter(atom, customSetter);
	const stateSelector = selector({
		key,
		get: ({ get }) => null,
		set: ({ set, get }, value) => {
			console.log(`>>>>>>>> STATE HOOK ${key} - setter called `, { value });
			setter(set, value, get);
		},
	});

	return () => useRecoilState(stateSelector)[1];
};

const useGameStartingPositionSetter = createStateHookSetter(
	"GameStartingPositionState",
	(set, value) => {
			const isFen = isString(value),
				position = isFen ? translateFenToState(value) : value,
				fen = isFen ? value : translateStateToFen(value);

			set(GameStartingPosition, position);
			set(GameStartingPositionFen, fen);
			set(GameMoves, []);
	});

const useSelectedPieceSetter = createStateHookSetter(
"SelectedPieceState",
	(set, { square, symbol }, get) => {

		set(SelectedPieceData, square);
		const currentPosition = get(selectGameCurrentPosition);

		if (currentPosition) {
			set(SelectedPieceAvailableMoves, calculatePieceMoves(square, symbol, currentPosition))
		}
	}
);

// const useGameCurrentPosition =
// 	createSimpleStateHook(GameCurrentPosition);
// //"selectGameCurrentPosition",

// const useSetGameStartingPosition =
// 	createSimpleSetterHook( GameStartingPosition,
// 		(current, value) => {
// 			return isString(value) ?
// 				translateFenToState(value) :
// 				value;
// 		});

export {
	useGameStartingPositionSetter,
	useSelectedPieceSetter,
}