const getDistance = (squareA, squareB) =>
	Math.max(
		Math.abs(squareA[0] - squareB[0]),
		Math.abs(squareA[1] - squareB[1])
	);

export default getDistance;
