import React from "react";
import styled, { css } from "styled-components";
import ChessPiece from "react-chess-pieces";

const SelectedIndicator = styled.div`
  position: absolute;
  width: 95%;
  height: 95%;
  border-radius: 50%;
  box-shadow: inset 0 0 10px 1px rgba(234, 207, 143, 0.75);
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

const Piece = ({ symbol, square, isSelected = false, onPieceSelected }) => {
	const onPieceClick = () => {
		console.log("PIECE CLICKED ", { symbol, square });
		onPieceSelected({ symbol, square });
	};

	return (
		<PieceWrapper
			onClick={onPieceClick}
			data-selected={isSelected}
			$selected={isSelected}
		>
			<ChessPiece piece={symbol}/>
			{isSelected && <SelectedIndicator />}
		</PieceWrapper>
	);
};

export default Piece;
