import intersection from "lodash/intersection";
import { getNextMoveSquares } from "../moves";
import getColorFromSymbol from "./getColorFromSymbol";
import getSquaresBetween from "./getSquaresBetween";
import { isKing } from "./is";
import { PIECE_COLORS } from "../../consts";

const filterToAttackSquares = (attackerSquare, targetSquare, moves, state) => {
	return intersection(
		getSquaresBetween(attackerSquare, targetSquare, state, true),
		moves,
	);
};

const removeKingFromPositions = (positions) => Object.entries(positions)
	.reduce((res, [square, symbol]) => {
		if (!isKing(symbol)) {
			res[square] = symbol;
		}
		return res;
	}, {});

const getAttacksOnSquare = (targetSquare, considerEmpty, opponentPieces, ownPieces, isWhite, state, options) =>
	Object.entries(opponentPieces)
		.reduce((res, [square, symbol]) => {
			let moves;

			if (!res.includes(targetSquare) || !options.bailOnFirst) {
				//remove attacked color's king from own pieces to avoid infinite loop!
				const useState = isKing(symbol) ?
					state.clone({
						whitePositions: isWhite ? removeKingFromPositions(ownPieces) : state.whitePositions,
						blackPositions: !isWhite ? removeKingFromPositions(ownPieces) : state.blackPositions,
					}) : state;

				moves = getNextMoveSquares(
					square, symbol, getColorFromSymbol(symbol), useState, {
						ignoreTurn: true,
						expectedTake: [targetSquare],
						expectedOccupied: [targetSquare],
						considerEmpty,
						//need to take into consideration kings' repelling force on each other
						ignorePin: true,
						ignoreCanBeTaken: options.ignoreTakesOnAttacker,
					});
			}

			return moves?.includes(targetSquare) ?
				res.concat({
					symbol,
					square,
					moves: filterToAttackSquares(square, targetSquare, moves, state),
				}) : res;
		}, []);

/**
 * @typedef Attacker
 * @type {object}
 * @property {string} symbol
 * @property {string} square
 * @property {Array.<string>} moves
 */

/**
 * @typedef GetAttackingPiecesOptions
 * @type {object}
 * @property {?boolean} bailOnFirst
 * @property {?boolean} ignoreTakesOnAttacker
 */

/**
 *
 * @param targetSquare
 * @param color
 * @param considerEmpty
 * @param state
 * @param {?GetAttackingPiecesOptions} options
 * @returns {Array.<Attacker>}
 */
const getAttackingPiecesOnSquare = (targetSquare, color, considerEmpty, state, options = {}) => {
	const isWhite = color === PIECE_COLORS.WHITE;
	const opponentPieces = isWhite ? state.blackPositions : state.whitePositions;
	const ownPieces = isWhite ? state.whitePositions : state.blackPositions;

	return getAttacksOnSquare(
		targetSquare,
		considerEmpty,
		opponentPieces,
		ownPieces,
		isWhite,
		state,
		options);
};

export default getAttackingPiecesOnSquare;
