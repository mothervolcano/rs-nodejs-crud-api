import cluster from 'cluster';
import http, { IncomingMessage, ServerResponse }  from 'http';
import { availableParallelism } from 'os';
import process from 'process';

import dotenv from 'dotenv';
dotenv.config();

import { initialUsers } from './db/collections';
import { populate } from './db/users';
import router from './router';

const PORT = process.env.PORT;

// populate(initialUsers);

const numCPUs = availableParallelism();

const createServer = () => {
	const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
		if (req.method === 'POST' || req.method === 'PUT') {
			let body = '';

			req.on('data', (chunk) => {
				body += chunk;
			});

			req.on('end', () => {
				try {
					const data = JSON.parse(body);
					router(req.url, req.method, res, data);

				} catch (error) {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify("Invalid data"));
				}
			})

		} else {
			router(req.url, req.method, res);
		}
	});

	server.listen(PORT, () => {
		console.log(`Worker ${process.pid} listening on port ${PORT}`)
	});

	return server;
}


if (cluster.isPrimary) {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

} else {
	createServer();
}

export { createServer };

