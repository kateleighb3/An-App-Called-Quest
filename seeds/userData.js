const { User } = require('../models');

const userdata = [
{
    username: "Michaelangelo",
    email: "micky@hotmail.com",
    password: "password12345"
  },
  {
    username: "Donatello",
    email: "donny@gmail.com",
    password: "password12345"
  },
  {
    username: "Rafael",
    email: "rafa@aol.com",
    password: "password12345"
  }
]

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;