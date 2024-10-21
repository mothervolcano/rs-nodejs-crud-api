import http from 'http';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

import Users from './db/users';
import { initialUsers } from './db/collections';

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
	
	console.log("! REQ: ", req.url);
	
	const users = new Users();
	users.populate(initialUsers);

	if ( req.url === '/users') {

		if (req.method === "GET") {
			const listOfUsers = users.db.map( d => `${d.username}: ${d.id}` ).join('\n');
			res.writeHead(200, { 'Content-Type': 'text/plain'});
			res.end(`User's on the database: \n\n${listOfUsers}`);
		}

	} else if ( path.dirname(req.url) === '/users' ) {

		console.log("> ", path.basename(req.url));

		const id = path.basename(req.url);

		if (!id || id === '') {
			res.writeHead(400, {'Content-Type': 'text/plain'});
			res.end('Invalid query');
			return;
		}

		const retrievedUser = users.findById(id);

		if (!retrievedUser) {
			res.writeHead(404, { 'Content-Type': 'text/plain'});
			res.end('User not found');
			return;
		}

		res.writeHead(200, { 'Content-Type': 'text/plain'});
		res.end(JSON.stringify(retrievedUser));

	} else {
		res.writeHead(200, { 'Content-Type': 'text/plain'});
		res.end(`Welcome to this app`);
	}

});

server.listen(PORT);

console.log(`Server running on http://localhost:${PORT} ... `);

