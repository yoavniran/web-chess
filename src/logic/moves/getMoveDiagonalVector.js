import { DIAGONAL_VECTORS } from "../../consts";
import getSquareName from "../getSquareName";

const getMoveDiagonalVector = (a, b) => {
	if (b[0] > a[0] && b[1] > a[1]) {
		return DIAGONAL_VECTORS.NE;
	} else if (b[0] > a[0] && b[1] < a[1]) {
		return DIAGONAL_VECTORS.SE;
	} else if (b[0] < a[0] && b[1] < a[1]) {
		return DIAGONAL_VECTORS.SW;
	} else if (b[0] < a[0] && b[1] > a[1]) {
		return DIAGONAL_VECTORS.NW;
	}

	throw new Error(`Provided move isn't diagonal. from: ${getSquareName(a[1], a[0])}, to: ${getSquareName(b[1], b[0])}`);
};

export default getMoveDiagonalVector;
