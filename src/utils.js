export const addArrayToSet = (array, set) => array.forEach(set.add.bind(set));

export const switchReturn = (params, ...cases) => {
	let caseResult;

	cases.find((caseFn) => {
		caseResult = caseFn(...params) ?? false;
		return caseResult;
	});

	return caseResult === false ? undefined : caseResult;
};

