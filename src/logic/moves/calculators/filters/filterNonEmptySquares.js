/**
 * remove all non-empty squares
 * @param {string[]} moveSquares
 * @param {State} state
 * @param {string[]} expectedOccupied
 * @returns {string[]}
 */
const filterNonEmptySquares = (moveSquares, state, expectedOccupied) => {
	expectedOccupied = expectedOccupied ?? [];
	return moveSquares.filter((ms) =>
		state.squares[ms].isEmpty && !~expectedOccupied.indexOf(ms));
};

export default filterNonEmptySquares;
