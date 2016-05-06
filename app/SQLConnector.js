var mysql = require("mysql");

class SQLConnector {
  constructor(config) {
    this.con = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    });
  }
  
  getUser(id) {
    return new Promise((resolve, reject) => {
      this.con.query('SELECT * FROM user where userId = ?', [id], (err, rows) => {
        this.con.end();
        if(err) {
          reject(err);
          return;
        };
        console.log('Data received from Db:\n', rows);
        resolve(rows[0]);
      });
    })
  }
}

module.exports = SQLConnector;