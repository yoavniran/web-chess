import React, { useCallback } from "react";
import styled from "styled-components";
import ChessPiece from "react-chess-pieces";
import { motion } from "framer-motion";

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

const PieceWrapper = styled(motion.div)`
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

const hoverAnimate = {
	scale: 1.1,
	transition: { duration: 0.5 },
};

const Piece = ({ symbol, square, isSelected = false, onPieceSelected, onPieceUnselected }) => {
	const onPieceClick = useCallback(() => {
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
			whileHover={hoverAnimate}
		>
			<ChessPiece piece={symbol}/>

			{isSelected &&
			<SelectedIndicator/>}
		</PieceWrapper>
	);
};

export default Piece;
