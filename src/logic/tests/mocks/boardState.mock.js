const getStateMock = (state) => {

	return {

		...state,
		updateWithNextMove: jest.fn(),
		getCachedCalculation: jest.fn(),
		cacheCalculation: jest.fn(),
	}
};

export default getStateMock;
