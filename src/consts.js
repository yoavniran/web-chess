/**
 * Square tone enum
 * @readonly
 * @enum {string}
 */
export const SQUARE_TONES = {
	LIGHT: "LIGHT",
	DARK: "DARK",
};

/**
 * Enum for pieces colors
 * @readonly
 * @enum {string}
 */
export const PIECE_COLORS = {
	/** WHITE COLOR */
	WHITE: "WHITE",
	/** BLACK COLOR */
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

/**
 * Enum for types of moves
 * @readonly
 * @enum {string}
 */
export const MOVE_TYPES = {
	MOVE: "MOVE",
	CASTLE: "CASTLE",
	EN_PASSANT: "EN_PASSANT",
	PROMOTION: "PROMOTION",
};

/**
 * Enum for move directions
 * @readonly
 * @enum {number}
 */
export const MOVE_DIRECTIONS = {
	/** FORWARD */
	"FORWARD": 1,
	/** BACKWARD */
	"BACKWARD": 2,
	/** SIDEWAYS */
	"SIDEWAYS": 4,
	/** DIAGONAL */
	"DIAGONAL": 8,
	/** KNIGHT */
	"KNIGHT": 16,
};

export const INIT_CASTLES = "KQkq";

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
	EITHER: "EITHER",
};

export const MOVE_ANIMATIONS = {
	NONE: "NONE",
	TELEPORT: "TELEPORT",
	SLIDE: "SLIDE",
};

export const CASTLE_SIDES = {
	QUEEN: "q",
	KING: "k",
};

/**
 * Enum for king check types
 * @readonly
 * @enum {string}
 */
export const CHECK_TYPES = {
	NONE: "NONE",
	CHECK: "CHECk",
	MATE: "MATE",
};

export const WHITE_INIT_PIECES = {
	[WHITE_PAWN]: 8,
	[WHITE_KNIGHT]: 2,
	[WHITE_BISHOP]: 2,
	[WHITE_ROOK]: 2,
	[WHITE_QUEEN]: 1,
	[WHITE_KING]: 1,
};

export const BLACK_INIT_PIECES = {
	[BLACK_PAWN]: 8,
	[BLACK_KNIGHT]: 2,
	[BLACK_BISHOP]: 2,
	[BLACK_ROOK]: 2,
	[BLACK_QUEEN]: 1,
	[BLACK_KING]: 1,
};

export const PIECES_EMOJIS = {
	[BLACK_KING]:"♚",
	[BLACK_QUEEN]: "♛",
	[BLACK_ROOK]: "♜",
	[BLACK_KNIGHT]: "♞",
	[BLACK_BISHOP]: "♝",
	[BLACK_PAWN]: "♟️",

	[WHITE_KING]: "♔",
	[WHITE_QUEEN]: "♕",
	[WHITE_ROOK]: "♖",
	[WHITE_BISHOP]: "♗",
	[WHITE_KNIGHT]: "♘",
	[WHITE_PAWN]: "♙",
};

/**
 * Enum for notation disambiguation
 * @readonly
 * @enum {string}
 */
export const NOTATION_DISAMBIGUATION_TYPES = {
	NONE: "NONE",
	COLUMN: "COLUMN",
	ROW: "ROW"
};
