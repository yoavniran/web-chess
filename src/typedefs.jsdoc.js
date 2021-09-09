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
 * @typedef CalcOptions
 * @type {object}
 * @property {?boolean} expectedTake
 * @property {?number} sidewaysVector
 * @property {?number} diagonalVector
 * @property {?boolean} ignoreTurn
 * @property {?boolean} ignorePin
 * @property {?boolean} ignoreCanBeTaken
 */

/**
 * @callback StateUpdateWithNextMove
 * @param {string} startSquare
 * @param {string} targetSquare
 * @returns {State}
 */

/**
 * @callback StateGetCachedCalculation
 * @param {string} startSquare
 * @param {PIECE_COLORS} color
 * @param {number} directions
 * @param {number} count
 * @param {CalcOptions} options
 * @returns {string[]}
 */

/**
 * @callback StateCacheCalculation
 * @param {string} startSquare
 * @param {PIECE_COLORS} color
 * @param {number} directions
 * @param {number} count
 * @param {CalcOptions} options
 * @returns {undefined}
 */

/**
 * @callback StateGetCacheSize
 * @returns {number}
 */

/**
 * @callback StateClone
 * @param {?Object} overrides
 * @returns {State}
 */

/**
 * @typedef Take
 * @type {object}
 * @property {string} symbol
 * @property {PIECE_COLORS} color
 */

/**
 * @typedef Ply
 * @type {object}
 * @property {string} previous
 * @property {string} target
 * @property {PIECE_COLORS} color
 * @property {string} symbol
 * @property {number} move
 * @property {Take} take
 */

/**
 * @typedef Move
 * @type {Array.<Ply>}
 */


/**
 * @typedef History
 * @type {Array.<Move>}
 */


/**
 * @typedef State
 * @type {Object}
 * @property {Object.<string, PieceSquare>} squares
 * @property {Object.<string, string>} whitePositions
 * @property {Object.<string, string>} blackPositions
 * @property {History} history
 * @property {string} castles
 * @property {number} halfmoveClock
 * @property {number} move
 * @property {TURN_PIECE} turn
 * @property {boolean | string} enpassant
 * @property {CHECK_TYPES} whiteCheck
 * @property {CHECK_TYPES} blackCheck
 *
 * @property {StateUpdateWithNextMove} updateWithNextMove - update state with the next ply in the game
 * @property {StateClone} clone - get a copy of the state with optional overrides
 * @property {StateGetCachedCalculation} getCachedCalculation
 * @property {StateCacheCalculation} cacheCalculation
 * @property {StateGetCacheSize} getCacheSize
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
