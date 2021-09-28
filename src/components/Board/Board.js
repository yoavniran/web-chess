import React, { useMemo } from "react";
import styled from "styled-components";
import { MOVE_ANIMATIONS } from "consts";
import { createBoardSquares, getColorFromSymbol, isKing } from "logic";
import Square from "./Square";
import {} from "../../logic/helpers/is";

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  box-shadow: 0 0 4px 1px #000;

  ${({ $size }) => `
		width: ${$size};
		height: ${$size};
	`}

`;

export const BOARD_COORDINATES_POSITION = {
	NONE: 0,
	OUTSIDE: 1,
	INSIDE: 2,
};

const getCheck = (symbol, checks) => {
	return isKing(symbol) && checks[getColorFromSymbol(symbol)];
};

const Board = ({
	               className,
	               size = "100%", //100%, px
	               isFlipped = false,
	               squares = [],
	               selectedPieceSquare = "",
	               selectedAllowedMoves = [],
	               selectPiece,
	               unselectPiece,
	               movePiece,
	               checks,
	               isPlayable = true,
	               coordinatesPosition = BOARD_COORDINATES_POSITION.OUTSIDE,
	               moveAnimation = MOVE_ANIMATIONS.TELEPORT,
               }) => {

	/**
	 * @type BoardSquare[]
	 */
	const grid = useMemo(() =>
		createBoardSquares(isFlipped), [isFlipped]);

	console.log("%%%%%%%%% RENDERING BOARD %%%%%%%%%", {
		grid,
		isFlipped,
		squares,
		selectedPieceSquare,
		selectedAllowedMoves,
		checks,
	});

	return (<BoardContainer $size={size} className={className}>
		{grid.map((square) => {
			const allowedMove = selectedAllowedMoves.find((m) => m.square === square.name);

			return (<Square
				key={square.name}
				{...square}
				{...squares[square.name]}
				isPieceSelected={selectedPieceSquare === square.name}
				selectPiece={selectPiece}
				unselectPiece={unselectPiece}
				allowedMove={allowedMove}
				check={getCheck(squares[square.name]?.symbol, checks)}
				movePiece={movePiece}
			/>);})}
	</BoardContainer>);
};

export default Board;
