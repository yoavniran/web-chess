const getColorPositionAfterMove = (positions, startSquare, targetSquare, symbol) => {
	const initPositions = targetSquare ? { [targetSquare]: symbol } : {};

	return Object.entries(positions)
		.reduce((res, [name, symbol]) => {
			//filter out square piece was moved from
			if (name !== startSquare) {
				res[name] = symbol;
			}

			return res;
		}, initPositions);
};

export default getColorPositionAfterMove;
