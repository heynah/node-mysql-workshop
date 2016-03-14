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
        
        var idE = acc.books.findIndex(function(item) {
          return item.accountId === curr.accountId;
        })
        //2nd If else that check if entry index is in books match=push ! = new object in array
        //****curr.entryId
          acc[idx].books.push({
            name: curr.name
          });
        
      } else {
          acc.push({
            id: curr.id,
            email: curr.email,
            books: [{
              name: curr.name,
              entries: []
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
