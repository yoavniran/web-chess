import { selector, useRecoilState } from "recoil";
import isString from "lodash/isString";
import { getMoves, translateFenToState, translateStateToFen, applyMoveToState } from "logic";
import {
	GameMoves,
	GameStartingPosition,
	GameCurrentPosition,
	GameStartingPositionFen,
	SelectedPieceData,
	SelectedPieceAvailableMoves,
} from "./atoms";
import { selectGameCurrentPosition } from "./selectors";
import { useSelectedPieceSquareSelector } from "./selectorHooks";

const createStateHookSetter = (key, setter) => {
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

const useGameStartingPositionSetter = createStateHookSetter(
	"GameStartingPositionState",
	(set, value) => {
		const isFen = isString(value),
			position = isFen ? translateFenToState(value) : value,
			fen = isFen ? value : translateStateToFen(value);

		set(GameStartingPosition, position);
		set(GameCurrentPosition, position);
		set(GameStartingPositionFen, fen);
		set(GameMoves, []);
	});

const useSelectedPieceSetter = createStateHookSetter(
	"SelectedPieceState",
	(set, { square, symbol }, get) => {

		set(SelectedPieceData, square);
		const currentPosition = get(selectGameCurrentPosition);

		if (currentPosition) {
			set(SelectedPieceAvailableMoves, getMoves(square, symbol, currentPosition));
		}
	},
);

const useUnselectPieceSetter = createStateHookSetter(
	"UnselectPieceState",
	(set) => {
		set(SelectedPieceData, null);
		set(SelectedPieceAvailableMoves, []);
	},
);

const usePieceDestinationSetter = createStateHookSetter(
	"PieceDestinationState",
	(set, { square }, get) => {
		const moves = get(GameMoves);
		// const currentPosition = get(selectGameCurrentPosition);
		const pieceSquare = get(useSelectedPieceSquareSelector.selector);

		//TODO: update current position
		console.log("MOVING PIECE !!!!!!!!!!");
		set(GameCurrentPosition, (state) =>
			applyMoveToState(state, pieceSquare,square))
		// set(GameMoves, moves.concat({
		//
		// }));
	},
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
	useUnselectPieceSetter,
	usePieceDestinationSetter,
};
