var mysql = require('mysql');
var colors = require('colors/safe');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("SELECT Account.id, Account.email, AddressBook.id AS addressBookId, AddressBook.name, Entry.id AS entryId, Entry.firstName, Entry.lastName FROM Entry JOIN AddressBook ON Entry.addressbookId=AddressBook.id JOIN Account ON AddressBook.accountId=Account.id", 
function(err, rows){

  var accounts = rows.reduce(
    function(acc,curr){
      var idx = acc.findIndex(function (item) {
        return item.accountId === curr.accountId;
      });
      if (idx >-1) {
          acc[idx].books.push({
            name: curr.name
          });
      } else {
          acc.push({
            accountId: curr.accountId,
            email: curr.email,
            books: [{
              name: curr.name
            }]
        })
      }
      return acc;
      }, []
    );

    console.log(JSON.stringify(accounts,null,2));
    connection.end();
    })
