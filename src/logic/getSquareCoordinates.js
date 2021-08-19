const getSquareCoordinates = (squareName) =>
	[squareName[0].toLowerCase().charCodeAt() - 97, parseInt(squareName[1]) - 1];

export default getSquareCoordinates;
