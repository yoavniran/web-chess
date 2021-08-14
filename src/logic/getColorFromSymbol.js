import { PIECE_COLORS } from "consts";

const getColorFromSymbol = (symbol) =>{
	return symbol === symbol.toLowerCase() ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE;
}

export default getColorFromSymbol;
