import getAllMoveSquares from "./getAllMoveSquares";
import filterOwnPiecesSquares from "./filters/filterOwnPiecesSquares";
import filterUnreachableSquares from "./filters/filterUnreachableSquares";
import filterBeyondTakeSquares from "./filters/filterBeyondTakeSquares";
import filterNonEmptySquares from "./filters/filterNonEmptySquares";

const runThroughFilters = (moveSquares, square, state, pieceColor, isEmpty, canBeTaken) =>  {
	//Filter out own pieces squares
	moveSquares = filterOwnPiecesSquares(pieceColor, moveSquares, state);
	//Filter out squares that are beyond possible takes
	moveSquares = filterBeyondTakeSquares(square, pieceColor, moveSquares, state);

	if (!canBeTaken) {
		//TODO: filter out squares can be taken on if canBeTaken === false
	}

	if (isEmpty) {
		//filter out squares that must be empty for move
		moveSquares = filterNonEmptySquares(moveSquares, state);
	}

	//Filter out all unreachable squares left from previous filters
	return filterUnreachableSquares(square, moveSquares);
}

const moveCalculator = (square, symbol, state, pieceColor, definition, allowedMoves) => {
	const [count, directions, isEmpty, canBeTaken, ...testers] = definition;

	const canCalculate = testers.every((tester) =>
		tester(square, symbol, state, pieceColor, definition, allowedMoves));

	let moveSquares = [];

	if (canCalculate) {
		//all squares the piece could potentially move to (no limitations calculated)
		moveSquares = getAllMoveSquares(square, pieceColor, directions, count);

		moveSquares = runThroughFilters(moveSquares, square, state, pieceColor, isEmpty, canBeTaken);
	}

	console.log("!!!!!!! moveCalculator ", {
		moveSquares,
		allowedMoves
	});

	//add new allowed moves to those calculated by (possibly) previous calculators
	return allowedMoves.concat(moveSquares);
};

export default moveCalculator;
