const getSquareName = (row, col) => {
	return `${String.fromCharCode(65 + col)}${row + 1}`;
};

export default getSquareName;
