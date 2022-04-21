# Coding Challenge Notes

## Understanding the problem

### Challenge specification

```txt
- normal objects, are just specified by the key.
- keys are seperated by "." e.g. root.path.subpath is referring to: { root: { path: { subpath: <>} } }
- array entries, can be specified by their root object (e.g. cvInfo.experiences: [..]) or by
  specifing a [ ] at the end. If the value between [ ] is empty, it means adding a new entry,
  if there is value inside [ ], look for the entry with the corresponding \_id.
  (fallback, if \_id is a number, use it as index - not needed right now)
- if a key is specified without a value (null / undefined), remove the entry.
  for arrays: remove this entry, for other objects just unset the value.
- if a path does not exist, create it.. depending on the specified path as object or as array. (see example 8)
- write one function that can handle all cases (and passes the pre defined tests)
- all input and output objects of the functions are JS objects
```

### Rules

1. We are provided with 2 inputs, one is the object to update, the other is a string (what to change)

2. We return the updated object

3. Keys are seperated by "." (root.path.subpath => { root: { path: { subpath: <> }}} ) 

4. Arrays are specified with [], they either are empty or filled

	1. When the array is filled, it always references the ID (_id)
	
	2. If the nothing is appended (eg. a[123] = {..}), we throw EVERYTHING out and add the new object to the array

	3. If something is appended, it indicates the key to change/add (eg. a[123].name: "new-name")

5. No value (null/undefiend), we remove the object

6. if a path doesn't exist, create it

### How am I going to solve this?

First of, I'm trying to destruct the input and make sense of it. After that, I'm checking for validity and if the provided key exists or if we should create it. In the best case, we update or create, otherwise, we return the untouched object and log some errors along the way.

## Walkthrough

First things first, setting up typescript (tsconfig) and test that the compiler works. After that, installing babel and jest to tests the code I write. Running the test, everything is wrong (as expected). Now, lets write some code to solve the first problem and satisfy jest. 
