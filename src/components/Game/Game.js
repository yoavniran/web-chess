import React from "react";
import { ThemeProvider } from "styled-components";
import GameProvider from "./GameProvider";
import { defaultTheme } from "themes";

/**
 *
 * @param {GameProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const Game = (props) => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GameProvider {...props} />
		</ThemeProvider>
	);
};

export default Game;
