import { PIECE_COLORS } from "consts";
import filterOwnPiecesSquares from "../filterOwnPiecesSquares";

describe("filterOwnPiecesSquares tests", () => {

	it("should filter out squares with same color pieces", () => {

		filterOwnPiecesSquares(PIECE_COLORS.WHITE,
			["A2", "A3", "B1"], {
				piecesSquares: {
					"A2": {
						symbol: "P",
						pieceColor: PIECE_COLORS.WHITE
					},
					"A3": {

					},

				}
			})


	});
});
