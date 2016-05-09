let SQLConnector = require('./SQLConnector');
let CouchDbConnector = require('./CouchDbConnector');

class SQLToNoSQLConverter {
  constructor(config) {
    this.sqlConnector = new SQLConnector(config.scoutlitSQL);
    this.couchDbConnector = new CouchDbConnector(config.scoutlitCouchDb);
    this.user = undefined;
    console.log('getting the user');
    this.sqlConnector.getUser(47)
      // Create the user
      .then((users) => {
        console.log('creating the user');
        this.user = users[0];
        return this.couchDbConnector.createDocument('users', this.user);
      })
      // Get all the teams this coach coaches
      // .then(() => {
      //   console.log('getting the teams');
      //   return this.sqlConnector.getCoachTeams(this.user.UserID);
      // })
      // // Add all the teams to couchdb
      // .then((teams) => {
      //   console.log('creating the teams');
      //   this.user.teams = teams;
      //   var doc = { docs: teams };
      //   return this.couchDbConnector.createDocument('teams', doc, true);
      // })
      // Get all the passports for the user
      .then(() => {
        console.log('getting passports');
        return this.sqlConnector.getUserPassports(this.user.UserID);
      })
      // add all the passports to couchdb
      .then((passports) => {
        console.log('creating passports');
        this.user.passports = passports;
        var doc = { docs: passports };
        return this.couchDbConnector.createDocument('passports', doc, true);
      })
      // Get all the user_image for the user
      .then(() => {
        console.log('getting user_images');
        return this.sqlConnector.getUserImages(this.user.UserID);
      })
      // add all the user_images to couchdb
      .then((images) => {
        console.log('creating user_images');
        this.user.images = images;
        var doc = { docs: images };
        return this.couchDbConnector.createDocument('user_images', doc, true);
      })
      
      // And done...
      .then(() => {
        console.log('... done ...');
        this.sqlConnector.endDbConnection();
      })
      // Catch any errors
      .catch((err) => {
        console.log('error:', err);
        this.sqlConnector.endDbConnection();
      });
  }
}

module.exports = SQLToNoSQLConverter;