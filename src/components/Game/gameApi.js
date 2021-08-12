const createGameApi = (state) =>  {

	console.log("1!!!!!!! CREATING GAME API !!!!!!!");

	/**
	 * restart the game
	 * by default to the starting position (if FEN was used)
	 * if clean is true, starts from scratch ignoring FEN position
	 * @param clean
	 */
	const restart = (clean = false) => {

	};

	const rewind = (move = 0, ply = 0) => {

	};

	const makeMove = (source, target, options) => {

		//TODO: check validity

	};

	const flipBoard = () => {

	};

	const resign = (color) => {

	};

	const loadFen = (fen) => {

	};

	const loadPgn = (pgn) => {

	};

	// const offerDraw = (color)

	return {

	};
};

export default createGameApi;
