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

test('unset regular object value on root level', () => {
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
		"value": null
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			]
		}
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('unset regular object value NOT on root level', () => {
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
		"a.b": null
	};
	const updatedObj = {
		"a": {},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('multiple operations at one time', () => {
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
		"value": null,
		"something": "anything",
		"a.c": "hallo"
	};
	const updatedObj = {
		"a": {
			"c": "hallo",
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			]
		},
		"something": "anything"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('apply array update and create underyling array or object', () => {
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
		"x[]": "asdfX",
		"v.x[]": "asdfV",
		"v.m.l": "asdf-val"
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			]
		},
		"x": ["asdfX"],
		"v": {
			"x": ["asdfV"],
			"m": {
				"l": "asdf-val"
			}
		},
		"value": "hui"
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});

test('apply user image update', () => {
	const baseObj = {
		a: {
			b: [
				{ _id: '5dc0ad700000000000000000', name: 'asdf1' },
				{ _id: '5dc0ad700000000000000001', name: 'asdf2' },
				{ _id: '5dc0ad700000000000000002', name: 'asdf3' }
			]
		},
		value: 'hui',
		images: {
			thumbnail: 'http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg',
			small: 'http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg',
			medium: 'http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg',
			large: 'http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg',
			xlarge: 'http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg'
		}
	};
	const changes = {
		"images": {
			"thumbnail": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"small": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"medium": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"large": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"xlarge": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg"
		}
	};
	const updatedObj = {
		"a": {
			"b": [
				{ "_id": "5dc0ad700000000000000000", "name": "asdf1" },
				{ "_id": "5dc0ad700000000000000001", "name": "asdf2" },
				{ "_id": "5dc0ad700000000000000002", "name": "asdf3" }
			]
		},
		"value": "hui",
		"images": {
			"thumbnail": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"small": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"medium": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"large": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
			"xlarge": "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg"
		}
	}
	expect(update(baseObj, changes)).toMatchObject(updatedObj);
});