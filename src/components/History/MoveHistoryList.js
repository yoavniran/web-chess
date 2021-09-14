import React, { memo } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { PIECE_COLORS } from "consts";
import { clickableMixin } from "../styled.mixins";
import PlyContent from "./PlyContent";
import { getPlyClassName, itemAnimationVariants } from "./historyUtils";

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2px;
  height: 1.5rem;
`;

const latestPlyCss = css`
  &:after {
	  border-radius: 100%;
	  position: relative;
	  content: "";
    top: 0;
    left: 2px;
	  width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.indicators.allowed};
    //: inset 0 0 2px 1px 
  }
`;

const StyledPly = styled.div`
	position: relative;
  flex: 1 1 0;
  width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px;
  ${clickableMixin}

  ${({ $for, theme }) => $for === PIECE_COLORS.WHITE && `
    color: ${theme.lightOverlayText};
		background-color: ${theme.light};
	`}

  ${({ $for, theme }) => $for === PIECE_COLORS.BLACK && `
    color: ${theme.darkOverlayText};
		background-color: ${theme.dark};
	`}
	
	${({$latest}) => $latest ? latestPlyCss : ""}
`;

const StyledMoveIndex = styled.div`
  width: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  padding: 4px;
`;

const ListItem = memo(({ move, white, black, showWithEmojis, onPlyClick, isLatest }) => {
	const onWhiteClick = () => onPlyClick?.(white.index);
	const onBlackClick = () => onPlyClick?.(black.index);

	return (<ItemWrapper
		initial="hidden"
		animate="visible"
		variants={itemAnimationVariants}
	>
		<StyledMoveIndex>{move + 1}.</StyledMoveIndex>
		<StyledPly
			className={getPlyClassName(PIECE_COLORS.WHITE)}
			$for={PIECE_COLORS.WHITE}
			$clickable={!!onPlyClick}
			$latest={isLatest && !black}
			onClick={onWhiteClick}
		>
			<PlyContent ply={white} withEmoji={showWithEmojis}/>
		</StyledPly>
		<StyledPly
			className={getPlyClassName(PIECE_COLORS.BLACK)}
			$for={PIECE_COLORS.BLACK}
			$clickable={!!onPlyClick}
			$latest={isLatest && !!black}
			onClick={onBlackClick}
		>
			{black &&
			<PlyContent ply={black} withEmoji={showWithEmojis}/>}
		</StyledPly>
	</ItemWrapper>);
});

const MoveHistoryList = ({ className, moves, showWithEmojis, onPlyClick }) => {
	return (<ListContainer className={className}>
		{moves.map(([move, white, black], index) =>
			<ListItem
				key={`move${move}`}
				move={move}
				white={white}
				black={black}
				showWithEmojis={showWithEmojis}
				onPlyClick={onPlyClick}
				isLatest={index === moves.length - 1}
			/>)}
	</ListContainer>);
};

export default MoveHistoryList;
