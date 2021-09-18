/**
 *
 * @param {string} key
 */

//getting data to localStorage with key
export const loadData = (key) => {
	try {
		let data = localStorage.getItem(key);
		//converting string to object using JSON.parse()
		data = JSON.parse(data);
		return data;
	} catch (er) {
		return undefined;
	}
};

/**
 *
 * @param {string} key
 * @param {any} data
 */

//storing data to localStorage with key and value

export const saveData = (key, data) => {
	// storing data to as a string using JSON.stringify()

	localStorage.setItem(key, JSON.stringify(data));
};
