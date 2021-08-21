import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import ChessPiece from "react-chess-pieces";

const SelectedIndicator = styled.div`
  position: absolute;
  width: 95%;
  height: 95%;
  border-radius: 50%;
  box-shadow: inset 0 0 10px 1px ${({ theme }) => theme.indicators.selected};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const PieceWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
    height: 95%;
    width: 95%;
  }
`;

const Piece = ({ symbol, square, isSelected = false, onPieceSelected, onPieceUnselected }) => {
	const onPieceClick = useCallback(() => {
		console.log("PIECE CLICKED ", { symbol, square });
		if (isSelected) {
			onPieceUnselected({ symbol, square });
		} else {
			onPieceSelected({ symbol, square });
		}
	}, [isSelected, onPieceSelected, onPieceUnselected, symbol, square]);

	return (
		<PieceWrapper
			onClick={onPieceClick}
			data-selected={isSelected}
			$selected={isSelected}
		>
			<ChessPiece piece={symbol}/>
			{isSelected && <SelectedIndicator/>}
		</PieceWrapper>
	);
};

export default Piece;
