import { atom } from "recoil";

// const translateStateToFen = (state) => {
//
// };
//
// const translateStateToPgn = (state) => {
//
// };
//
// const translatePgnToState = (pgn) => {
//
// };

const GameStartingPositionFen = atom({
	key: "GameStartingPositionFen",
	default: "",
});

const GameStartingPosition = atom({
	key: "GameStartingPosition",
	default: [],
});

/**
 * {
 *   squares: Object.<string, PieceSquare>,
 *   whitePositions: Object.<string, string>,
 *   blackPositions: Object.<string, string>,
 *   castles: string,
 *   halfmoveClock: number,
 *   move: number,
 *   turn: PIECE_COLOR,
 *   enpass: boolean | string
 * }
 */
const GameCurrentPosition = atom({
	key: "GameCurrentPosition",
	default: null,
});

/**
 * @typedef GameMove
 * @property {number} index
 * @property {Ply[]} plys
 */

const GameMoves = atom({
	key: "GameMoves",
	/**
	 * @type GameMove[]
	 */
	default: [],
});

const GameBoardSettings = atom({
	key: "GameBoardSettings",
	default: {
		isFlipped: false,
	}
});

// {string} square
const SelectedPieceData = atom({
	key: "SelectedPieceData",
	default: null,
});

const SelectedPieceAvailableMoves = atom({
	key: "SelectedPieceAvailableMoves",
	default: [],
});

export {
	GameStartingPosition,
	GameCurrentPosition,
	GameMoves,
	GameBoardSettings,
	GameStartingPositionFen,
	SelectedPieceData,
	SelectedPieceAvailableMoves,
};

// const GameState = atom({
// 	key: "game",
// 	default: {
// 		//String (Fen)
// 		startingPosition: "",
// 		//String (Fen)
// 		currentPosition: "",
// 		//Ply[]
// 		moves: [],
// 	},
// });
