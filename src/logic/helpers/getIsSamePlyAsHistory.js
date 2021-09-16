/**
 *
 * @param {State} state
 * @param {Array.<number>} ply
 */
const getIsSamePlyAsHistory = (state, ply) => {
	const lastMove = state.history.slice(-1)[0];
	return !!lastMove && ((ply[1] &&  lastMove[1]?.move === ply[0]) ||
		(!lastMove[1] && lastMove[0].move === ply[0]));
};

export default getIsSamePlyAsHistory;
