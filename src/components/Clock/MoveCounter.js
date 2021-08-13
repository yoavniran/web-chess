import React from "react";
import styled from "styled-components";

const CounterContainer = styled.div`
`;

const MoveCounter = ({ className, showTurn = true, move, turn }) => {

	return (
		<CounterContainer className={className}>
			{move} {turn && `(${turn.toUpperCase()})`}
		</CounterContainer>
	);
};

export default styled(MoveCounter)``;
