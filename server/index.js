// create a simple express server using es6 syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './database.js';
import  cors from 'cors';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();

app.use(cors({
  origin: '*', // use your actual domain name (or localhost), using * is not recommended
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
}))

app.use(express.json())

app.use('/public', express.static(process.cwd() + '/public'));

app.set('view engine', 'ejs');




app.get("/history", (req, res) => {
  connection.query(
    `select * from Produchistory`,
    (error, results, fields) => {
      if(error) throw error;
      console.log(results);
      res.send(results);
    }
  );
  
});

app.post('/' , (req , res) => {
  console.log(req.body);
  connection.query(
    `INSERT INTO Produchistory(the_date , rating)  VALUES ( curdate() , ${req.body.rating})`,
    (error, results, fields) => {
      if(error) throw error;
      console.log(results);
      res.status(200).send('insertd to back end successfully');
    }
  );
})



app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
})

