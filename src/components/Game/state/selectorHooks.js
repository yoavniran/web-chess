import { PIECE_COLORS } from "consts";
import { getPlyAlgebraicNotation } from "logic";
import atoms from "./atoms";
import { createSelectorFamilyHook, createSelectorHook } from "./recoilHelpers";
import { selectGameCurrentPosition } from "./selectors";

const {
	SelectedPieceData,
	SelectedPieceAvailableMoves,
	GameBoardSettings,
	CurrentPly,
	GameHistoryPosition,
} = atoms;

const useBoardSquaresSelector = createSelectorHook(
	"BoardSquaresSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition());
		return currentPosition?.squares;
	},
);

const useIsFlippedSelector = createSelectorHook(
	"IsFlippedSelector",
	(get) => {
		return get(GameBoardSettings).isFlipped;
	},
);

const useMoveCounterSelector = createSelectorHook(
	"MoveCounterSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition());
		return currentPosition?.move ?? 0;
	},
);

const useTurnSelector = createSelectorHook(
	"TurnSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition());
		return currentPosition?.turn;
	},
);

const useSelectedPieceSquareSelector = createSelectorHook(
	"SelectedPieceSquareSelector",
	SelectedPieceData,
);

const useAllowedMovesSquaresSelector = createSelectorHook(
	"AllowedMovesSquaresSelector",
	SelectedPieceAvailableMoves,
);

const useChecksSelector = createSelectorHook(
	"ChecksSelector",
	(get) => {
		const currentPosition = get(selectGameCurrentPosition());
		return currentPosition ? {
			[PIECE_COLORS.WHITE]: currentPosition.whiteCheck,
			[PIECE_COLORS.BLACK]: currentPosition.blackCheck,
		} : {};
	},
);

const useMovesSelector = createSelectorFamilyHook(
	"MovesSelectorFamily",
	(withHistory, get) => {
		const currentPosition = get(selectGameCurrentPosition(withHistory));

		return currentPosition?.history.map(([whitePly, blackPly]) => [
			whitePly.move,
			getPlyAlgebraicNotation(whitePly),
			blackPly ? getPlyAlgebraicNotation(blackPly) : undefined,
		]) ?? [];
	},
	true);

const useLatestPlySelector = createSelectorHook(
	"LatestPlySelector",
	(get) => get(CurrentPly),
);

const useHistoryPositionLastPlySelector = createSelectorHook(
	"HistoryPositionLastPlySelector",
	(get) => {
		const historyPosition = get(GameHistoryPosition);
		const lastMove = historyPosition?.history.slice(-1)[0];
		return lastMove ? [lastMove[0].move, lastMove.length > 1 ? 1 : 0] : null;
	});

export {
	useBoardSquaresSelector,
	useIsFlippedSelector,
	useMoveCounterSelector,
	useTurnSelector,
	useSelectedPieceSquareSelector,
	useAllowedMovesSquaresSelector,
	useChecksSelector,
	useMovesSelector,
	useLatestPlySelector,
	useHistoryPositionLastPlySelector,
};
