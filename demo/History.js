import React, { useState } from "react";
import styled from "styled-components";
import { GameHistory } from "../src";
import { MdInsertEmoticon } from "react-icons/md";
import { BiText } from "react-icons/bi";
import { GoListOrdered } from "react-icons/go";
import { IoMdList } from "react-icons/io";

const HistoryContainer = styled.div`
  width: 300px;
`;

const StyledGameHistory = styled(GameHistory)`

`;

const HistoryToggleBar = styled.div`
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

  svg {
    color: ${({ disabled }) => disabled ? "#959494" : "#191818"}
  }
`;

const ToggleButton = ({ Icon, onClick, disabled, ...props }) => {

	return (<StyledButton
		onClick={onClick}
		disabled={disabled || undefined}
	>
		<Icon {...props} />
	</StyledButton>);
};

const Divider = styled.div`
  height: 75%;
  width: 0;
  border: solid 1px rgba(0, 0, 0, 0.64);
`;

const History = () => {
	const [isEmojis, setEmojis] = useState(true);
	const [isCompact, setCompact] = useState(false);

	const toggleEmojis = () => {
		setEmojis(!isEmojis);
	};

	const toggleCompact = () => {
		setCompact(!isCompact);
	};

	return (<HistoryContainer>
			<HistoryToggleBar>
				<BarButtons>
					<ToggleButton
						Icon={MdInsertEmoticon} onClick={toggleEmojis} disabled={isEmojis}
						size={32} title="Use pieces emojis"
					/>
					<ToggleButton
						Icon={BiText} onClick={toggleEmojis} disabled={!isEmojis} size={32}
						title="use pieces symbols"
					/>
				</BarButtons>
				<Divider/>
				<BarButtons>
					<ToggleButton
						Icon={GoListOrdered} onClick={toggleCompact} disabled={!isCompact}
						size={32}
					/>
					<ToggleButton
						Icon={IoMdList} onClick={toggleCompact} disabled={isCompact} size={32}
					/>
				</BarButtons>
			</HistoryToggleBar>
			<StyledGameHistory showWithEmojis={isEmojis} showCompact={isCompact}/>
		</HistoryContainer>
	);
};

export default History;

