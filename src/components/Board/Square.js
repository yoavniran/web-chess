import React, { memo, useCallback } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { SQUARE_TONES } from "consts";
import Piece from "./Piece";
import MoveIndicator from "./MoveIndicator";
import { usePreviousValue } from "beautiful-react-hooks";

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


const Square = memo(({
	                     tone,
	                     name,
	                     symbol,
	                     isPieceSelected,
	                     selectPiece,
	                     unselectPiece,
	                     showSquareName = false,
	                     showAllowedMoveIndication = true,
	                     isAllowedMove = false,
	                     movePiece,
                     }) => {

	const previousSymbol = usePreviousValue(symbol);

	const onSquareClick = useCallback(() => {
		if (isAllowedMove) {
			movePiece({ square: name });
		}
	}, [isAllowedMove, name]);

	return (
		<SquareContainer
			$tone={tone}
			data-name={name}
			data-allowed-move={isAllowedMove}
			$isMoveTarget={isAllowedMove}
			onClick={onSquareClick}
		>
			<AnimatePresence>
				{symbol &&
				<Piece
					key={`piece-${name}`}
					symbol={symbol}
					square={name}
					isSelected={isPieceSelected}
					selectPiece={selectPiece}
					unselectPiece={unselectPiece}
				/>}

				{showSquareName &&
				<SquareName $tone={tone}>{name}</SquareName>}

				{showAllowedMoveIndication && isAllowedMove &&
				<MoveIndicator isTake={!!symbol}/>}
			</AnimatePresence>
		</SquareContainer>
	);
});

export default Square;
