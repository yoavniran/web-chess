import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PIECE_COLORS } from "consts";
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

const StyledPly = styled.div`
  flex: 1 1 0;
  width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px;

  ${({ $for, theme }) => $for === PIECE_COLORS.WHITE && `
    color: ${theme.lightOverlayText};
		background-color: ${theme.light}
	`}

  ${({ $for, theme }) => $for === PIECE_COLORS.BLACK && `
    color: ${theme.darkOverlayText};
		background-color: ${theme.dark}
	`}
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

const ListItem = ({ move, white, black, showWithEmojis }) => {
	return (<ItemWrapper
		initial="hidden"
		animate="visible"
		variants={itemAnimationVariants}
	>
		<StyledMoveIndex>{move + 1}.</StyledMoveIndex>
		<StyledPly
			className={getPlyClassName(PIECE_COLORS.WHITE)}
			$for={PIECE_COLORS.WHITE}
		>
			<PlyContent ply={white} withEmoji={showWithEmojis}/>
		</StyledPly>
		<StyledPly
			className={getPlyClassName(PIECE_COLORS.BLACK)}
			$for={PIECE_COLORS.BLACK}
		>
			{black &&
			<PlyContent ply={black} withEmoji={showWithEmojis}/>}
		</StyledPly>
	</ItemWrapper>);
};

const MoveHistoryList = ({ className, moves, showWithEmojis }) => {
	return (<ListContainer className={className}>
		{moves.map(([move, white, black]) =>
			<ListItem
				key={`move${move}`}
				move={move}
				white={white}
				black={black}
				showWithEmojis={showWithEmojis}
			/>)}
	</ListContainer>);
};

export default MoveHistoryList;
