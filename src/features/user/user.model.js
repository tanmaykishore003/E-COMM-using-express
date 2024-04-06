export default class UserModel{
    constructor(id, name, email, password, type) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type
    }

    static signUp(name, email, password, type) {
        const newUser = new UserModel(
            users.length + 1,
            name, 
            email,
            password,
            type
        )

        users.push(newUser)
        return newUser
    }

    static signIn(email, password) {
        const user = users.find(u => u.email == email && u.password == password)
        return user
    }

    static getUsers() {
        return users
    }
}

let users = [
    {
        "id": "1",
        "name": "Seller User",
        "email": "admin@ecom.com",
        "password": "password1",
        "type": "seller"
    },
    {
        "id": "2",
        "name": "Customer User",
        "email": "customer@ecom.com",
        "password": "password1",
        "type": "seller"
    }
]