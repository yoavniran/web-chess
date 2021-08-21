import { MOVE_SQUARE_STATE } from "consts";
import getAllMoveSquares from "./getAllMoveSquares";
import filterOwnPiecesSquares from "./filters/filterOwnPiecesSquares";
import filterUnreachableSquares from "./filters/filterUnreachableSquares";
import filterBeyondTakeSquares from "./filters/filterBeyondTakeSquares";
import filterNonEmptySquares from "./filters/filterNonEmptySquares";
import filterNonOccupiedSquares from "./filters/filterNonOccupiedSquares";

const runThroughFilters = (moveSquares, square, state, pieceColor, squareState, canBeTaken) =>  {
	//Filter out own pieces squares
	moveSquares = filterOwnPiecesSquares(pieceColor, moveSquares, state);
	//Filter out squares that are beyond possible takes
	moveSquares = filterBeyondTakeSquares(square, pieceColor, moveSquares, state);

	if (!canBeTaken) {
		//TODO: filter out squares can be taken on if canBeTaken === false
	}

	if (squareState === MOVE_SQUARE_STATE.ONLY_EMPTY) {
		//filter out squares that must be empty for move
		moveSquares = filterNonEmptySquares(moveSquares, state);
	} else if (squareState === MOVE_SQUARE_STATE.ONLY_OCCUPIED) {
		moveSquares =  filterNonOccupiedSquares(moveSquares, state);
	}

	//Filter out all unreachable squares left from previous filters
	return filterUnreachableSquares(square, moveSquares);
}

const moveCalculator = (square, symbol, state, pieceColor, definition, allowedMoves) => {
	const [count, directions, squareState, canBeTaken, ...testers] = definition;

	const canCalculate = testers.every((tester) =>
		tester(square, symbol, state, pieceColor, definition, allowedMoves));

	let moveSquares = [];

	if (canCalculate) {
		moveSquares = runThroughFilters(
			//first get all squares the piece could potentially move to (without limitations)
			getAllMoveSquares(square, pieceColor, directions, count),
			square,
			state,
			pieceColor,
			squareState,
			canBeTaken);
	}

	console.log("!!!!!!! moveCalculator ", {
		moveSquares,
		allowedMoves
	});

	//add new allowed moves to those calculated by (possibly) previous calculators
	return allowedMoves.concat(moveSquares);
};

export default moveCalculator;
