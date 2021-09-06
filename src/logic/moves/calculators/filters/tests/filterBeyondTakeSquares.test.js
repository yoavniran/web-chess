import { MOVE_DIRECTIONS, PIECE_COLORS } from "consts";
import getStateMock from "logic/tests/mocks/boardState.mock";
import calculatePieceAllMoveSquares from "../../calculatePieceAllMoveSquares";
import filterBeyondTakeSquares from "../filterBeyondTakeSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterBeyondTakeSquares tests", () => {

	it("should find takes for White Queen on D3", () => {
		const moveSquares = calculatePieceAllMoveSquares(
			"D3",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.DIAGONAL | MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		const state = getStateMock({
				squares: {
					F5: { pieceColor: PIECE_COLORS.BLACK },
					E2: { pieceColor: PIECE_COLORS.WHITE },
					G3: { pieceColor: PIECE_COLORS.BLACK },
					D6: { pieceColor: PIECE_COLORS.BLACK },
					A3: { pieceColor: PIECE_COLORS.BLACK },
				},
			});

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
		const moveSquares = calculatePieceAllMoveSquares(
			"F6",
			PIECE_COLORS.BLACK,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		const state = getStateMock({
			squares: {
				F7: { pieceColor: PIECE_COLORS.WHITE }, //cause remove: F8
				G6: { pieceColor: PIECE_COLORS.BLACK },
				F3: { pieceColor: PIECE_COLORS.WHITE }, //cause remove: F2
				D6: { pieceColor: PIECE_COLORS.WHITE }, //cause remove: C6
				F5: { isEmpty: true },
			},
		});

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

	it("should find takes for Black Queen on F2 with expected take", () => {
		const moveSquares = calculatePieceAllMoveSquares(
			"F2",
			PIECE_COLORS.BLACK,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS | MOVE_DIRECTIONS.DIAGONAL,
			Infinity,
		);

		const state = getStateMock({
			squares: {
				B2: { pieceColor: PIECE_COLORS.BLACK }, //cause remove: A2
				F6: { pieceColor: PIECE_COLORS.WHITE }, //cause remove: F7
			},
		});

		const filtered = filterBeyondTakeSquares("F2", PIECE_COLORS.BLACK, moveSquares, state, { expectedTake: ["B2"] });

		expect(findSquare("A2", filtered)).toBe(false);
		expect(findSquare("F7", filtered)).toBe(false);

		expect(filtered).toHaveLength(21);
	});

	it("should ignore take if expected empty", () => {
		const moveSquares = calculatePieceAllMoveSquares(
			"C3",
			PIECE_COLORS.WHITE,
			MOVE_DIRECTIONS.FORWARD | MOVE_DIRECTIONS.BACKWARD | MOVE_DIRECTIONS.SIDEWAYS,
			Infinity,
		);

		const state = getStateMock({
			squares: {
				E3: { pieceColor: PIECE_COLORS.BLACK }, //cause remove: F3
				C7: { pieceColor: PIECE_COLORS.BLACK }, //cause remove: C8
			},
		});

		const filtered = filterBeyondTakeSquares(
			"C3",
			PIECE_COLORS.WHITE,
			moveSquares,
			state,
			{ considerEmpty: ["C7"] }
		);

		expect(findSquare("F3", filtered)).toBe(false);
		expect(findSquare("C8", filtered)).toBe(true);
	});
});
