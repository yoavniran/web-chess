import React, { useCallback, useState } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { ResizableBox } from "react-resizable";
import { Game, GameBoard, GameMoveCounter } from "../src/index";
import Moves from "./Moves";

import "react-resizable/css/styles.css";

const INIT_BOARD_SIZE = 900;

const DemoContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
`;

const BoardContainer = styled.div`
  margin-right: 20px;
`;

const StyledGameBoard = styled(GameBoard)`
`;

const StyledGameMoveCounter = styled(GameMoveCounter)`
  font-size: 20px;
  font-weight: bold;
  background-color: black;
  color: white;
  max-height: 40px;
  padding: 10px;
`;

const SideBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Demo = () => {
	return (
		<Game>
			<DemoContainer>
				<BoardContainer>
					<ResizableBox
						lockAspectRatio
						height={INIT_BOARD_SIZE}
						width={INIT_BOARD_SIZE}
						minConstraints={[500, 500]}
						maxConstraints={[1100, 1100]}
						resizeHandles={["se"]}
					>
						<StyledGameBoard/>
					</ResizableBox>
				</BoardContainer>
				<SideBoardContainer>
					<StyledGameMoveCounter/>
					<Moves/>
				</SideBoardContainer>
			</DemoContainer>
		</Game>
	);
};

render(<Demo/>,
	document.getElementById("app"));


if (module["hot"]) {
	module["hot"].accept();
}
