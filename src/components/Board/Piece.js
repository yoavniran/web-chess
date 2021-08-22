import React, { useCallback } from "react";
import styled from "styled-components";
import ChessPiece from "react-chess-pieces";
import { motion } from "framer-motion";

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

const hoverAnimate = {
	scale: 1.1,
	transition: { duration: 0.5 },
};

const pieceAnimationVariants = {
	visible: { height: "100%", opacity: 100, transition: { duration: 0.2 } },
	hidden: { height: 0, opacity: 0 },
	exit: { height: 0, opacity: 0, transition: { duration: 0.6 } },
};

const Piece = ({ symbol, square, isSelected = false, selectPiece, unselectPiece }) => {
	const onPieceClick = useCallback(() => {
		console.log("PIECE CLICKED !!!! ", { symbol, square });
		if (isSelected) {
			unselectPiece({ symbol, square });
		} else {
			selectPiece({ symbol, square });
		}
	}, [isSelected, selectPiece, unselectPiece, symbol, square]);

	return (
		<PieceWrapper
			key={`piece-wrapper-${square}-${symbol}`}
			onClick={onPieceClick}
			data-selected={isSelected}
			$selected={isSelected}
			whileHover={hoverAnimate}
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pieceAnimationVariants}
		>
			<ChessPiece piece={symbol}/>

			{isSelected &&
			<SelectedIndicator/>}
		</PieceWrapper>
	);
};

export default Piece;
