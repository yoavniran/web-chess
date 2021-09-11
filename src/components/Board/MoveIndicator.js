import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const takeIndicationCss = css`
  left: 50%;
  top: 50%;
  border-radius: 10%;

  box-shadow: inset 0 0 10px 1px ${({ theme }) => theme.indicators.allowedTake};
`;

const allowedIndicationCss = css`
  left: 50%;
  top: 50%;
  border-radius: 100%;

  box-shadow: inset 0 0 10px 1px ${({ theme }) => theme.indicators.allowed};
`;

const moveIndicatorAnimationVariants = {
	visible: ({ isTake }) => ({
		height: isTake ? "90%" : "30%",
		width: isTake ? "90%" : "30%",
		opacity: 1,
	}),
	hidden: { height: 0, width: 0, opacity: 0 },
	exit: { height: 0, width: 0, opacity: 0 },
	hover: ({ isTake }) => isTake ? {
		width: "85%",
		height: "85%",
		transition: { duration: 0.5 },
	} : {
		width: "20%",
		height: "20%",
		transition: { duration: 0.5 },
	},
};

const Indicator = styled(motion.div)`
  position: absolute;
  transform: translate(-50%, -50%);

  ${({ $isTake }) => $isTake ? takeIndicationCss : allowedIndicationCss}
`;

const MoveIndicator = ({ name, symbol, isTake }) => {
	return (
		<Indicator
			key={`${name}-${symbol}-moveIndicator`}
			initial="hidden"
			animate="visible"
			exit="exit"
			whileHover="hover"
			variants={moveIndicatorAnimationVariants}
			$isTake={isTake}
			custom={{ isTake }}
		/>
	);
};

export default MoveIndicator;

