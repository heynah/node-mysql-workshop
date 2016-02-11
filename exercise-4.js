var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("SELECT Account.id, AddressBook.accountId, Account.email, AddressBook.name FROM Account LEFT JOIN AddressBook on Account.id=AddressBook.accountId", 
function(err, rows){

  var accounts = rows.reduce(
    function(acc,curr){
      var idx = acc.findIndex(function (item) {
        return item.id === curr.id;
      });
      if (idx >-1) {
          acc[idx].accounts.push({
            name: curr.name
          });
      } else {
          acc.push({
            id: curr.id,
            email: curr.email,
            accounts: [{
              name: curr.name
            }]
        })
      }
      return acc;
      }, []
    );
    //console.log(accounts);
    console.log(JSON.stringify(accounts,null,2));
    connection.end();
    })
