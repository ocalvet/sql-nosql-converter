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
        if(err) {
          reject(err);
          return;
        };
        console.log('Data received from users Db:\n', rows);
        resolve(rows[0]);
      });
    })
  }
  
  getCoachTeams(coachId) {
    return new Promise((resolve, reject) => {
      this.con.query('select * from team where coach = ?', [coachId], (err, rows) => {
        if(err) {
          reject(err);
          return;
        };
        console.log('Data received from teams Db:\n', rows);
        resolve(rows);
      });
    })
  }
  endDbConnection() {
        this.con.end();
  }
}

module.exports = SQLConnector;