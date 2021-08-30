import translateFenToState from "../../translateFenToState";
import { BLACK_PAWN, INITIAL_FEN, WHITE_PAWN } from "../../../consts";
import getMoveSquares from "../getMoveSquares";

describe("getMoveSquares tests", () => {

	it("should not calculate if in check and selected piece isnt the king", () => {

		throw new Error("imp");
	});

	it("should not calculate if not right turn", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("E7", BLACK_PAWN, state);
		expect(moves).toHaveLength(0);
	});

	it("should calculate for WHITE PAWN on B2", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("B2", WHITE_PAWN, state);
		expect(moves).toHaveLength(2);
	});

	it("should ignore turn if option is true", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("E7", BLACK_PAWN, state, { ignoreTurn: true });
		expect(moves).toHaveLength(2);
	});

	it("should use expected take option", () => {
		const state = translateFenToState(INITIAL_FEN);
		const moves = getMoveSquares("B2", WHITE_PAWN, state, { expectedTake: ["C3"]});
		expect(moves).toHaveLength(3);
	});



});
