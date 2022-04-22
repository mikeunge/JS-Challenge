import { update } from '../src/main';

test('apply update / change array object', () => {
	const baseObj = {
		a: {
			b: [
				{ _id: '5dc0ad700000000000000000', name: 'asdf1' },
				{ _id: '5dc0ad700000000000000001', name: 'asdf2' },
				{ _id: '5dc0ad700000000000000002', name: 'asdf3' }
			]
		},
		value: 'hui'
	};
	const changes = {
		"a.b[5dc0ad700000000000000000]": { "title": "asdf1-updated" }
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "title": "asdf1-updated" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			]
		},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('apply update / change array value', () => {
	const baseObj = {
		a: {
			b: [
				{ _id: '5dc0ad700000000000000000', name: 'asdf1' },
				{ _id: '5dc0ad700000000000000001', name: 'asdf2' },
				{ _id: '5dc0ad700000000000000002', name: 'asdf3' }
			]
		},
		value: 'hui'
	};
	const changes = {
		"a.b[5dc0ad700000000000000000].titleValue": "asdf1-updated"
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1", "titleValue": "asdf1-updated" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			]
		},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('add an array entry', () => {
	const baseObj = {
		a: {
			b: [
				{ _id: '5dc0ad700000000000000000', name: 'asdf1' },
				{ _id: '5dc0ad700000000000000001', name: 'asdf2' },
				{ _id: '5dc0ad700000000000000002', name: 'asdf3' }
			]
		},
		value: 'hui'
	};
	const changes = {
		"a.b[]": { "_id": "5dc0ad700000000000000003", "name": "co2" }
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" },
				{ "_id": "5dc0ad700000000000000003", "name": "co2" }
			]
		},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('remove array entry', () => {
	const baseObj = {
		a: {
			b: [
				{ _id: '5dc0ad700000000000000000', name: 'asdf1' },
				{ _id: '5dc0ad700000000000000001', name: 'asdf2' },
				{ _id: '5dc0ad700000000000000002', name: 'asdf3' }
			]
		},
		value: 'hui'
	};
	const changes = {
		"a.b[5dc0ad700000000000000001]": null
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			]
		},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('add regular object value', () => {
	const baseObj = {
		a: {
			b: [
				{ _id: '5dc0ad700000000000000000', name: 'asdf1' },
				{ _id: '5dc0ad700000000000000001', name: 'asdf2' },
				{ _id: '5dc0ad700000000000000002', name: 'asdf3' }
			]
		},
		value: 'hui'
	};
	const changes = {
		"a.c": "hallo"
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			],
			"c": "hallo"
		},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('update regular object value', () => {
	const baseObj = {
		a: {
			b: [
				{ _id: '5dc0ad700000000000000000', name: 'asdf1' },
				{ _id: '5dc0ad700000000000000001', name: 'asdf2' },
				{ _id: '5dc0ad700000000000000002', name: 'asdf3' }
			]
		},
		value: 'hui'
	};
	const changes = {
		"a.c": "hallo-changed"
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			],
			"c": "hallo-changed"
		},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});
