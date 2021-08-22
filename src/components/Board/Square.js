import React, { memo, useCallback } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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

const AllowedMoveIndicator = styled(motion.div)`
  position: absolute;
  width: 30%;
  height: 30%;
  border-radius: 100%;
  box-shadow: inset 0 0 10px 1px ${({ theme }) => theme.indicators.allowed};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const moveIndicatorAnimationVariants = {
	visible: { height: "30%", width: "30%", opacity: "100%" },
	hidden: { height: 0, width: 0, opacity: 0 },
	exit: { height: 0, width: 0, opacity: 0 },
};

const moveIndicatorHoverAnimate = {
	width: "20%",
	height: "20%",
	transition: { duration: 0.5 },
};

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
	const onSquareClick = useCallback(() => {
		if (isAllowedMove) {
			console.log("ALLOWED MOVED SQUARE CLICKED ", name);
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
					key={`piece-${name}-${symbol}`}
					symbol={symbol}
					square={name}
					isSelected={isPieceSelected}
					selectPiece={selectPiece}
					unselectPiece={unselectPiece}
				/>}

				{showSquareName &&
				<SquareName $tone={tone}>{name}</SquareName>}

				{showAllowedMoveIndication && isAllowedMove &&
				<AllowedMoveIndicator
					key={`${name}-${symbol}-moveIndicator`}
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={moveIndicatorAnimationVariants}
					whileHover={moveIndicatorHoverAnimate}
				/>}
			</AnimatePresence>
		</SquareContainer>
	);
});

export default Square;
