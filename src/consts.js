/**
 * Square tone enum
 * @readonly
 * @enum {string}
 */
export const SQUARE_TONES = {
	LIGHT: "LIGHT",
	DARK: "DARK",
};

export const PIECE_COLORS = {
	WHITE: "WHITE",
	BLACK: "BLACK",
};

export const TURN_PIECE = {
	"w": PIECE_COLORS.WHITE,
	"b": PIECE_COLORS.BLACK,
};

export const WHITE_ROOK = "R",
	WHITE_KNIGHT = "N",
	WHITE_BISHOP = "B",
	WHITE_QUEEN = "Q",
	WHITE_KING = "K",
	WHITE_PAWN = "P";

export const BLACK_ROOK = "r",
	BLACK_KNIGHT = "n",
	BLACK_BISHOP = "b",
	BLACK_QUEEN = "q",
	BLACK_KING = "k",
	BLACK_PAWN = "p";

export const MOVE_TYPES = {
	MOVE: "MOVE",
	CASTLE: "CASTLE",
	EN_PASSANT: "EN_PASSANT",
};

export const MOVE_DIRECTIONS = {
	"FORWARD": 1,
	"BACKWARD": 2,
	"SIDEWAYS": 4,
	"DIAGONAL": 8,
	"KNIGHT": 16,
};


export const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const EMPTY = "-";

export const DIAGONAL_VECTORS = {
	NE: 1,
	NW: 2,
	SE: 4,
	SW: 8,
};

export const SIDEWAYS_VECTORS = {
	LEFT: 1,
	RIGHT: 2,
};

export const MOVE_SQUARE_STATE = {
	ONLY_EMPTY: "ONLY_EMPTY",
	ONLY_OCCUPIED: "ONLY_OCCUPIED",
	EITHER: "EITHER"
};
