var mysql = require("mysql");
// var settings = require('./settings.json');
var db;


function connectDatabase() {
  if (!db) {
    db = mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "",
      database: "bizky",
      multipleStatements: true,
      dateStrings: "Date"
    });

    db.connect(function (err) {
      if (!err) {
        console.log("Database is connected!");
      } else {
        console.log("Error connecting database!");

      }
    });
  }
  return db;
}

module.exports = connectDatabase();
