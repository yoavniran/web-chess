import React from "react";
import { ThemeProvider } from "styled-components";
import GameProvider from "./GameProvider";
import GameBoard from "./GameBoard";
import { defaultTheme } from "themes";

const Game = (props) => {

	//TODO: wrap with GameContext

	return (
		<ThemeProvider theme={defaultTheme}>
			<GameProvider {...props} />
		</ThemeProvider>
	);
};

export default Game;
