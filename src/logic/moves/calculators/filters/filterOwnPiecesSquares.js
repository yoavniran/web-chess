/**
 * remove squares with pieces of the same color
 * @param {PIECE_COLORS} pieceColor
 * @param {string[]} moveSquares
 * @param {State} state
 * @param {string[]} expectedTake
 * @returns {string[]}
 */
const filterOwnPiecesSquares = (pieceColor, moveSquares, state, expectedTake = []) =>
	moveSquares
		.filter((squareName) => {
			const squareState = state.squares[squareName];
			return !squareState.symbol ||
				squareState.pieceColor !== pieceColor ||
				!!~expectedTake.indexOf(squareName);
		});

export default filterOwnPiecesSquares;
