// mongoose inladen
const mongoose = require('mongoose');


// schema maken met alle fields die nodig zijn voor de gebruiker/user. 
// hier geven we ook aan wat verplicht is voor de gebruiker.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// alle waardes van de bovenstaande schema inladen in variable 'Users'
const User = mongoose.model('User', UserSchema);

// 'Users' exporteren zodat we het in andere bestanden kunnen gebruiken
module.exports = User;