"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users_1 = __importDefault(require("./db/users"));
const collections_1 = require("./db/collections");
const PORT = process.env.PORT;
const server = http_1.default.createServer((req, res) => {
    console.log("! REQ: ", req.url);
    const users = new users_1.default();
    users.populate(collections_1.initialUsers);
    if (req.url === '/users') {
        if (req.method === "GET") {
            const listOfUsers = users.db.map(d => `${d.username}: ${d.id}`).join('\n');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`User's on the database: \n\n${listOfUsers}`);
        }
    }
    else if (path_1.default.dirname(req.url) === '/users') {
        console.log("> ", path_1.default.basename(req.url));
        const id = path_1.default.basename(req.url);
        if (!id || id === '') {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid query');
            return;
        }
        const retrievedUser = users.findById(id);
        if (!retrievedUser) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(retrievedUser));
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Welcome to this app`);
    }
});
server.listen(PORT);
console.log(`Server running on http://localhost:${PORT} ... `);
