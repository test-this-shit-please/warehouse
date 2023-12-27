import { describe, test, expect } from 'bun:test';
import { s2 } from '..';

const user = {
	firstName: 'John',
	lastName: 'Doe',
	profile: {
		age: 30,
		skills: ['nodejs', 'react', 'linux', { skillName: 'skill name' }],
		socials: {
			facebooks: 'facebook account',
		},
	},
};

const userSchemaValid = s2({
	firstName: s2.string(),
	'profile.age': s2.number(),
	// 'profile.skills.0': s2.defined(),
	'profile.skills': s2.array(),
});

const userSchemaInvalid = s2({
	firstName: s2.string(),
	'profile.age': s2.string(),
	//'profile.skills.0': s2.defined(),
	'profile.skills': s2.array(),
});

describe('smoke', async () => {
	test('valid schema', async (done) => {
		userSchemaValid(user);
		done();
	});

	test('invalid schema', async (done) => {
		expect(async () => {
			userSchemaInvalid(user);
		}).toThrow('profile.age');
		done();
	});
});
