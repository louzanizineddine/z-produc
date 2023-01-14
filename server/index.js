// create a simple express server using es6 syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './database.js';
import bcrypt from 'bcrypt';
import cors from 'cors';

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
      if (error) throw error;
      console.log(results);
      res.send(results);
    }
  );

});

// app.post('/' , (req , res) => {
//   console.log(req.body);
//   connection.query(
//     `INSERT INTO Produchistory(the_date , rating)  VALUES ( curdate() , ${req.body.rating})`,
//     (error, results, fields) => {
//       if(error) throw error;
//       console.log(results);
//       res.status(200).send('insertd to back end successfully');
//     }
//   );
// })




app.post('/createUser', async (req, res) => {
  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(username, hashedPassword);
  // we make sure thaat that username does not exist in the database
  connection.query(
    `SELECT * FROM User WHERE user_name = '${username}'`,
    (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        res.status(400).send('username already exists');
      } else {
        connection.query(
          `INSERT INTO User (user_name , password) VALUES ('${username}' , '${hashedPassword}')`,
          (error, results, fields) => {
            if (error) throw error;
            res.status(200).send('user created');
          }
        )
      }})
})

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(
    `SELECT * FROM User WHERE user_name = '${username}'`,
    (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, (err, result) => {
          if (result) {
            res.status(200);
            res.json({ error: "welcome back" });;
          } else {
            res.status(400);
            res.json({ error: "wrong password" });
          }
        })
      } else {
        res.status(400);
        res.json({ error: "user does not exist" });
      }
    }
  )
})


app.post('/rate', (req, res) => {
  const rating = req.body.rating;
  const wake_up_date = req.body.wake_up_date;
  const note = req.body.note;
  const that_thing = Number(req.body.that_thing);
  connection.query(
    `INSERT INTO Produchistory (rating) VALUES ('${rating}')`,
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).send('rating inserted');
    }
  )
})




app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
})

