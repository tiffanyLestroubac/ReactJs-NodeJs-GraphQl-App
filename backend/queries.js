const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tiffany',
  host: 'localhost',
  database: 'strapi',
  password: 'password',
  port: 5432,
})
console.log('ok');
const getAllPlanets = (request, response) => {
    pool.query('SELECT * FROM Planet', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  module.exports = {
    getAllPlanets
  }