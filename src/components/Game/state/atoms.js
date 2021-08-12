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

const GameCurrentPosition = atom({
	key: "GameCurrentPosition",
	default: null,
	// piecesSquares: getPiecesSquares(parser, isFlipped),
	// castles: parser.castles,
	// ply: parser.halfmoveClock,
	// move: parser.moveNumber - 1,
	// turn: parser.turn,
	// enpass: parser.enpass !== EMPTY ? parser.enpass : false,
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

export {
	GameStartingPosition,
	GameCurrentPosition,
	GameMoves,
	GameBoardSettings,
	GameStartingPositionFen
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
