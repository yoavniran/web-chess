import intersection from "lodash/intersection";
import { calculateSquares } from "../moves";
import getColorFromSymbol from "./getColorFromSymbol";
import getSquaresBetween from "./getSquaresBetween";
import { isKing } from "./is";
import { PIECE_COLORS } from "../../consts";

const filterToAttackSquares = (attackerSquare, targetSquare, moves) => {
	return intersection(
		getSquaresBetween(attackerSquare, targetSquare, true),
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

const getAttackingPiecesOnSquare = (targetSquare, color, considerEmpty, state) => {
	const isWhite = color === PIECE_COLORS.WHITE;
	const opponentPieces = isWhite ? state.blackPositions : state.whitePositions;
	const ownPieces = isWhite ? state.whitePositions : state.blackPositions;

	return Object.entries(opponentPieces)
		.reduce((res, [square, symbol]) => {

			//remove attacked color's king from own pieces to avoid infinite loop!
			const useState = isKing(symbol) ? {
				...state,
				whitePositions: isWhite ? removeKingFromPositions(ownPieces) : state.whitePositions,
				blackPositions: !isWhite ? removeKingFromPositions(ownPieces) : state.blackPositions,
			} : state;

			const moves = calculateSquares(
				square, symbol,  getColorFromSymbol(symbol), useState,{
					ignoreTurn: true,
					expectedTake: [targetSquare],
					expectedOccupied: [targetSquare],
					considerEmpty,
					//need to take into consideration kings' repelling force on each other
					ignorePin: true,
				});

			return moves.includes(targetSquare) ? res.concat({
				symbol,
				square,
				moves: filterToAttackSquares(square, targetSquare, moves),
			}) : res;
		}, []);
};

export default getAttackingPiecesOnSquare;
