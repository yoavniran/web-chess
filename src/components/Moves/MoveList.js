import React, { memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PIECE_COLORS } from "consts";
import { clickableMixin } from "../styled.mixins";
import PlyContent from "./PlyContent";
import {
	getIsActivePly,
	getPlyClassName,
	itemAnimationVariants,
	latestPlyCss,
} from "./moves.shared";

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

  opacity: ${({ $active }) => $active ? 1 : 0.5};

  ${({ $latest }) => $latest ? latestPlyCss : ""}
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

const renderPly = (ply, color, isLatest, move, turn, lastHistoryPly, showWithEmojis, onClick) =>
	(<StyledPly
		className={getPlyClassName(color)}
		$for={color}
		$clickable={!!onClick && !!ply}
		$latest={isLatest}
		$active={getIsActivePly(move, turn, lastHistoryPly)}
		onClick={onClick}
	>
		{ply &&
		<PlyContent ply={ply} withEmoji={showWithEmojis}/>}
	</StyledPly>);

const ListItem = memo(({
	                       move,
	                       white,
	                       black,
	                       showWithEmojis,
	                       onPlyClick,
	                       isLatest,
	                       lastHistoryPly,
                       }) => {
	const onWhiteClick = () => onPlyClick?.(white.index);
	const onBlackClick = () => black && onPlyClick?.(black.index);

	return (<ItemWrapper
		initial="hidden"
		animate="visible"
		variants={itemAnimationVariants}
	>
		<StyledMoveIndex>{move + 1}.</StyledMoveIndex>
		{renderPly(white, PIECE_COLORS.WHITE, isLatest && !black, move, 0, lastHistoryPly, showWithEmojis, onPlyClick && onWhiteClick)}
		{renderPly(black, PIECE_COLORS.BLACK, isLatest && !!black, move, 1, lastHistoryPly, showWithEmojis, onPlyClick && onBlackClick)}
	</ItemWrapper>);
});

const MoveList = ({ className, moves, showWithEmojis, lastHistoryPly, onPlyClick }) => {
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
				lastHistoryPly={lastHistoryPly}
			/>)}
	</ListContainer>);
};

export default MoveList;
