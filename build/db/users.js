"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Users {
    _db = [
        {
            id: "123e4567-e89b-12d3-a456-426614174000",
            username: "Winston Smith",
            age: 39,
            hobbies: ["writing in a diary", "rebelling against dystopia"]
        },
        {
            id: "123e4567-e89b-12d3-a456-426614174002",
            username: "Captain Nemo",
            age: 45,
            hobbies: ["underwater exploration", "building submarines", "steam punk"]
        },
        {
            id: "123e4567-e89b-12d3-a456-426614174003",
            username: "Lyra Belacqua",
            age: 11,
            hobbies: ["reading alethiometers", "adventuring"]
        },
    ];
    constructor() {
    }
    get db() {
        return this._db;
    }
    populate(list) {
        list.forEach(d => {
            this._db.push({ id: (0, uuid_1.v4)(), ...d });
        });
    }
    findById(id) {
        const user = this.db.find(user => user.id === id);
        return user || null;
    }
}
exports.default = Users;
