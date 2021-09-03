const getDistance = (coordA, coordB) =>
	Math.max(
		Math.abs(coordA[0] - coordB[0]),
		Math.abs(coordA[1] - coordB[1])
	);

export default getDistance;
