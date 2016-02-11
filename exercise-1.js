var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

/*connection.query("SHOW databases", function(err, results) {
var table = new Table({
    head: ['Databases']
  , colWidths: [50]
});
results.forEach(function(result){
 
  console.log(result);
  console.log(result.Database);
  console.log(typeof result.Database)
  table.push([result.Database]);  //covert a string to an array (in line)
})



console.log(table.toString());
      
      
  
  //console.log(results)
  connection.end();
});
*/

connection.query("SHOW databases", function(err, results){
  var table = new Table({
    head: ['Databases'],
    colWidths: [30]
  });
  //console.log(typeof results);
results.forEach(function(result){
  table.push([result.Database]);
})  
  
  
  console.log(table.toString());
  connection.end();
})





  // $ npm install cli-table --save
  // npm WARN package.json node-mysql-workshop@0.0.1 No repository field.
  // cli-table@0.3.1 node_modules/cli-table
  // └── colors@1.0.3