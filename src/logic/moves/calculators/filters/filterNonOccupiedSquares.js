/**
 * remove all non-occupied squares
 * @param {string[]} moveSquares
 * @param {State} state
 * @returns {string[]}
 */
const filterNonOccupiedSquares = (moveSquares, state) => {
	return moveSquares.filter((ms) =>
		!state.piecesSquares[ms].isEmpty);
};

export default filterNonOccupiedSquares;
