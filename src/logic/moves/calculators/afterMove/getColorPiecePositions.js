const getColorPiecePositions = (color, squares) => {
	return Object.values(squares)
		.filter(({ pieceColor }) => pieceColor === color)
		.reduce((res, square) => {
			res[square.name] = square.symbol;
			return res;
		}, {});
};

export default getColorPiecePositions;
