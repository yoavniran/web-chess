export const getPlyClassName = (color) =>
	`history-ply ${color}-ply`;

export const itemAnimationVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const getIsActivePly = (move, turn, lastHistoryPly) => {
	return !lastHistoryPly || lastHistoryPly[0] >= move && lastHistoryPly[1] >= turn;
};
