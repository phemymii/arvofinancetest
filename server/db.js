// const Pool = require("pg").Pool

// const pool = new Pool({
//     user: "postgres",
//     password: "9090",
//     host: "locahost",
//     port: 5432,
//     database: 'db'
//   })
  const {Pool, Client} = require('pg')
  const connectionString = 'postressql://postgres:9090@localhost:5432/db'
  const client = new Client({
    connectionString: connectionString
  })
  
//   client.query('SELECT * from user', (err, res)=>{
//     console.log(err, res)
//   })
  client.connect()

// module.exports = pool
module.exports = client