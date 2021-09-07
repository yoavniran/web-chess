import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { CHECK_TYPES } from "../../consts";

const checkIndicationCss = css`
	height: 100%;
	width: 100%;
  box-shadow: inset 0 0 10px 1px ${({ theme }) => theme.indicators.check};
`;

const mateIndicationCss = css`
  box-shadow: inset 0 0 20px 4px ${({ theme }) => theme.indicators.mate};
`;

const checkIndicatorAnimationVariants = {
	visible: {
		opacity: "100%",
	},
	hidden: { opacity: 0 },
	exit: { opacity: 0 },
	hover: {
		opacity: "80%",
		transition: { duration: 0.5 },
	}
};

const Indicator = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
	
  ${({ $isMate }) => $isMate ? mateIndicationCss : checkIndicationCss}
`;

const CheckIndicator = ({ name, check }) => {
	const isMate = check === CHECK_TYPES.MATE;

	return (
		<Indicator
			key={`${name}-checkIndicator`}
			$isMate={isMate}
			initial="hidden"
			animate="visible"
			exit="exit"
			whileHover="hover"
			variants={checkIndicatorAnimationVariants}
			custom={{ isMate }}
		/>
	);
};

export default CheckIndicator;

