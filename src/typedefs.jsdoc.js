/**
 * @typedef GameProps
 * @type {object}
 * @property {string} position - Any valid FEN
 * @property {boolean} [showHistory=true] - Show game's move history
 * @property {boolean} [highlightMoves=true] - Show highlight for allowed moves
 * @property {boolean} [highlightChecks=true] - Show highlight for checks and checkmates
 * @property {boolean} [allowMoveByDrag=true] - User can drag&drop pieces on the board
 *
 */
/**
 * @typedef Take
 * @type {object}
 * @property {string | undefined} square,
 * @property {string} symbol,
 * @property {PIECE_COLORS} color
 * @property {number | undefined} move
 */

/**
 * @typedef State
 * @type {object}
 * @property {Object.<string, PieceSquare>} squares
 * @property {Object.<string, string>} whitePositions
 * @property {Object.<string, string>} blackPositions
 * @property {Take[]} takes
 * @property {string} castles
 * @property {number} halfMoveClock
 * @property {number} move
 * @property {TURN_PIECE} turn
 * @property {boolean | string} enpass
 * @property {CHECK_TYPES} whiteCheck
 * @property {CHECK_TYPES} blackCheck
 */

/**
 * @typedef PieceSquare
 * @type {object}
 * @property {string} square
 * @property {string} symbol
 * @property {PIECE_COLORS} pieceColor
 * @property {boolean} isEmpty
 */
