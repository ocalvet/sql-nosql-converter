let SQLConnector = require('./SQLConnector');
let CouchDbConnector = require('./CouchDbConnector');

class SQLToNoSQLConverter {
  constructor(config) {
    this.sqlConnector = new SQLConnector(config.scoutlitSQL);
    this.couchDbConnector = new CouchDbConnector(config.scoutlitCouchDb);
    this.user = undefined;
    this.games = undefined;
    console.log('getting the user');
    this.sqlConnector.getUser(47)
      // Create the user
      .then((users) => {
        console.log('creating the user');
        this.user = users[0];
        return this.couchDbConnector.createDocument('users', this.user);
      })
      // Get all the teams this coach coaches
      .then(() => {
        console.log('getting the teams');
        return this.sqlConnector.getCoachTeams(this.user.UserID);
      })
      // Add all the teams to couchdb
      .then((teams) => {
        console.log('creating the teams');
        this.user.teams = teams;
        var doc = { docs: teams };
        return this.couchDbConnector.createDocument('teams', doc, true);
      })
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
      // Get all the stats for the user
      .then(() => {
        console.log('getting stats');
        return this.sqlConnector.getUserStats(this.user.UserID);
      })
      // add all the user_images to couchdb
      .then((stats) => {
        console.log('creating stats');
        this.user.stats = stats;
        var doc = { docs: stats };
        return this.couchDbConnector.createDocument('stats', doc, true);
      })
      // Get all the stats for the user
      .then(() => {
        console.log('getting stats');
        return this.sqlConnector.getUserStats(this.user.UserID);
      })
      // add all the stats to couchdb
      .then((stats) => {
        console.log('creating stats');
        this.user.stats = stats;
        var doc = { docs: stats };
        return this.couchDbConnector.createDocument('stats', doc, true);
      })
      // Get all the games for each team
      .then(() => {
        console.log('getting games');
        var promises = [];
        this.user.teams.forEach((team) => {
          promises.push(this.sqlConnector.getTeamGames(team.TeamID));
        })
        return Promise.all(promises);
      })
      // add all the games to couchdb
      .then((collection) => {
        console.log('creating games');
        var data = [];
        collection.forEach((d) => {
          data = data.concat(d);
        });
        this.games = data;
        var doc = { docs: data };
        return this.couchDbConnector.createDocument('games', doc, true);
      })
      // Get all the team_images for each team
      .then(() => {
        console.log('getting team_images');
        var promises = [];
        this.user.teams.forEach((team) => {
          promises.push(this.sqlConnector.getTeamImages(team.TeamID));
        })
        return Promise.all(promises);
      })
      // add all the games to couchdb
      .then((collection) => {
        console.log('creating team_images');
        var data = [];
        collection.forEach((d) => {
          data = data.concat(d);
        });
        var doc = { docs: data };
        return this.couchDbConnector.createDocument('team_images', doc, true);
      })
      // Get all the stat_values for each game
      .then(() => {
        console.log('getting stat_value');
        var promises = [];
        this.games.forEach((game) => {
          promises.push(this.sqlConnector.getGameStatValues(game.GameID));
        })
        return Promise.all(promises);
      })
      // add all the stat_values to couchdb
      .then((collection) => {
        console.log('creating stat_value');
        var data = [];
        collection.forEach((d) => {
          data = data.concat(d);
        });
        console.log('total stats: ', data.length);
        var doc = { docs: data };
        return this.couchDbConnector.createDocument('stat_values', doc, true);
      })
      
      // live_stat
      // game_attribute_value
      // location
      // sport
      // game_atttributes
      // stat -1 coach
      
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