import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PIECE_COLORS } from "consts";
import PlyContent from "./PlyContent";
import { getPlyClassName, itemAnimationVariants } from "./historyUtils";

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StyledPly = styled.span`
  font-weight: bold;
	display: flex;
	align-items: center;
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

const ListItem = ({ move, white, black, showWithEmojis }) => {
	return (<ListItemWrapper
		initial="hidden"
		animate="visible"
		variants={itemAnimationVariants}
	>
		<MoveIndex>{move + 1}.</MoveIndex>
		<StyledPly
			className={getPlyClassName(PIECE_COLORS.WHITE)}
		>
			<PlyContent ply={white} withEmoji={showWithEmojis}/>
		</StyledPly>

		{black && <>
			<Divider/>
			<StyledPly
				className={getPlyClassName(PIECE_COLORS.BLACK)}
			>
				{<PlyContent ply={black} withEmoji={showWithEmojis}/>}
			</StyledPly>
		</>}
	</ListItemWrapper>);
};

const CompactMoveHistoryList = ({ className, moves, showWithEmojis }) => {
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

export default CompactMoveHistoryList;
