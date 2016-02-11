var mysql = require('mysql');
var colors = require('colors/safe');
 
var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("SELECT * from Account limit 5", function(err, rows){
  rows.forEach(function(row) {
    console.log(colors.bold('#' + row.id + ' : ' + row.email));
      });
  connection.end();
})