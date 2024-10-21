import { v4 as uuidv4 } from 'uuid';

interface UserData {
	username: string;
	age: number;
	hobbies: string[];
}

interface UserEntry extends UserData {
	id: string;
}


export let users: UserEntry[] = [
];


export function populate(list: UserData[]) {
	list.forEach(d => {
		users.push({ id: uuidv4(), ...d });
	});
}

export function findUserById(id: string): UserEntry | null {
	const user = users.find(user => user.id === id);
	return user || null;
}

export function addNewUser(data: UserData): UserEntry {
	const id = uuidv4();
	const userEntry = {
		id,
		...data
	}

	users.push(userEntry);

	return userEntry;
}

export function editUser(id: string, data: UserData) {
	let userToUpdate = users.find( user => user.id === id);

	if (userToUpdate) {
		return Object.assign(userToUpdate, data);
	}
}	

export function deleteUser(id: string): UserEntry | null {
	const deletedUser = users.find( user => user.id === id);
	const updatedUsers = users.filter( user => user.id !== id );

	users = updatedUsers;

	return deletedUser || null;
}

export function deleteAll() {
	users = [];
}

export function validateUserData(data: any): UserData | null {
	if (!data.username || !data.age) {
		return null;
	}

	const hobbies = data.hobbies || [];

	return {
		username: data.username,
		age: data.age,
		hobbies
	}
}

export function replaceUsers(newUsers: UserEntry[]) {
	users = newUsers;
}	


