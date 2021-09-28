import {
	CHECK_TYPES,
	INITIAL_FEN,
	PIECE_COLORS,
	BLACK_KING,
	BLACK_KNIGHT,
	BLACK_PAWN,
	BLACK_QUEEN,
	WHITE_BISHOP,
	WHITE_PAWN,
	WHITE_ROOK, MOVE_TYPES, BLACK_ROOK,
} from "consts";
import translateFenToState from "../../translateFenToState";
import { isEmptyChar } from "../../helpers/is";

describe("boardState tests", () => {
	it("should create new state on update", () => {
		const state = translateFenToState(INITIAL_FEN);
		const newState = state.updateWithNextMove("E2", { square: "E4" });

		expect(state).not.toBe(newState);
		expect(state.squares["E4"].isEmpty).toBe(true);
		expect(newState.squares["E4"].isEmpty).toBe(false);
		expect(newState.getCacheSize()).not.toBe(state.getCacheSize());
	});

	it("should apply E3 from initial FEN", () => {
		const state = translateFenToState(INITIAL_FEN);
		const newState = state.updateWithNextMove("E2", { square: "E3" });

		expect(newState.whitePositions["E3"]).toBe(WHITE_PAWN);
		expect(newState.whitePositions["E2"]).toBeUndefined();

		expect(newState.squares["E3"].symbol).toBe(WHITE_PAWN);
		expect(newState.squares["E3"].isEmpty).toBe(false);
		expect(newState.squares["E2"].isEmpty).toBe(true);
		expect(newState.squares["E2"].symbol).toBe(false);

		expect(newState.move).toBe(0);
	});

	it("should disable WHITE King side castling for H Rook move", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w KQ - 9 13");
		const newState = state.updateWithNextMove("H1", { square: "G1" });

		expect(newState.whitePositions["G1"]).toBe(WHITE_ROOK);
		expect(newState.whitePositions["H1"]).toBeUndefined();

		expect(newState.castles).toBe("Q");
	});

	it("should disable WHITE Queen side castling for A Rook move", () => {
		const state = translateFenToState("r1bq2r1/pppk2pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R w KQ - 9 13");
		const newState = state.updateWithNextMove("A1", { square: "B1" });

		expect(newState.whitePositions["B1"]).toBe(WHITE_ROOK);
		expect(newState.whitePositions["A1"]).toBeUndefined();
		expect(newState.castles).toBe("K");
	});

	it("should disable BLACK King castling for king move", () => {
		const state = translateFenToState("r1bqk1r1/ppp3pp/7n/n2pp3/3b1Q2/2NP1PP1/PPPBP1BP/R3K2R b kq - 9 13");
		const newState = state.updateWithNextMove("E8", { square: "F8" });

		expect(newState.blackPositions["F8"]).toBe(BLACK_KING);
		expect(isEmptyChar(newState.castles)).toBe(true);
	});

	it("should register take for WHITE", () => {
		const state = translateFenToState("rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 2 2")
			.updateWithNextMove("E4", { square: "D5" });

		expect(state.halfmoveClock).toBe(0);
		expect(state.move).toBe(1);
		expect(state.takes).toHaveLength(1);
		expect(state.takes[0]).toEqual({
			square: "D5",
			symbol: BLACK_PAWN,
			color: PIECE_COLORS.BLACK,
			move: 1,
		});
	});

	it("should register take BLACK", () => {
		const state = translateFenToState(INITIAL_FEN);
		let newState = state.updateWithNextMove("E2", { square: "E4" });
		newState = newState.updateWithNextMove("D7", { square: "D5" });

		newState = newState.updateWithNextMove("E4", { square: "D5" }); //pawn takes pawn
		expect(newState.squares["D5"].symbol).toBe(WHITE_PAWN);

		newState = newState.updateWithNextMove("D8", { square: "D5" }); //queen takes pawn
		expect(newState.squares["D5"].symbol).toBe(BLACK_QUEEN);

		expect(newState.halfmoveClock).toBe(0);
		expect(newState.move).toBe(2);
		expect(newState.takes).toHaveLength(2);

		expect(newState.takes[1]).toEqual({
			square: "D5",
			symbol: WHITE_PAWN,
			color: PIECE_COLORS.WHITE,
			move: 1,
		});
	});

	it("should identify move is check on Black King", () => {
		const state = translateFenToState("8/4pr2/4nk2/4r3/8/2B2nQ1/8/K5R1 w - - 0 33");
		expect(state.whiteCheck).toBe(CHECK_TYPES.NONE);
		expect(state.blackCheck).toBe(CHECK_TYPES.NONE);

		const newState = state.updateWithNextMove("G3", { square: "F3" });

		expect(newState.blackCheck).toBe(CHECK_TYPES.CHECK); //knight can block
		expect(newState.whiteCheck).toBe(CHECK_TYPES.NONE);

		const lastTake = newState.takes.slice(-1)[0];
		expect(lastTake.symbol).toBe(BLACK_KNIGHT);
		expect(lastTake.move).toBe(32);

		expect(newState.history[0][0].check).toBe(CHECK_TYPES.CHECK);
	});

	it("should identify move is check mate on Black King", () => {
		const state = translateFenToState("8/4pr2/4nk2/4r3/8/2B3Q1/8/K5R1 w - - 0 1");
		expect(state.whiteCheck).toBe(CHECK_TYPES.NONE);
		expect(state.blackCheck).toBe(CHECK_TYPES.NONE);

		const newState = state.updateWithNextMove("G3", { square: "E5" });

		expect(newState.blackCheck).toBe(CHECK_TYPES.MATE);
		expect(newState.whiteCheck).toBe(CHECK_TYPES.NONE);
	});

	it("should identify moves for scholar's mate", () => {
		let state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("E7", { square: "E5" })
			.updateWithNextMove("D1", { square: "H4" })
			.updateWithNextMove("B8", { square: "C6" })
			.updateWithNextMove("F1", { square: "C4" })
			.updateWithNextMove("G8", { square: "F6" }) //blunder
			.updateWithNextMove("H4", { square: "F7" }); //mate

		expect(state.blackCheck).toBe(CHECK_TYPES.MATE);
		expect(state.takes).toHaveLength(1);
		expect(state.takes[0].square).toBe("F7");
		expect(state.takes[0].move).toBe(3);
		expect(state.takes[0].symbol).toBe(BLACK_PAWN);

		expect(state.history[0][0].previous).toBe("E2");
		expect(state.history[0][0].target).toBe("E4");

		expect(state.history[0][1].previous).toBe("E7");
		expect(state.history[0][1].target).toBe("E5");

		expect(state.history[3][1]).toBeUndefined();
		expect(state.history[3][0].target).toBe("F7");
		expect(state.history[3][0].take.symbol).toBe(BLACK_PAWN);
	});

	it("should identify black getting out of check", () => {
		let state = translateFenToState("rn1qkbnr/pb1ppppp/8/2p5/8/4Q3/PPP1PPPP/RNB1KBNR w KQkq - 2 5")
			.updateWithNextMove("E3", { square: "E7" }); //queen checks king

		expect(state.blackCheck).toBe(CHECK_TYPES.CHECK);

		state = state.updateWithNextMove("F8", { square: "E7" }); //bishop takes queen
		expect(state.blackCheck).toBe(CHECK_TYPES.NONE);
	});

	it("should follow several moves with takes", () => {
		const state = translateFenToState("r3k1r1/pp2p1bp/2p2qp1/3n4/P1Bp4/1P6/1BP2PPP/R2QR1K1 w q - 7 20")
			.updateWithNextMove("B2", { square: "D4" })
			.updateWithNextMove("F6", { square: "D4" });

		expect(state.takes).toHaveLength(9);

		expect(state.takes[7].symbol).toBe(BLACK_PAWN);
		expect(state.takes[7].move).toBe(19);
		expect(state.takes[7].color).toBe(PIECE_COLORS.BLACK);
		expect(state.takes[8].symbol).toBe(WHITE_BISHOP);
		expect(state.takes[8].move).toBe(19);
		expect(state.takes[8].color).toBe(PIECE_COLORS.WHITE);
	});

	it("should follow several moves with check", () => {
		const state = translateFenToState(INITIAL_FEN)
			.updateWithNextMove("E2", { square: "E4" })
			.updateWithNextMove("D7", { square: "D5" })
			.updateWithNextMove("F1", { square: "B5" })
			.updateWithNextMove("D8", { square: "D7" })
			.updateWithNextMove("B5", { square: "D7" });

		expect(state.blackCheck).toBe(CHECK_TYPES.CHECK);
	});

	it.each([
		[INITIAL_FEN, "F7", "F6"],
		["rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1", "A2", "A4"],
		["rnbqk2r/ppppnppp/4p3/8/1b1PP1Q1/2N5/PPP2PPP/R1B1KBNR b KQkq - 2 4", "D4", "D5"]
	])("should throw on wrong turn:", (fen, from, to) => {
		expect(() => {
			translateFenToState(fen)
				.updateWithNextMove(from, { square: to });
		}).toThrow("WebChess - Wrong color");
	});

	it("should castle black king king-side", () => {
		const state = translateFenToState("rnbqk2r/ppppnppp/4p3/8/1b1PP1Q1/2N5/PPP2PPP/R1B1KBNR b KQkq - 2 4")
			.updateWithNextMove("E8", { square: "G8", type: MOVE_TYPES.CASTLE });

		expect(state.squares.G8.symbol).toBe(BLACK_KING);
		expect(state.squares.F8.symbol).toBe(BLACK_ROOK);
		expect(state.castles).toBe("KQ");

		const lastMove = state.history.slice(-1)[0];
		expect(lastMove[1].moveType).toBe(MOVE_TYPES.CASTLE);
	});
});
