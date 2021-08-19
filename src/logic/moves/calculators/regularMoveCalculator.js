import calculateSquaresForMove from "./calculateSquaresForMove";
import filterOwnPiecesSquares from "../filters/filterOwnPiecesSquares";
import filterUnreachableSquares from "../filters/filterUnreachableSquares";

const regularMoveCalculator = (square, symbol, state, pieceColor, definition, allowedMoves) => {
	const [count, directions, isEmpty, canBeTaken, ...extras] = definition;

	//all squares the piece could potentially move to (no limitations calculated)
	const moveSquares = calculateSquaresForMove(square, pieceColor, directions, count);

	//Filter out own pieces squares
	const ownPieceFiltered = filterOwnPiecesSquares(pieceColor, moveSquares, state);
	//Filter out squares that are beyond possible takes
	const beyondTakeFiltered = filterBeyondTakeSquares(square, pieceColor, ownPieceFiltered, state);
	//Filter out all unreachable squares left from previous filters
	const filteredSquares = filterUnreachableSquares(square, beyondTakeFiltered);

	console.log("!!!!!!! regularMoveCalculator ", {
		moveSquares,
		filteredSquares,
	});

	//add new allowed moves to those calculated by (possibly) previous calculators
	return allowedMoves.concat(filteredSquares);
};

export default regularMoveCalculator;
