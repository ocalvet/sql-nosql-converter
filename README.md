# An application to get data from a mysql database into a couchdb database

## run
```
$ npm install
$ node index.js
```

# config.js
Add a config.js file to the root of the folder using the following format:

```
module.exports = {
  scoutlitSQL: {
    user: 'db_user',
    password: 'db_password',
    database: 'db_name',
    host: 'db_host'
  }
}
```