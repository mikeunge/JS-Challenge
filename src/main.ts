export const update = (baseObj: object, updateObj: object): object => {
	const set = (obj: object, path: string, value: string, chain: boolean, isArr: boolean, id: string): object => {
		// setValue :: set a value or delete it, depents on the value that gets passed
		const setValue = (obj: object, key: string, value: string | Array<string> | object | Array<null> | null) => {
			//@ts-ignore
			isEmpty(value) ? delete obj[key] : obj[key] = value;
		}

		// hasNext :: check if there is another element in the array (>1 elem in array)
		const hasNext = (arr: Array<string> | null): boolean => {
			return Array.isArray(arr)
				? arr.length > 1 ? true : false
				: false;
		}

		// isEmpty :: do we have a value or not
		const isEmpty = (e: string | null): boolean => {
			return e == '' || e === null || e === undefined ? true : false;
		}

		const pathArr = path.split('.');
		let currentPath = pathArr[0];
		let valueSet = false;

		if (isArr && Array.isArray(obj)) {
			if (isEmpty(id)) {  // check if we have an id, if not, append to array
				obj.push(value)
				return obj;
			}

			// loop over the array 
			for (let i = 0; i < obj.length; i++) {
				if (obj[i]._id == id) { // check if the id matches
					// is the value null/undefined? -- if so, we delete the array entry
					if (isEmpty(value)) {
						obj.splice(i, 1);
						return obj; 
					}

					// if we 'chain' behind the array, we need to SET/UPDATE a value, so we set the chained value as our key
					const key = chain ? currentPath : Object.keys(value)[0];
					const val = Object.values(value).join('')

					if (obj[i][key] || chain) {
						setValue(obj[i], key, val);
					} else {
						// create the new object in-place of the old one
						obj[i] = { '_id': id}
						setValue(obj[i], key, val);
					}
				}
			}
			valueSet = true;
		}

		// check for an array
		if (pathArr[0].split('[').length > 1) {
			isArr = true;
			// change the current path to the first element of the '[' split
			currentPath = pathArr[0].split('[')[0]
			if (pathArr[0].split('[')[1].length > 1) {
				id = pathArr[0].split('[')[1].split(']')[0];
			}
			if (hasNext(pathArr)) {
				chain = true;
			}
		}

		if (obj.hasOwnProperty(currentPath)) {
			const newPath = path.split('.');
			newPath.shift();
			//@ts-ignore
			set(obj[currentPath], newPath.join('.'), value, chain, isArr, id);
		}
		else {
			// check if we have another element to go deeper into AND if we didn't set a value
			if (hasNext(pathArr) && !valueSet) {
				//create a new empty object
				setValue(obj, currentPath, {})
			} else if(isArr && !valueSet) {
				// delete or set, depending on the value
				setValue(obj, currentPath, [value])
			} else if (!isArr && !valueSet) {
				// change/set the value 
				setValue(obj, currentPath, value);
			}
			valueSet = true;

			if (hasNext(pathArr)) {
				const newPath = path.split('.');
				newPath.shift();
				//@ts-ignore
				set(obj[currentPath], newPath.join('.'), value, chain, isArr, id);
			}
		}

		return obj;
	}

	// loop over the object that contains the chagnes
	for (const [k, v] of Object.entries(updateObj)) {
		set(baseObj, k, v, false, false, '');
	}

	return baseObj;
}