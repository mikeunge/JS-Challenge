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

First things first, setting up typescript and test that the compiler works. After that, installing babel and jest to tests the code. Running the test, everything is wrong (as expected). Now, lets write some code to solve the first problem and satisfy the tests. 

The first challenge was to get a grip on WHAT I actually need to do. So I made some small drawings on how to destructure the array path. This was more work than expected, nothing worked. After some research I came across libraries that do the exact things I needed (jackpot!). I now knew that I needed to create a recursive function to destructure the provided object, sounds easy right? It wasn't.

I kept getting errors over errors and nothing seemed to work so I got back to the drawing board. After some time spent thinking about it, I began to break the problem down in smaller sections.

At first I need to split the object path by the "." character, done. Now I can access the object with the first [0] element, so I can check if the key exists or not, if not, we can now create a new key/object. For the first test, the key exists and the next key is an array, how do I check now if the next/current key is an array? Split again! Now that I got the character (b) I can check if the key exists, and it does, nice.

Ok, I got the key and I know the values for this key is an array. All arrays are identifiable with the provided _id, now I need to get the id AND priovided it for the next iteration. I pass the id as well as a boolean that the next/current element is an array.

Know the code is a mess and the tests also fail ... But yeah, gotta keep going. Next thing is to loop over the array elements to check if the element with the _id exists, pretty straigth forward. Know I need to update the object with the new value and get rid of the old one (name). I check if the key (title) exists in the object, it doesn't, so I create a new object with the same id in the same spot but with the new title key and value.

Done. The first test passes! 🎉 
10 more to go!

The next test was pretty easy, first I check if something is "chained" behind the array, this indicates that I need to ADD a new key to the object. First I check if something is "chained", if so, I simply check if a "chain" is set after the "]" character. Next I set the flag so that in the next iteration the program knows that it should not create a new object because the key doesn't exist but instead add the new key with it's value to the array object. And that's test 2.

For the 3rd test I simply added a check if the if the id exists or not, this predicts if we append to the array or if we edit an entry.

The 4th test was also quite easy because I can simply check if the id matches and then use splice to remove the object from the array.

Test number 5 was a bit more tricky but in the end I simply added an else clause for checking if the key exists in the object hierarchy, if not, it's going to be created and the value gets also set.

Number 6 worked out of the box because of the if/else check for the existing key.

The 7th test was actually hard because I didn't know how to unset the key/value from the object. After some googling I found that I can use the 'delete' keyword before the object[key] to delete it. After that it was just playing around with variable checks till I found something that worked.

Number 8 was quite easy because I got the whole setup for going down the hierarchy.

Multiple operations (test 9) worked also smooth because I call the function with each key, so every object got called after the other one.

Number 10 and 11 were the hardest ones. Number 10 took ages because I needed to refactor the code and add multiple checks and changed small parts from the already existing logic (because of this previous tests failed...). It was a lot of try/error till I got it right with not only going down the object dom but also creating arrays in said dom.

10 done! one to go, but, test number 11 was pure chaos. Because till know I got either an object path or an array, now we need to walk threw an object. After some refactoring and debugging I finally found a working solution (that didn't break all tests). I needed to check for the type (object) AND check if it's an array or not. 
