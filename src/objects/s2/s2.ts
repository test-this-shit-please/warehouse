import assert from 'node:assert';

const isNestedObject = (value: any) => {
	return typeof value === 'object' && !Array.isArray(value);
};

/**
 * Converts object to dot notation.
 * @param obj any object.
 * @param prev for recursive needs.
 * @returns flatten object
 */
export function flatten(obj: any, prev: string = '') {
	const flat: any = {};
	for (const key in obj) {
		const path = prev ? `${prev}.${key}` : key;
		const value = obj[key];
		flat[path] = value;
		if (isNestedObject(value)) {
			Object.assign(flat, flatten(value, path));
		}
	}
	return flat;
}

export type S2Validator = (obj: any) => number

/**
 * Creates schema.
 * @param schemaObj dot notation schema
 * @returns validated object parsed in safe manner (not implemented)
 */
export function s2(schemaObj: any = {}): S2Validator {
	const result: any = {};
	const validatorFn = (value = {}) => {
		const flattenValue = flatten(value);
		for (const key in schemaObj) {
			const validatorFn = schemaObj[key];
			try {
				validatorFn(flattenValue[key]);
				result[key] = flattenValue[key];
			} catch (e: any) {
				throw new Error(`${key} ${e.message}`.trim());
			}
		}
		return result;
	};
	return validatorFn;
}

/**
 * Checks if value is defined.
 * @returns value
 */
s2.defined = function () {
	return function isDefined(val: any) {
		assert(val !== undefined, 'value should be defined');
		return val;
	};
};

/**
 * Checks if value is string.
 * @returns value
 */
s2.string = function () {
	return function isString(val: any) {
		assert(typeof val === 'string', 'value should be string');
		return val;
	};
};

/**
 * Checks if value is number.
 * @returns value
 */
s2.number = function () {
	return function isNumber(val: any) {
		assert(typeof val === 'number', 'value should be number');
		return val;
	};
};

/**
 * Checks if value is array.
 * @returns value
 */
s2.array = function () {
	return function isArray(val: any) {
		assert(Array.isArray(val), 'value should be array');
	};
};

s2.responseOkJson = function () {
	const validator = (response: Response) => {
		assert(response.status === 200, 'response status should be 200');
	};
	return validator;
};
