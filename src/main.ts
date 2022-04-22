export const update = (baseObj: object, updateObj: object): object => {
	function set (obj: object, path: string, value: string, chain: boolean, isArr: boolean, id: string) {
		const pathArr = path.split('.');
		let currentPath = pathArr[0];

		if (isArr) {
			isArr = false;
			if (id == '' || id == null) {  // check if we have an id, if not, append to array
				if (Array.isArray(obj)) {
					obj.push(value)
				}
				return obj;
			}
			//@ts-ignore
			for (let i = 0; i < obj.length; i++) {
				//@ts-ignore
				if (obj[i]._id == id) { // check if the id matches

					if (value == null) {
						if (Array.isArray(obj)) {
							obj.splice(i, 1);
						}
						return obj; 
					}

					let key;
					if (chain) {
						// if we 'chain' behind the array, we need to SET/UPDATE a value, so we set the chained value as our key
						key = pathArr[pathArr.length - 1]
					} else {
						key = Object.keys(value)[0]
					}

					const val = Object.values(value).join('')
					//@ts-ignore
					if (obj[i][key] && !chain) {
						//@ts-ignore
						obj[i][key] = val
					} else if (chain){
						//@ts-ignore
						obj[i][key] = val
					} else {
						// create the new object in-place of the old one
						//@ts-ignore
						obj[i] = { '_id': id}
						//@ts-ignore
						obj[i][key] = val
					}
				}
			}
		}

		// check for an array
		if (pathArr[0].split('[').length > 1) {
			isArr = true;
			// change the current path to the first element of the '[' split
			currentPath = pathArr[0].split('[')[0]
			if (pathArr[0].split('[')[1].length > 1) {
				id = pathArr[0].split('[')[1].split(']')[0];
			}
			if (pathArr.length > 1) {
				chain = true;
			}
		}

		if (obj.hasOwnProperty(currentPath)) {
			const newPath = path.split('.');
			newPath.shift();
			//@ts-ignore
			set(obj[currentPath], newPath.join('.'), value, chain, isArr, id);
		}

		return obj;
	}

	// loop over the object that contains the chagnes
	for (const [k, v] of Object.entries(updateObj)) {
		set(baseObj, k, v, false, false, '');
	}

	return baseObj;
}