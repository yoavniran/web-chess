import isString from "lodash/isString";
import { getMoveSquares, translateFenToState, translateStateToFen } from "logic";
import {
	createStateHookSetter,
	createSimpleSetterHook,
	createTransactionHookSetter,
} from "./recoilHelpers";
import {
	GameMoves,
	GameStartingPosition,
	GameCurrentPosition,
	GameStartingPositionFen,
	SelectedPieceData,
	SelectedPieceAvailableMoves, GameBoardSettings,
} from "./atoms";
import { selectGameCurrentPosition } from "./selectors";
import { useSelectedPieceSquareSelector } from "./selectorHooks";

const useGameStartingPositionSetter = createTransactionHookSetter(
	({ get, set }, value) => {
			const isFen = isString(value),
				position = isFen ? translateFenToState(value) : value,
				fen = isFen ? value : translateStateToFen(value);

			set(GameStartingPosition, position);
			set(GameCurrentPosition, position);
			set(GameStartingPositionFen, fen);
			set(GameMoves, []);
	}
);

//TODO !!!!!!!! cant use transaction hook because no support for selectors!
//
// const useSelectedPieceSetter = createTransactionHookSetter(
// 	(get, set, { square, symbol }) => {
// 		set(SelectedPieceData, square);
// 		const currentPosition = get(selectGameCurrentPosition);
//
// 		if (currentPosition) {
// 			set(SelectedPieceAvailableMoves,
// 				getMoveSquares(square, symbol, currentPosition));
// 		}
// 	},
// );

const useSelectedPieceSetter = createStateHookSetter(
	"SelectedPieceState",
	(set, { square, symbol }, get) => {

		set(SelectedPieceData, square);
		const currentPosition = get(selectGameCurrentPosition);

		if (currentPosition) {
			set(SelectedPieceAvailableMoves,
				getMoveSquares(square, symbol, currentPosition));
		}
	},
);

const unselectPiece = (set) => {
	set(SelectedPieceData, null);
	set(SelectedPieceAvailableMoves, []);
};

const useUnselectPieceSetter = createStateHookSetter(
	"UnselectPieceState",
	unselectPiece,
);

//TODO !!!!!!!! cant use transaction hook because no support for selectors!
const usePieceDestinationSetter = createStateHookSetter(
	"PieceDestinationState",
	(set, { square }, get) => {

		// const currentPosition = get(selectGameCurrentPosition);
		const pieceSquare = get(useSelectedPieceSquareSelector.selector);

		//TODO: update current position
		set(GameCurrentPosition, (state) =>
			state.updateWithNextMove(pieceSquare, square));

		unselectPiece(set);
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

const useToggleGameBoardIsFlipped =
	createSimpleSetterHook(GameBoardSettings,
		(current) => {
			return {
				...current,
				isFlipped: !current.isFlipped,
			};
		});

export {
	useGameStartingPositionSetter,
	useSelectedPieceSetter,
	useUnselectPieceSetter,
	usePieceDestinationSetter,
	useToggleGameBoardIsFlipped,
};
