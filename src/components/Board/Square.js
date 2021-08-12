import React from "react";
import styled, { css } from "styled-components";
import chessPieces from "react-chess-pieces";
import { SQUARE_TONES } from "consts";

const darkSquareCss = css`
  ${({ theme }) => `
		background-color: ${theme.dark};
		&:hover {
		   box-shadow: inset 0 0 10px 1px ${theme.halfLight}
		   }
  `}
`;

const lightSquareCss = css`
  ${({ theme }) => `
		background-color: ${theme.light};
		   &:hover {
		    box-shadow: inset 0 0 10px 1px ${theme.halfDark}
		   }
  `}
`;

const SquareContainer = styled.div`
  min-width: 32px;
  min-height: 32px;
  width: calc(100% / 8);
  height: calc(100% / 8);

  ${({ $tone }) => $tone === SQUARE_TONES.LIGHT ? lightSquareCss : darkSquareCss}
`;

const Square = ({ piece = null, tone, name }) => {
	console.log("RENDERING SQUARE ", { name, piece });
	return (<SquareContainer $tone={tone}>
		{piece?.symbol && chessPieces({ piece: piece.symbol })}
	</SquareContainer>);
};

export default Square;
