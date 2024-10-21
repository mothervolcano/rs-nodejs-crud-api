import { ServerResponse } from 'http';
import { validate as validateUUID } from 'uuid';
import path from 'path';

import { users, validateUserData, findUserById, addNewUser, editUser, deleteUser } from './db/users';


export default function router(endpoint: string | undefined, method: string | undefined, res: ServerResponse, data?: {}) {
	// console.log("! REQ: ", req);
	// console.log("! RES: ", res);

	if (!endpoint) {
		res.writeHead(500);
		res.end('malformed request');
		return;
	}

	if (endpoint === '/api/users') {
		if (method === "GET") {
			const listOfUsers = users.map(d => `${d.username}: ${d.id}`).join('\n');

			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(`User's on the database: \n\n${listOfUsers}`);

		} else if (method === 'POST') {
			const validatedData = validateUserData(data);
			if (validatedData) {
				const addedUser = addNewUser(validatedData);
				res.writeHead(201, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(addedUser));
			} else {
				res.writeHead(400, { 'Content-Type': 'text/plain' });
				res.end('Missing or invalid user data');
			}
		}

	} else if (path.dirname(endpoint) === '/api/users') {
		const id = path.basename(endpoint);

		if (!id || id === '') {
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('Invalid query');
			return;
		}

		if (!validateUUID(id)) {
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('This is not a valid user id');
		}
		
		const retrievedUser = findUserById(id);
		
		if (!retrievedUser) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('User not found');
			return;
		}
		
		switch (method) {
			case 'GET':
				console.log("!! ", retrievedUser);
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(retrievedUser));
				break;
			case 'PUT':
				const validatedData = validateUserData(data);
				if (validatedData) {
					const updatedUser = editUser(id, validatedData);
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(updatedUser));
				} else {
					res.writeHead(400, { 'Content-Type': 'text/plain' });
					res.end('Missing or invalid user data');
				}
				break;
			case 'DELETE':
				const deletedUser = deleteUser(id);
				if (deletedUser) {
					res.writeHead(204, { 'Content-Type': 'text/plain' });
					res.end(`User ${deletedUser.username} has been removed from database`);
				} else {
					res.writeHead(500);
					res.end('An error occurred. Failed to delete user.');
				}
				break;
			default: 
				return;
		}

	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end(`Unknown endpoint`);
	}
}
