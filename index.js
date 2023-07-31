import express from 'express';
import cors from 'cors';
import { Game } from "./models/Games.js";

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use('/api', cors()); //set Access-Control-Allow-Origin header for api route
app.use(express.json()); //Used to parse JSON bodies
app.set('view engine', 'ejs');

//this posts the info of all games
app.get('/api/games', (req, res) => {
  Game.find({}).lean()
    .then((games) => {
      res.json(games);
    }).catch(err => res.status(500).send('Database Error occurred'));
});

//this posts the information for one game
app.get('/api/games/:title', (req, res) => {
  Game.findOne({ title: req.params.title}).lean()
    .then((game) => {
      res.json(game);
    }).catch(err => res.status(500).send('Database Error occurred')); 
})

app.delete('/api/games/delete/:title', (req, res) => {
  Game.deleteOne({title: req.params.title}).lean()
    .then((game) => {
      res.json(game);
    }).catch(err => res.status(500).send('Database Error occurred'));
})

//using the databases notes to do this, release is in x's for year/month/day format. {upsert:true} is an option that tells MongoDB to perform an update if a matching document is found, or create a new document if no matching document is found. 
app.post('/api/games/update/:title', (req, res) => {
  const newGames = {'title':'new title', 'developer':'new developer', 'release':'xxxx-xx-xx', 'genre':'new genre'}
  Game.updateOne({ title: req.params.title }, newGames, { upsert:true }).lean()
    .then((game) => {
      res.json(game);
    }).catch(err => res.status(500).send('Database Error Occurred'));
})

// send static file as response
app.get('/', (req,res) => {
  Game.find({}).lean()
  .then((games) => {
    res.render('home_react', { games: JSON.stringify(games) });
  }).catch(err => console.log(err)); 
  });

// send content of 'home' view
app.get('/games/:title', (req,res) => {
    Game.findOne({title: req.params.title}).lean()
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