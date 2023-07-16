import express from 'express';
import { Game } from "./models/Games.js";

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.set('view engine', 'ejs');



// send static file as response
app.get('/', (req,res) => {
  Game.find({}).lean()
  .then((games) => {
    res.render('home', { games });
  }).catch(err => console.log(err)); 
  });

// send content of 'home' view
app.get('/games/:title', (req,res) => {
    Game.findOne({"title" : req.params.title}).lean()
    .then((game) => {
      //respond to browser only after db query completes
      res.render('detail', { game });
    });
    });
  
  // send plain text response
app.get('/about', (req,res) => {
   res.type('text/plain');
   res.send('About page');
  });
  
  // define 404 handler
app.use((req,res) => {
   res.type('text/plain'); 
   res.status(404);
   res.send('404 - Not found');
  });

app.listen(app.get('port'), () => {
    console.log('Express started'); 
  });