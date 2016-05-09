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
  runQuery(query, params) {
    return new Promise((resolve, reject) => {
      this.con.query(query, params, (err, rows) => {
        if(err) {
          reject(err);
          return;
        };
        resolve(rows);
      });
    })
  }
  
  getUser(id) {
    return this.runQuery('SELECT * FROM user where userId = ?', [id]);
  }
  
  getCoachTeams(coachId) {
    return this.runQuery('select * from team where coach = ?', [coachId]);
  }
  
  getUserPassports(userId) {
     return this.runQuery('select * from passport where user = ?', [userId]);
  }
  
  endDbConnection() {
        this.con.end();
  }
}

module.exports = SQLConnector;