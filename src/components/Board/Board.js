import React, { useMemo } from "react";
import styled from "styled-components";
import { createBoardSquares } from "logic";
import Square from "./Square";

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

const Board = ({
	               size = "100%", //100%, px
	               isFlipped = false,
	               pieces = [],
	               coordinates = BOARD_COORDINATES_POSITION.OUTSIDE,
               }) => {

	/**
	 * @type BoardSquare[]
	 */
	const grid = useMemo(() =>
		createBoardSquares(isFlipped), [isFlipped]);

	console.log("!!!! RENDERING BOARD !!!!!", { grid, isFlipped, pieces});

	return (<BoardContainer $size={size}>
		{grid.map((square, index) =>
			<Square
				key={square.name}
				{...square}
				piece={pieces[index]}
			/>)}
	</BoardContainer>);
};

export default Board;
