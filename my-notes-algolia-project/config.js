// config.js
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.NODE_KEY)
module.exports = {
  algoliaKey: process.env.NODE_KEY,
};