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
 * @typedef CalcOptions
 * @type {object}
 * @property {?boolean} expectedTake
 * @property {?number} sidewaysVector
 * @property {?number} diagonalVector
 * @property {?boolean} ignoreTurn
 * @property  {?boolean} ignorePin
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
 * @property {boolean | string} enpassant
 * @property {CHECK_TYPES} whiteCheck
 * @property {CHECK_TYPES} blackCheck
 *
 * @property {(startSquare: string, targetSquare: string) => State} updateWithNextMove - update state with the next ply in the game
 * @property {(startSquare: string, color: PIECE_COLORS, directions: number, count: number, options: CalcOptions) => string[]} getCachedCalculation
 * @property {(startSquare: string, color: PIECE_COLORS, directions: number, count: number, options: CalcOptions) => void} cacheCalculation
 */

/**
 * @typedef PieceSquare
 * @type {object}
 * @property {string} square
 * @property {string} symbol
 * @property {PIECE_COLORS} pieceColor
 * @property {boolean} isEmpty
 */

/**
 * @typedef AttackInfo
 * @type {object}
 * @property {string} symbol
 * @property {string} square
 * @property {string[]} moves
 */
