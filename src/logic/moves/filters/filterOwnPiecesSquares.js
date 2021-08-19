const filterOwnPiecesSquares = (pieceColor, moveSquares, state) => {
	return moveSquares
		.filter((squareName) => {
			const squareState = state.piecesSquares[squareName];
			return !squareState.symbol || squareState.pieceColor !== pieceColor;
		});
};

export default filterOwnPiecesSquares;
