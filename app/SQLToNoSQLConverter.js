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
      .then((user) => { return this.couchDbConnector.getDocument('users', user.id); })
      .then((user) => {
        return this.sqlConnector.getCoachTeams(user.UserID);
      })
      .then((teams) => {
        var doc = { docs: teams };
        return this.couchDbConnector.createDocument('teams', doc, true);
      })
      .then((teams) => {
        console.log('teams created', teams);
        this.sqlConnector.endDbConnection();
      })
      .catch((err) => {
        console.log('error:', err);
        this.sqlConnector.endDbConnection();
      });
  }
}

module.exports = SQLToNoSQLConverter;