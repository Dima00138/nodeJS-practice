const EventEmitter = require('events');

class AccountManager extends EventEmitter {
    constructor() {
        super();
    }

    registerUser(username, password) {
        console.log(`Регистрация пользователя ${username}`);
        this.emit('register', username);
    }

    loginUser(username, password) {
        console.log(`Вход пользователя ${username}`);
        this.emit('login', username);
    }

    changePassword(username, newPassword) {
        console.log(`Изменение пароля для пользователя ${username}`);
        this.emit('passwordChange', username);
    }
}

const accountManager = new AccountManager();

accountManager.on('register', (username) => {
    console.log(`Уведомление администратору о регистрации нового пользователя: ${username}`);
});

accountManager.on('login', (username) => {
    console.log(`Уведомление администратору об успешном входе пользователя: ${username}`);
});

accountManager.on('passwordChange', (username) => {
    console.log(`Уведомление администратору о изменении пароля для пользователя: ${username}`);
});

accountManager.registerUser('newUser', 'pass123');
accountManager.loginUser('existingUser', 'oldPass456');
accountManager.changePassword('existingUser', 'newPass789');