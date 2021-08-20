/**
 * remove squares with pieces of the same color
 * @param {PIECE_COLOR} pieceColor
 * @param {string[]} moveSquares
 * @param {State} state
 * @returns {string[]}
 */
const filterOwnPiecesSquares = (pieceColor, moveSquares, state) => {
	return moveSquares
		.filter((squareName) => {
			const squareState = state.piecesSquares[squareName];
			return !squareState.symbol || squareState.pieceColor !== pieceColor;
		});
};

export default filterOwnPiecesSquares;
