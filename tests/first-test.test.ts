import { createServer } from '../src/index';
import { initialUsers } from '../src/db/collections';
import { users, deleteAll, replaceUsers } from '../src/db/users';
import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';

describe('testing the tester', () => {
	let server: any;

	beforeEach(() => {
		server = createServer();
	});

	afterEach((done) => {
		server.close(done);
		deleteAll();
	})

	test('Retrieves a list with all the users in the database', async () => {
		const res = await request(server).get('/api/users');
		expect(res.statusCode).toBe(200);
		expect(users).toHaveLength(0);
	});

	test('A new user is added to the database', async () => {
		const newUser = {
			username: "Captain Nemo",
			age: 45,
			hobbies: ["underwater exploration", "building submarines"]
		}

		const res = await request(server).post('/api/users').send(newUser);
		expect(res.statusCode).toBe(201);
		expect(users).toHaveLength(1);
		expect(res.body).toHaveProperty('username', "Captain Nemo")
	});

	test('An existing user is retrieved', async () => {
		const id = uuidv4()
		const existingUser = {
			id,
			username: "Captain Nemo",
			age: 45,
			hobbies: ["underwater exploration", "building submarines"]
		}

		replaceUsers([existingUser]);

		const res = await request(server).get(`/api/users/${id}`);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(existingUser);
		expect(res.body).toHaveProperty('id', id);
		expect(res.body).toHaveProperty('username', "Captain Nemo");
	});

	test('An existing user is updated', async () => {
		const id = uuidv4()
		const existingUser = {
			id,
			username: "Captain Nemo",
			age: 45,
			hobbies: ["underwater exploration", "building submarines"]
		}

		replaceUsers([existingUser]);

		const userUpdate = {
			username: "Captain Nemo",
			age: 50,
			hobbies: ["underwater exploration", "building submarines", "steam punk"]
		}

		const res = await request(server).put(`/api/users/${id}`).send(userUpdate);
		
		expect(res.statusCode).toBe(200);

		const expectedUser = {
			...existingUser,
			...userUpdate
		}

		expect(res.body).toEqual(expectedUser);
	});

	test('An existing user is deleted', async () => {
		const id = uuidv4()
		const existingUser = {
			id,
			username: "Captain Nemo",
			age: 45,
			hobbies: ["underwater exploration", "building submarines"]
		}

		replaceUsers([existingUser]);

		const res = await request(server).delete(`/api/users/${id}`);

		expect(res.statusCode).toBe(204);
		expect(users).toHaveLength(0);
	});

}); 