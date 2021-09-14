import { BLACK_KING, WHITE_KING } from "consts";
import getCheckType from "../helpers/getCheckType";

const createChecksData = (state) => ({
	whiteCheck: getCheckType(WHITE_KING, state),
	blackCheck: getCheckType(BLACK_KING, state),
});

export default createChecksData;
