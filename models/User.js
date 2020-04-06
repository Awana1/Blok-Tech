// mongoose inladen
const mongoose = require('mongoose');

// variable schema aanmaken voor mongoose.schema
let schema = mongoose.Schema

// schema maken met alle fields die nodig zijn voor de gebruiker/user.
const UserSchema = new schema({
  name: {type: String},
  email: {type: String},
  age: Number,
  password: {type: String},
  date: {type: Date, default: Date.now},
  hobbys: String,
  location: String,
  bio: String,
  school: String
})


// alle waardes van de bovenstaande schema inladen in variable 'Users'
const User = mongoose.model('User', UserSchema);

// 'Users' exporteren zodat we het in andere bestanden kunnen gebruiken
module.exports = User;
