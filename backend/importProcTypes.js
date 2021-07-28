const neatCsv = require('neat-csv');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

fs.readFile('./proc_types_data/procTypes.csv', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const now = Date.now();
  const procTypes = await neatCsv(data); 
  const db = new sqlite3.Database('./collect.sqlite');
  procTypes.forEach(e => {
    console.log(e);
    if (( typeof e.code !== 'undefined' ) && 
      (typeof e.descr !== 'undefined')){
      console.log(`inserting: ${e.code} - ${e.descr}`);
      db.run(`INSERT INTO proctypes(code,descr,createdAt,updatedAt)
      VALUES('${e.code}','${e.descr}','${now}','${now}')`, function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
    }
  });
  db.close();
});



