// create a simple express server using es6 syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './database.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();


app.use('/public', express.static(process.cwd() + '/public'));

app.set('view engine', 'ejs');



app.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM `Produchistory`",
    (error, results, fields) => {
      if(error) throw error;
      console.log(results);
      res.render("index" , {results : results});
    }
  );
  
});





app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
})

