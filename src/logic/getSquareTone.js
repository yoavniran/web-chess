import { SQUARE_TONES } from "consts";

/**
 * Returns the tone of the square
 * @param row {number}
 * @param col {number}
 * @returns {SQUARE_TONES}
 */
const getSquareTone = (row, col) => {
	return (row ^ col) % 2 ? SQUARE_TONES.LIGHT : SQUARE_TONES.DARK;
};

export default getSquareTone;
