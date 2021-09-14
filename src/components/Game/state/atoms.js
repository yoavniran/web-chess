import { createAtoms } from "./recoilHelpers";

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
// const GameStartingPositionFen = atom({
// 	key: "GameStartingPositionFen",
// 	default: "",
// });
// const GameStartingPosition = atom({
// 	key: "GameStartingPosition",
// 	default: null,
// });
// const GameCurrentPosition = atom({
// 	key: "GameCurrentPosition",
// 	default: null,
// });
// const GameMoves = atom({
// 	key: "GameMoves",
// 	/**
// 	 * @type GameMove[]
// 	 */
// 	default: [],
// });
// const GameBoardSettings = atom({
// 	key: "GameBoardSettings",
// 	default: {
// 		isFlipped: false,
// 	}
// });
// {string} square
// const SelectedPieceData = atom({
// 	key: "SelectedPieceData",
// 	default: null,
// });
// const SelectedPieceAvailableMoves = atom({
// 	key: "SelectedPieceAvailableMoves",
// 	default: [],
// })
// export {
// 	GameStartingPosition,
// 	GameCurrentPosition,
// 	GameMoves,
// 	GameBoardSettings,
// 	GameStartingPositionFen,
// 	SelectedPieceData,
// 	SelectedPieceAvailableMoves,
// };

/**
 * @typedef GameMove
 * @property {number} index
 * @property {Ply[]} plys
 */

/**
 * @typedef BoardSettings
 * @type {object}
 * @property {boolean} isFlipped
 */

const { keys, atoms } = createAtoms({
	/**
	 * @type {?State}
	 */
	GameStartingPosition: null,

	/**
	 * @type {?State}
	 */
	GameCurrentPosition: null,

	/**
	 * @type {?State}
	 */
	GameHistoryPosition: null,

	/**
	 * @type {GameMove[]}
	 */
	GameMoves: [],

	/**
	 * @type {BoardSettings}
	 */
	GameBoardSettings: {
		isFlipped: false,
	},

	GameStartingPositionFen: "",

	/**
	 * @type {?string}
	 */
	SelectedPieceData: null,

	/**
	 * @type {string[]}
	 */
	SelectedPieceAvailableMoves: [],

	CurrentPly: [0, 0],
});


export default atoms;

export {
	keys,
};
