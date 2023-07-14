import express from 'express';
import {getAll, getItem} from './data.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.set('view engine', 'ejs');



// send static file as response
app.get('/', (req,res) => {
    let games = getAll();
    res.render('home', {games: games}); 
  });

// send content of 'home' view
app.get('/games/:title', (req,res) => {
    let result = getItem(req.params.title);
        res.render('detail', { result })
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