import { isPawn } from "logic/helpers/is";

const getFiftyMoveRuleCount = (count, symbol, isTake) =>
	 (!isTake && !isPawn(symbol)) ? count + 1 : 0;

export default getFiftyMoveRuleCount;
