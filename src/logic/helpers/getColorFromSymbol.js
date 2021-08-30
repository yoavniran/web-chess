import { PIECE_COLORS } from "consts";

const getColorFromSymbol = (symbol) =>
	symbol === symbol.toLowerCase() ?
		PIECE_COLORS.BLACK : PIECE_COLORS.WHITE;

export default getColorFromSymbol;
