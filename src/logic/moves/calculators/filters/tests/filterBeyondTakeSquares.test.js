import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import getAllMoveSquares from "../../getAllMoveSquares";
import filterBeyondTakeSquares from "../filterBeyondTakeSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterBeyondTakeSquares tests", () => {

	it("should find takes for White Queen on D3", () => {
		const moveSquares = getAllMoveSquares(
			"D3",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.DIAGONAL | MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		const state = {
			piecesSquares: {
				F5: { pieceColor: PIECE_COLORS.BLACK },
				E2: { pieceColor: PIECE_COLORS.WHITE },
				G3: { pieceColor: PIECE_COLORS.BLACK },
				D6: { pieceColor: PIECE_COLORS.BLACK },
				A3: { pieceColor: PIECE_COLORS.BLACK },
			},
		};

		const filtered = filterBeyondTakeSquares(
			"D3",
			PIECE_COLORS.WHITE,
			moveSquares,
			state,
		);

		expect(findSquare("G6", filtered)).toBe(false);
		expect(findSquare("G6", moveSquares)).toBe(true);

		expect(findSquare("H3", filtered)).toBe(false);
		expect(findSquare("H3", moveSquares)).toBe(true);

		expect(findSquare("D7", filtered)).toBe(false);
		expect(findSquare("D7", moveSquares)).toBe(true);

		expect(findSquare("F1", filtered)).toBe(true);
	});

	it("should find takes for Black Rook on F6", () => {
		const moveSquares = getAllMoveSquares(
			"F6",
			PIECE_COLORS.BLACK,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		const state = {
			piecesSquares: {
				F7: { pieceColor: PIECE_COLORS.WHITE }, //cause remove: F8
				G6: { pieceColor: PIECE_COLORS.BLACK },
				F3: { pieceColor: PIECE_COLORS.WHITE }, //cause remove: F2
				D6: { pieceColor: PIECE_COLORS.WHITE }, //cause remove: C6
				F5: { isEmpty: true },
			},
		};

		const filtered = filterBeyondTakeSquares("F6", PIECE_COLORS.BLACK, moveSquares, state);

		expect(findSquare("H6", filtered)).toBe(true);
		expect(findSquare("F4", filtered)).toBe(true);

		expect(findSquare("F2", filtered)).toBe(false);
		expect(findSquare("F2", moveSquares)).toBe(true);

		expect(findSquare("F8", filtered)).toBe(false);
		expect(findSquare("F8", moveSquares)).toBe(true);

		expect(findSquare("F2", filtered)).toBe(false);
		expect(findSquare("F2", moveSquares)).toBe(true);

		expect(findSquare("C6", filtered)).toBe(false);
		expect(findSquare("C6", moveSquares)).toBe(true);
	});
});
