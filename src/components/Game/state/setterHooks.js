import isString from "lodash/isString";
import { getMoveSquares, translateFenToState, translateStateToFen } from "logic";
import {
	createStateHookSetter,
	createSimpleSetterHook,
	createTransactionHookSetter,
} from "./recoilHelpers";
import atoms from "./atoms";
import { selectGameCurrentPosition } from "./selectors";
import { useSelectedPieceSquareSelector } from "./selectorHooks";
import { PIECE_COLORS } from "../../../consts";

const {
	GameStartingPosition,
	GameCurrentPosition,
	GameHistoryPosition,
	GameStartingPositionFen,
	GameMoves,
	SelectedPieceData,
	SelectedPieceAvailableMoves,
	GameBoardSettings,
	CurrentPly,
} = atoms;

const useGameStartingPositionSetter = createTransactionHookSetter(
	({ get, set }, value) => {
			const isFen = isString(value),
				position = isFen ? translateFenToState(value) : value,
				fen = isFen ? value : translateStateToFen(value);

			set(GameStartingPosition, position);
			set(GameCurrentPosition, position);
			set(GameStartingPositionFen, fen);
			set(GameMoves, []);
			set(CurrentPly, [position.move, 0]);
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
		const currentPosition = get(selectGameCurrentPosition());

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

//TODO! cant use transaction hook because no support for selectors!
const usePieceDestinationSetter = createStateHookSetter(
	"PieceDestinationState",
	(set, { square }, get) => {
		const pieceSquare = get(useSelectedPieceSquareSelector.selector);

		const currentPosition = get(selectGameCurrentPosition())
		const nextPosition = currentPosition.updateWithNextMove(pieceSquare, square);

		set(GameCurrentPosition, nextPosition);
		set(CurrentPly, [nextPosition.move, (nextPosition.turn === PIECE_COLORS.WHITE ? 0 : 1)]);
		unselectPiece(set);
	},
);

//TODO! cant use transaction hook because no support for selectors!
const useRewindForwardSetter = createStateHookSetter(
	"RewindForwardState",
	(set, { ply }, get) => {
		const currentPosition = get(selectGameCurrentPosition(false));
		const historyPosition = currentPosition.navigate(ply);
		const isSame = historyPosition.move === currentPosition.move &&
			historyPosition.turn === currentPosition.turn;

		console.log("REWIND FORWARD !!!! IS SAME = ", isSame, {
			ply,
			historyPosition,
			currentPosition
		});

		set(GameHistoryPosition,
			!isSame ? historyPosition : null);
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
	useRewindForwardSetter,
};
