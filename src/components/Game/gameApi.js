const createGameApi = ({
	                       toggleFlipped,
	                       setStartingPosition,
	                       rewindForward,
                       }) => {

	console.log("1!!!!!!! CREATING GAME API !!!!!!!");

	/**
	 * restart the game
	 * by default to the starting position (if FEN was used)
	 * if clean is true, starts from scratch ignoring FEN position
	 * @param clean
	 */
	const restart = (clean = false) => {

	};

	const goToPly = (move = 0, ply = 0) => {
		rewindForward({ ply: [move, ply] });
	};

	// const makeMove = (source, target, options) => {
	//
	//
	// };

	const flipBoard = () => {
		toggleFlipped();
	};

	const resign = (color) => {

	};

	/**
	 * restart Game from provided FEN position
	 * @param {string} fen
	 */
	const loadFen = (fen) => {
		setStartingPosition(fen);
	};

	const loadPgn = (pgn) => {

	};

	const exportToFen = () => {

	};

	const exportToPgn = () => {

	};

	// const offerDraw = (color)

	return {
		flipBoard,
		loadFen,
		goToPly,
	};
};

export default createGameApi;
