// create a simple express server using es6 syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const port = 3000;

const app = express();




app.use('/public', express.static(process.cwd() + '/public'));

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index");
});
  




app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
})

