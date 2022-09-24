const db = require("../../../db");

function idGenerator(lista) {
  let novoId;
  let ultimo = lista[lista.length - 1];
  if (!ultimo) {
    novoId = 0;
  } else {
    novoId = ultimo.id;
  }

  return ++novoId;
}

module.exports = {
  User: {
    profile(user) {
      return db.profiles.find((p) => p.id === user.profile );
    },
  },
  Query: {
    user(obj, args) {
      return db.users.find((db) => db.id === args.id);
    },
    users: () => db.users,
  },
  Mutation: {
    createUser(_, args) {
        const {email} = args;

        const userExist = db.users.some(u => u.email === email)

        if (userExist) {
            throw new Error(`This email already registered: (${email})`)
        }

        const newUser = {
            ...args,
            id: idGenerator(db.users),
            profile: 2
        }

        db.users.push(newUser)

        return newUser
    }
  }
};