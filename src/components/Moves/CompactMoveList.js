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
  flex-wrap: wrap;
`;

const StyledPly = styled.span`
  font-weight: bold;
  display: flex;
  align-items: center;
	position: relative;
	
  ${clickableMixin}

  ${({ $latest }) => $latest ? latestPlyCss : ""}

  opacity: ${({ $active }) => $active ? 1 : 0.5};
`;

const ListItemWrapper = styled(motion.div)`
  margin: 4px 6px 4px 0;
  display: flex;
  align-items: center;
`;

const MoveIndex = styled.span`
  color: ${({ theme }) => theme.dark};
  margin-right: 2px;
`;

const Divider = styled.div`
  width: 0;
  height: 60%;
  border-right: solid 1px rgba(0, 0, 0, 0.4);
  margin: 0 4px;
`;

const ListItem = memo(({ move, white, black, showWithEmojis, lastHistoryPly, isLatest, onPlyClick }) => {
	const onWhiteClick = () => onPlyClick?.(white.index);
	const onBlackClick = () => onPlyClick?.(black.index);

	return (<ListItemWrapper
		initial="hidden"
		animate="visible"
		variants={itemAnimationVariants}
	>
		<MoveIndex>{move + 1}.</MoveIndex>
		<StyledPly
			className={getPlyClassName(PIECE_COLORS.WHITE)}
			$clickable={!!onPlyClick}
			$active={getIsActivePly(move, 0, lastHistoryPly)}
			$latest={isLatest && !black}
			onClick={onWhiteClick}
		>
			<PlyContent ply={white} withEmoji={showWithEmojis}/>
		</StyledPly>

		{black && <>
			<Divider/>
			<StyledPly
				className={getPlyClassName(PIECE_COLORS.BLACK)}
				$clickable={!!onPlyClick}
				$active={getIsActivePly(move, 1, lastHistoryPly)}
				$latest={isLatest}
				onClick={onBlackClick}
			>
				{<PlyContent ply={black} withEmoji={showWithEmojis}/>}
			</StyledPly>
		</>}
	</ListItemWrapper>);
});

const CompactMoveList = ({ className, moves, showWithEmojis, lastHistoryPly, onPlyClick }) => {
	return (<ListContainer className={className}>
		{moves.map(([move, white, black], index) =>
			<ListItem
				key={`move${move}`}
				move={move}
				white={white}
				black={black}
				showWithEmojis={showWithEmojis}
				lastHistoryPly={lastHistoryPly}
				isLatest={index === moves.length - 1}
				onPlyClick={onPlyClick}
			/>)}
	</ListContainer>);
};

export default CompactMoveList;
