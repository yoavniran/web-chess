import getSquareCoordinates from "./getSquareCoordinates";
import getDistance from "./getDistance";

const getClosenessSorter = (startCoordinates) =>
	(a, b) => {
		const aValue = getDistance(startCoordinates, getSquareCoordinates(a)),
			bValue = getDistance(startCoordinates, getSquareCoordinates(b));

		return aValue < bValue ? -1 : (bValue < aValue ? 1 : 0);
	};


const sortSquaresByClosest = (startSquare, squares) => {
	const startCoordinates = getSquareCoordinates(startSquare);
	return squares.sort(getClosenessSorter(startCoordinates));
};

export default sortSquaresByClosest;
