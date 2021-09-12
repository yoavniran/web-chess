import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Ply = styled.span`
  font-weight: bold;
`;

const ListItemWrapper = styled.div`
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
	return (<ListItemWrapper>
		<MoveIndex>{move + 1}.</MoveIndex>
		<Ply>
			{showWithEmojis ? white.emoji : white.normal}
		</Ply>

		{black && <>
			<Divider/>
			<Ply>
				{showWithEmojis ? black.emoji : black.normal}
			</Ply>
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
