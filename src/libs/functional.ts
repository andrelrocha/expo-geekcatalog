import * as _ from "immutable";

// A utility function that returns its input unchanged.
export const identity = <T>(x: T) => x;

// A function to remove a key from an object.
export const remove = <C>(obj: C, key: keyof C) => removeIn(obj, [key]);

// A function to remove values from an object at the specified path.
export const removeIn = <C>(obj: C, arr: Iterable<unknown>) => _.removeIn(obj, arr);

// A function to calculate the sum of numbers in an array.
export const sum = (arr: number[]) => arr.reduce((x, y) => x + y, 0);