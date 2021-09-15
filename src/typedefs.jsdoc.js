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
 * @callback StateNavigate
 * @param {Array.<number> | number} ply
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
 * @typedef PlyBoardData
 * @type {object}
 * @property {string}
 * @property
 */


/**
 * @typedef Ply
 * @type {object}
 * @property {string} previous
 * @property {string} target
 * @property {PIECE_COLORS} color
 * @property {string} symbol
 * @property {number} move
 * @property {NOTATION_DISAMBIGUATION_TYPES} disambiguationNeeded
 * @property {Take} take
 * @property {CHECK_TYPES} check
 * @property {PlyBoardData} boardData
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
 * @typedef PieceSquare
 * @type {object}
 * @property {string} square
 * @property {string} symbol
 * @property {PIECE_COLORS} pieceColor
 * @property {boolean} isEmpty
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
 * @property {PIECE_COLORS} turn
 * @property {boolean | string} enpassant
 * @property {CHECK_TYPES} whiteCheck
 * @property {CHECK_TYPES} blackCheck
 *
 * @property {StateUpdateWithNextMove} updateWithNextMove - update state with the next ply in the game
 * @property {StateNavigate} navigate - navigate to a ply in the board's history
 * @property {StateClone} clone - get a copy of the state with optional overrides
 * @property {StateGetCachedCalculation} getCachedCalculation
 * @property {StateCacheCalculation} cacheCalculation
 * @property {StateGetCacheSize} getCacheSize
 */

/**
 * @typedef AttackInfo
 * @type {object}
 * @property {string} symbol
 * @property {string} square
 * @property {string[]} moves
 */

/**
 * @typedef PlyAlgebraicNotation
 * @type {object}
 * @property {string} emoji
 * @property {string} normal
 * @property {boolean} isPawn
 * @property {Array.<number>} index
 */
