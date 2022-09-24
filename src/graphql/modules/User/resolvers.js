const db = require("../../../db");

const idGenerator = (lista) => {
  let novoId;
  let ultimo = lista[lista.length - 1];
  if (!ultimo) {
    novoId = 0;
  } else {
    novoId = ultimo.id;
  }

  return ++novoId;
}

const deleteUserByFilter = ({id, email}) => {
  let user

  if (id) {
    user = db.users.find((u) => u.id == id) 
    db.users = db.users.filter(u => u.id !== id)
  } else {
    user = db.users.find((u) => u.email == email) 
    db.users = db.users.filter(u => u.email !== email)
  }
  
  return !!user
}

module.exports = {
  User: {
    profile(user) {
      return db.profiles.find((p) => p.id === user.profile );
    },
  },
  Query: {
    user(obj, {data}) {
      return db.users.find((db) => db.id === data.id);
    },
    users: () => db.users,
  },
  Mutation: {
    createUser(_, {data}) {
        const {email} = data;

        const userExist = db.users.some(u => u.email === email)

        if (userExist) {
            throw new Error(`This email already registered: (${email})`)
        }

        const newUser = {
            ...data,
            id: idGenerator(db.users),
            profile: 2
        }

        db.users.push(newUser)

        return newUser
    },
    updateUser(_, {id, data}) {
      const user = db.users.find((u) => u.id === id)
      const userIndex = db.users.findIndex((u) => u.id === id)

      if (!user) {
        throw new Error(`User didnt found!`)
    }

      const updatedUser = {
        ...user,
        ...data
      }

      db.users.splice(userIndex, 1, updatedUser)

      return updatedUser
    },
    deleteUser(_, {filtro}) {
      return deleteUserByFilter(filtro)
    }

  }
};