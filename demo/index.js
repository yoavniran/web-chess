import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { Game } from "../src/index";


const DemoContainer = styled.main`
  width: 900px;
  height: 900px;
`;

const Demo = () => {

	return (
		<DemoContainer>
			<Game/>
		</DemoContainer>
	);
};

render(<Demo/>
	, document.getElementById("app"));


if (module["hot"]) {
	module["hot"].accept();
}
