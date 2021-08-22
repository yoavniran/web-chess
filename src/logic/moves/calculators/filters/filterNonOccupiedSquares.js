/**
 * remove all non-occupied squares
 * @param {string[]} moveSquares
 * @param {State} state
 * @param {string[]} expectedTake
 * @returns {string[]}
 */
const filterNonOccupiedSquares = (moveSquares, state, expectedTake) => {
	expectedTake = expectedTake ?? [];
	return moveSquares.filter((ms) =>
		!state.squares[ms].isEmpty || !!~expectedTake.indexOf(ms));
};

export default filterNonOccupiedSquares;
