import React, { useState } from "react";
import styled from "styled-components";
import { GameMoves } from "../src";
import { MdInsertEmoticon } from "react-icons/md";
import { BiText } from "react-icons/bi";
import { GoListOrdered } from "react-icons/go";
import { IoMdList } from "react-icons/io";

const MovesContainer = styled.div`
  width: 300px;
`;

const StyledGameMoves = styled(GameMoves)`

	.emoji-ply {
		font-size: 22px;
		margin-top: -4px;
	}
`;

const MovesToggleBar = styled.div`
  display: flex;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  border-bottom: solid 1px rgba(106, 106, 106, 0.78);
	margin-bottom: 4px;
`;

const BarButtons = styled.div`
  display: flex;
  height: 100%;
  margin-left: 4px;
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: ${({ disabled }) => disabled ? "default" : "pointer"};

  &:hover {
    background-color: ${({ disabled }) => disabled ? "" : "rgba(108, 118, 118, 0.2)"};
  }

  svg {
    color: ${({ disabled }) => disabled ? "#959494" : "#191818"}
  }
`;

const ToggleButton = ({ Icon, onClick, disabled, ...props }) => {
	return (<StyledButton
		onClick={onClick}
		disabled={disabled || undefined}
	>
		<Icon {...props} size={26}/>
	</StyledButton>);
};

const Divider = styled.div`
  height: 75%;
  width: 0;
  border: solid 1px rgba(0, 0, 0, 0.64);
`;

const Moves = () => {
	const [isEmojis, setEmojis] = useState(true);
	const [isCompact, setCompact] = useState(false);

	const toggleEmojis = () => {
		setEmojis(!isEmojis);
	};

	const toggleCompact = () => {
		setCompact(!isCompact);
	};

	return (<MovesContainer>
			<MovesToggleBar>
				<BarButtons>
					<ToggleButton
						Icon={MdInsertEmoticon} onClick={toggleEmojis} disabled={isEmojis}
						title="Use pieces emojis"
					/>
					<ToggleButton
						Icon={BiText} onClick={toggleEmojis} disabled={!isEmojis}
						title="use pieces symbols"
					/>
				</BarButtons>
				<Divider/>
				<BarButtons>
					<ToggleButton
						Icon={GoListOrdered} onClick={toggleCompact} disabled={!isCompact}
					/>
					<ToggleButton
						Icon={IoMdList} onClick={toggleCompact} disabled={isCompact}
					/>
				</BarButtons>
			</MovesToggleBar>
			<StyledGameMoves showWithEmojis={isEmojis} showCompact={isCompact}/>
		</MovesContainer>
	);
};

export default Moves;

