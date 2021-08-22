import { MOVE_SQUARE_STATE } from "consts";
import getAllMoveSquares from "./getAllMoveSquares";
import filterOwnPiecesSquares from "./filters/filterOwnPiecesSquares";
import filterUnreachableSquares from "./filters/filterUnreachableSquares";
import filterBeyondTakeSquares from "./filters/filterBeyondTakeSquares";
import filterNonEmptySquares from "./filters/filterNonEmptySquares";
import filterNonOccupiedSquares from "./filters/filterNonOccupiedSquares";
import filterCanBeTakenSquares from "./filters/filterCanBeTakenSquares";

const runThroughFilters = (moveSquares, square, state, pieceColor, squareState, canBeTaken, options) => {
	//Filter out own pieces squares.
	moveSquares = filterOwnPiecesSquares(pieceColor, moveSquares, state, options.expectedTake);

	//Filter out squares that are beyond possible takes
	moveSquares = filterBeyondTakeSquares(square, pieceColor, moveSquares, state, options.expectedTake);

	if (!canBeTaken) {
		//filter out squares can be taken on if canBeTaken === false
		moveSquares = filterCanBeTakenSquares(sqiare, pieceColor, moveSquares, state);
	}

	if (squareState === MOVE_SQUARE_STATE.ONLY_EMPTY) {
		//filter out squares that must be empty for move
		moveSquares = filterNonEmptySquares(moveSquares, state, options.expectedTake);
	} else if (squareState === MOVE_SQUARE_STATE.ONLY_OCCUPIED) {
		moveSquares = filterNonOccupiedSquares(moveSquares, state, options.expectedTake);
	}

	//Filter out all unreachable squares left from previous filters
	return filterUnreachableSquares(square, moveSquares);
};

const moveCalculator = (square, symbol, state, pieceColor, definition, options = {}) => {
	const [count, directions, squareState, canBeTaken, ...testers] = definition;

	const canCalculate = testers.every((tester) =>
		tester(square, symbol, state, pieceColor, definition));

	let moveSquares = [];

	if (canCalculate) {
		moveSquares = runThroughFilters(
			//first get all squares the piece could potentially move to (without limitations)
			getAllMoveSquares(square, pieceColor, directions, count),
			square,
			state,
			pieceColor,
			squareState,
			canBeTaken,
			options,
		);
	}

	//add new allowed moves to those calculated by (possibly) previous calculators
	return moveSquares;
};

export default moveCalculator;
