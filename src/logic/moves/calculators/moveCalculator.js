import { MOVE_SQUARE_STATE } from "consts";
import calculatePieceAllMoveSquares from "./calculatePieceAllMoveSquares";
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
	moveSquares = filterBeyondTakeSquares(square, pieceColor, moveSquares, state, options);

	if (!canBeTaken && !options.noTakeCheck) {
		//filter out squares can be taken on if canBeTaken === false
		moveSquares = filterCanBeTakenSquares(pieceColor, square, moveSquares, state);
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

	let moveSquares = [];

	const canCalculate = testers.every((tester) =>
		tester(square, symbol, state, pieceColor, definition));

	if (canCalculate) {
		moveSquares = runThroughFilters(
			//first get all squares the piece could potentially move to (without limitations)
			calculatePieceAllMoveSquares(square, pieceColor, directions, count),
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
