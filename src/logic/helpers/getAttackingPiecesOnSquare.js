import { calculateSquares } from "../moves";
import getColorFromSymbol from "./getColorFromSymbol";

const getAttackingPiecesOnSquare = (targetSquare, opponentPositions, considerEmpty, state) =>
	Object.entries(opponentPositions)
		.reduce((res, [square, symbol]) => {
			const moves = calculateSquares(
				square, symbol, state, getColorFromSymbol(symbol), {
					ignoreTurn: true,
					expectedTake: [targetSquare],
					expectedOccupied: [targetSquare],
					considerEmpty, //: [startSquare],
					//important! not to get into infinite loop!
					noTakeCheck: true,
				});

			return moves.includes(targetSquare) ? res.concat({
				symbol,
				square,
				moves,
			}) : res;
		}, []);

export default getAttackingPiecesOnSquare;
