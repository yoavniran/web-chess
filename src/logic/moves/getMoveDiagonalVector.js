import { DIAGONAL_VECTORS } from "consts";
import { switchReturn } from "utils";
import getSquareName from "../helpers/getSquareName";

const getMoveDiagonalVector = (a, b) =>
	switchReturn([a, b],
		(a, b) => b[0] > a[0] && b[1] > a[1] &&
			DIAGONAL_VECTORS.NE,
		(a, b) => b[0] > a[0] && b[1] < a[1] &&
			DIAGONAL_VECTORS.SE,
		(a, b) => b[0] < a[0] && b[1] < a[1] &&
			DIAGONAL_VECTORS.SW,
		(a, b) => b[0] < a[0] && b[1] > a[1] &&
			DIAGONAL_VECTORS.NW,
		(a, b) => {
			throw new Error(`Provided move isn't diagonal. from: ${getSquareName(a[1], a[0])}, to: ${getSquareName(b[1], b[0])}`);
		});

export default getMoveDiagonalVector;
