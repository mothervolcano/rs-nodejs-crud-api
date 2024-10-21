import { v4 as uuidv4 } from 'uuid';

interface UserRecord {
	username: string;
	age: number;
	hobbies: string[];
}

interface UserEntry extends UserRecord {
	id: string;
}


export default class Users {
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

	populate(list: UserRecord[]) {
		list.forEach( d => {
			this._db.push({id: uuidv4(), ...d});
		});
	}

	findById(id: string) {
		const user = this.db.find( user => user.id === id);
		return user || null;
	}
}