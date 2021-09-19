import { CASTLE_SIDES, PIECE_COLORS } from "consts";

export const CASTLES_RGX = /(K?)(Q?)(k?)(q?)/;

export const CASTLE_POSITIONS = {
	[PIECE_COLORS.WHITE + CASTLE_SIDES.KING]: 1,
	[PIECE_COLORS.WHITE + CASTLE_SIDES.QUEEN]: 2,
	[PIECE_COLORS.BLACK + CASTLE_SIDES.KING]: 3,
	[PIECE_COLORS.BLACK + CASTLE_SIDES.QUEEN]: 4,
};

export const CASTLE_SQUARES = {
	[PIECE_COLORS.WHITE + CASTLE_SIDES.KING]: "G1",
	[PIECE_COLORS.WHITE + CASTLE_SIDES.QUEEN]: "C1",
	[PIECE_COLORS.BLACK + CASTLE_SIDES.KING]: "G8",
	[PIECE_COLORS.BLACK + CASTLE_SIDES.QUEEN]: "C8",
};

const getCanCastle = (castles, color, side = null) => {
	const match = CASTLES_RGX.exec(castles);

	return side ?
		!!match[CASTLE_POSITIONS[color + side]] :
		!!(match[CASTLE_POSITIONS[color + CASTLE_SIDES.KING]] ||
			match[CASTLE_POSITIONS[color + CASTLE_SIDES.QUEEN]]);
};

const getCastleOptions = (castles, color) => {
	const match = CASTLES_RGX.exec(castles);
	return {
		[CASTLE_SIDES.KING]:
			match[CASTLE_POSITIONS[color + CASTLE_SIDES.KING]] ? CASTLE_SQUARES[color + CASTLE_SIDES.KING] : false,
		[CASTLE_SIDES.QUEEN]:
			match[CASTLE_POSITIONS[color + CASTLE_SIDES.QUEEN]] ? CASTLE_SQUARES[color + CASTLE_SIDES.QUEEN] : false,
	};
};

export {
	getCanCastle,
	getCastleOptions,
};
