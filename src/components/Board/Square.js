import React, { memo } from "react";
import styled, { css } from "styled-components";
import { SQUARE_TONES } from "consts";
import Piece from "./Piece";

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
  position: relative;
  min-width: 32px;
  min-height: 32px;
  width: calc(100% / 8);
  height: calc(100% / 8);
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $tone }) => $tone === SQUARE_TONES.LIGHT ? lightSquareCss : darkSquareCss}
`;

const SquareName = styled.span`
  position: absolute;
  left: 2px;
  bottom: 2px;
	font-size: 14px;
	
  color: ${({ $tone }) => $tone === SQUARE_TONES.LIGHT ? "#000" : "#FFF"}
`;

const Square = memo(({
	                     piece = null,
	                     tone,
	                     name,
	                     isPieceSelected,
	                     onPieceSelected,
                     }) => {
	// console.log("RENDERING SQUARE !!!!!!!!!!", { piece, tone, name, isPieceSelected });
	return (<SquareContainer $tone={tone} data-name={name}>
		{piece?.symbol && <Piece
			{...piece}
			isSelected={isPieceSelected}
			onPieceSelected={onPieceSelected}
		/>}
		<SquareName $tone={tone}>{name}</SquareName>
	</SquareContainer>);
});

export default Square;
