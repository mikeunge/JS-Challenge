import { update } from '../src/main';

test('add title to a.b[_id] and remove name', () => {
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

test('add titleValue to a.b[_id]', () => {
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

test('add new entry to array', () => {
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

test('remove from array', () => {
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
