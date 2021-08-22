const applyMoveToState = (state, startSquare, targetSquare) => {

	console.log("CALCULATING NEW STATE FOR MOVE: ", { state, startSquare, targetSquare });

	const { squares, whitePositions, blackPositions } = state;

	console.log(Object.getOwnPropertyDescriptor(state, "squares"));

	// state.squares = {
	//
	// }
	// state.squares[startSquare].isEmpty = true;
	// state.squares[startSquare].symbol = false;
	// state.squares[startSquare].pieceColor = null;
	//need to calculate castle
	//need to calculate enpassant
	//need to update turn
	//nned to update move

	return {
		...state,
		squares: {
			...squares,
			[startSquare]: {
				...state.squares[startSquare],
				isEmpty: true,
				symbol: false,
				pieceColor: null,
			}
		}
	};
};

export default applyMoveToState;
