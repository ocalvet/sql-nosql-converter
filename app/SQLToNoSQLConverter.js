let SQLConnector = require('./SQLConnector');

class SQLToNoSQLConverter {
  constructor(config) {
    console.log('Converter created', config);
    this.sqlConnector = new SQLConnector(config.scoutlitSQL);
    this.sqlConnector.getUser(47)
      .then((user) => console.log('User data', user.FirstName), (err) => console.log('error:', err));
  }
}

module.exports = SQLToNoSQLConverter;