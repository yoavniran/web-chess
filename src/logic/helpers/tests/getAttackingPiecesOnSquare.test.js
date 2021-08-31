import { BLACK_BISHOP, BLACK_QUEEN, WHITE_ROOK } from "consts";
import translateFenToState from "../../translateFenToState";
import getAttackingPiecesOnSquare from "../getAttackingPiecesOnSquare";

describe("getAttackingPiecesOnSquare tests", () => {

	it("should return attacking bishop on G2", () => {
		const state = translateFenToState("8/2p1P2k/p1bB2pp/2P4r/1P6/6P1/5PKP/q7 w - - 0 29");
		const attackInfo = getAttackingPiecesOnSquare("G2", state.blackPositions, [], state);

		expect(attackInfo).toHaveLength(1);
		expect(attackInfo[0].symbol).toBe(BLACK_BISHOP);
		expect(attackInfo[0].square).toBe("C6");
		expect(attackInfo[0].moves.includes("G2")).toBe(true);
	});

	it("should return attacking bishop & queen on G2", () => {
		const state = translateFenToState("8/2p1P2k/p1bB2pp/2P4r/1P3P2/6P1/q5KP/8 w - - 0 29");
		const attackInfo = getAttackingPiecesOnSquare("G2", state.blackPositions, [], state);

		expect(attackInfo).toHaveLength(2);
		expect(attackInfo[0].symbol).toBe(BLACK_BISHOP);
		expect(attackInfo[0].square).toBe("C6");
		expect(attackInfo[0].moves.includes("G2")).toBe(true);

		expect(attackInfo[1].symbol).toBe(BLACK_QUEEN);
		expect(attackInfo[1].square).toBe("A2");
		expect(attackInfo[1].moves.includes("G2")).toBe(true);
	});

	it("should return attacking rook with square behind king", () => {
		const state = translateFenToState("1r1r4/1pkp4/3n4/8/5B2/2R1B3/8/7K b - - 0 1");
		const attackInfo =getAttackingPiecesOnSquare("C7", state.whitePositions, ["C7"], state);

		expect(attackInfo).toHaveLength(1);
		expect(attackInfo[0].symbol).toBe(WHITE_ROOK);
		expect(attackInfo[0].moves.includes("C7")).toBe(true);
		expect(attackInfo[0].moves.includes("C8")).toBe(true);
	});
});
