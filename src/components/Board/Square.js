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
  cursor: ${({ $isMoveTarget }) => $isMoveTarget ? "pointer" : "default"};
	
  ${({ $tone }) => $tone === SQUARE_TONES.LIGHT ? lightSquareCss : darkSquareCss}
`;

const SquareName = styled.span`
  position: absolute;
  left: 2px;
  bottom: 2px;
  font-size: 14px;

  color: ${({ $tone, theme }) =>
          $tone === SQUARE_TONES.LIGHT ? theme.lightOverlayText : theme.darkOverlayText}
`;

const AllowedMoveIndicator = styled.div`
  position: absolute;
  width: 30%;
  height: 30%;
  border-radius: 100%;
  box-shadow: inset 0 0 10px 1px ${({ theme }) => theme.indicators.allowed};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Square = memo(({
	                     piece = null,
	                     tone,
	                     name,
	                     isPieceSelected,
	                     onPieceSelected,
	                     onPieceUnselected,
	                     showSquareName = false,
	                     showAllowedMoveIndication = true,
	                     isAllowedMove = false,
                     }) => {
	// console.log("RENDERING SQUARE !!!!!!!!!!", { piece, tone, name, isPieceSelected });
	return (<SquareContainer
		$tone={tone}
		data-name={name}
		data-allowed-move={isAllowedMove}
		$isMoveTarget={isAllowedMove}
	>
		{piece?.symbol && <Piece
			{...piece}
			isSelected={isPieceSelected}
			onPieceSelected={onPieceSelected}
			onPieceUnselected={onPieceUnselected}
		/>}
		{showSquareName && <SquareName $tone={tone}>{name}</SquareName>}
		{showAllowedMoveIndication && isAllowedMove && <AllowedMoveIndicator/>}
	</SquareContainer>);
});

export default Square;
