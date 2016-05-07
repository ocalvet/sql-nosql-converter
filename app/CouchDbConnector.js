let request = require('request');

class CouchDbConnector {
  
  constructor(config) {
    this.config = config;
  }
  
  createDocument(db, document) {
    return new Promise((resolve, reject) => {
      request({
          method: 'POST',
          url: this.config.host + '/' + db,
          json: document
        }, (err, resp, body) => {
          console.log('here', err, resp, body);
          if (!err && (resp.statusCode >= 200 || resp.statusCode < 300)) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }
  
  getDocument(db, id) {
    // 38b0a8f71a8243b9b778d2758600039f
    return new Promise((resolve, reject) => {
      request
        .get({
          method: 'GET',
          uri: this.config.host + '/' + db + '/' + id,
          json: true
        }, (err, resp, body) => {
          if (!err && resp.statusCode == 200) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  }
  
  getDocuments(db) {
    return new Promise((resolve, reject) => {
      request
        .get({
          method: 'GET',
          uri: this.config.host + '/' + db + '/_all_docs',
          json: true
        }, (err, resp, body) => {
          if (!err && resp.statusCode == 200) {
            resolve(body.rows);
          } else {
            reject(err);
          }
        });
    });
  }
  
}

module.exports = CouchDbConnector;