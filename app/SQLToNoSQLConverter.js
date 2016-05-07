let SQLConnector = require('./SQLConnector');
let CouchDbConnector = require('./CouchDbConnector');

class SQLToNoSQLConverter {
  constructor(config) {
    this.sqlConnector = new SQLConnector(config.scoutlitSQL);
    this.couchDbConnector = new CouchDbConnector(config.scoutlitCouchDb);
    this.sqlConnector.getUser(47)
      .then((user) => {
        return this.couchDbConnector.createDocument('users', user);
      })
      .then((user) => {
        return this.couchDbConnector.getDocument('users', user.id);
      })
      .then((user) => {
        console.log('user', user);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }
}

module.exports = SQLToNoSQLConverter;