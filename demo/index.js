import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { Game, GameBoard, GameMoveCounter } from "../src/index";

const DemoContainer = styled.main`
	display: flex;
	flex-wrap: wrap;
	
`;

const BoardContainer = styled.div`
  width: 900px;
  height: 900px;
  margin-right: 20px;
`;

const StyledGameBoard = styled(GameBoard)`
`;

const StyledGameMoveCounter = styled(GameMoveCounter)`
  font-size: 20px;
	font-weight: bold;
	background-color: black;
	color: white;
	max-height:40px;
	padding: 10px;
`;

const Demo = () => {

	return (
		<Game>
			<DemoContainer>
				<BoardContainer>
					<StyledGameBoard/>
				</BoardContainer>
				<StyledGameMoveCounter />
			</DemoContainer>
		</Game>
	);
};

render(<Demo/>
	, document.getElementById("app"));


if (module["hot"]) {
	module["hot"].accept();
}
