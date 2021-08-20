import { PIECE_COLORS } from "consts";
import filterOwnPiecesSquares from "../filterOwnPiecesSquares";

const findSquare = (name, squares) => !!squares.find((s) => s === name);

describe("filterOwnPiecesSquares tests", () => {

	it("should filter out squares with same color pieces", () => {

		const filtered = filterOwnPiecesSquares(PIECE_COLORS.WHITE,
			["A2", "A3", "B1"], {
				piecesSquares: {
					"A2": {
						symbol: "P",
						pieceColor: PIECE_COLORS.WHITE,
						isEmpty: false,
					},
					"A3": {
						symbol: "P",
						pieceColor: PIECE_COLORS.BLACK,
						isEmpty: false,
					},
					"B1": {
						isEmpty: true,
					},
				},
			});

		expect(findSquare("A2", filtered)).toBe(false);
		expect(findSquare("A3", filtered)).toBe(true);
		expect(findSquare("B1", filtered)).toBe(true);
	});
});
