const mysql = require('mysql');

let connection = null

const getConnection = () => {
  if(connection){
    return connection
  }

  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cook-suggester'
  });


  connection = con;

  return con;
};

const executeQuery = (query, params = []) => {
  const con = getConnection()
  return new Promise((resolve, reject) => {
    con.query(query, params, (err, result)=>{
      if(err){
        reject(err)
      }

      resolve(result)
    })
  })
}

module.exports = {
  getConnection,
  executeQuery
}