import { update } from '../src/main';

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

test('add title to a.b[_id] and remove name', () => {
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