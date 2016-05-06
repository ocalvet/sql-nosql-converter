let SQLConnector = require('./SQLConnector');
let CouchDbConnector = require('./CouchDbConnector');

class SQLToNoSQLConverter {
  constructor(config) {
    this.sqlConnector = new SQLConnector(config.scoutlitSQL);
    this.couchDbConnector = new CouchDbConnector(config.scoutlitCouchDb);
    this.sqlConnector.getUser(47)
      .then((user) => {
        console.log('User data', user.FirstName);
        // this.couchDbConnector.createDocument('users', user);
        return this.couchDbConnector.getDocuments('stats');
      })
      .then((stats) => {
        return this.couchDbConnector.getDocument('stats', stats[0].id);
      })
      .then((stat) => {
        console.log('stat', stat);
      })
      .catch((err) => console.log('error:', err));
  }
}

module.exports = SQLToNoSQLConverter;