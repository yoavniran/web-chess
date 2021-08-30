import { PIECE_COLORS } from "consts";

const getOppositeColor = (color) => color === PIECE_COLORS.WHITE ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE

export default getOppositeColor;
