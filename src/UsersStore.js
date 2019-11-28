import { usersStorageKey } from './constants';

export default class UsersStore {
    constructor() {
        const usersStr = localStorage.getItem(usersStorageKey);
        this.users = usersStr ? JSON.parse(usersStr) : [];
    }

    add(user) {
        if (user && user.email && !this.findUser(user.email)) {
            this.users = [...this.users, user];
            localStorage.setItem(usersStorageKey, JSON.stringify(this.users));
        }
    }

    findUser(email) {
        return this.users.find(u => u.email === email);
    }

    update(user) {
        if (user && user.email && this.findUser(user.email)) {
            this.users = [...this.users.filter(u => u.email !== user.email), user];
            localStorage.setItem(usersStorageKey, JSON.stringify(this.users));
        }
    }
}

