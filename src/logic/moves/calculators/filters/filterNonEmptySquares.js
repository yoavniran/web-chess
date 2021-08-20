/**
 * remove all non-empty squares
 * @param {string[]} moveSquares
 * @param {State} state
 * @returns {string[]}
 */
const filterNonEmptySquares = (moveSquares, state) => {
	return moveSquares.filter((ms) =>
		state.piecesSquares[ms].isEmpty);
};

export default filterNonEmptySquares;
