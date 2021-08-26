import { SIDEWAYS_VECTORS } from "consts";
import { switchReturn } from "utils";
import getSquareName from "../helpers/getSquareName";

const getMoveSidewaysVector = (a, b) =>
	switchReturn([a, b],
		(a, b) => a[0] < b[0] && a[1] === b[1] &&
			SIDEWAYS_VECTORS.RIGHT,
		(a, b) => a[0] > b[0] && a[1] === b[1] &&
			SIDEWAYS_VECTORS.LEFT,
		(a, b) => {
			throw new Error(`Provided move isn't sideways. from: ${getSquareName(a[1], a[0])}, to: ${getSquareName(b[1], b[0])}`);
		});

export default getMoveSidewaysVector;
