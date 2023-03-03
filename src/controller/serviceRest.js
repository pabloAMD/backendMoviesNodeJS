const { Router } = require('express');
const cors = require('cors');

const router = Router();

router.use(cors());


const movies = require('../database/database.json');
const users = require('../database/users.json');
//console.log(movies);

router.get('/', (req, res) => {

    const m = movies.sort((a, b) => (parseInt(a.id) < parseInt(b.id)) ? 1 : -1);

    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = m.slice(startIndex, endIndex);
    

    const respon = {
        count: movies.length,
        movies: result
    };
 
    res.json(respon);
});

router.get('/getByid', (req, res) => {
    const j = req.query.id;
    console.log(j);
    let resp = movies.find(movie => movie.id === j);
    res.json(resp);
});

router.get('/getSimilar', (req, res) => {
    const j = req.query.genre;
    console.log(j)
    
    const resp = movies.filter(movie => movie.Genre.toUpperCase().search(j.toUpperCase()) != -1);
    res.json(resp);
});



router.get('/search', (req, res) => {
    const j = req.query.title;
    const resp = movies.filter(movie => movie.Title.toUpperCase().search(j.toUpperCase()) != -1);

    console.log(resp);

    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = resp.slice(startIndex, endIndex);

    const respToSend = {
        count: resp.length,
        movies: result
    }
    
    res.json(respToSend);
});

router.post('/create-movie',(req,res)=>{

    const id =  toString(movies.length + 1);
    const {Title,Actors,Director,Genre, Country,Language,Plot,Poster,Runtime,Ratings,Year} = req.body;
    const newMovie = {id,Title,Actors,Director,Genre, Country,Language,Plot,Poster,Runtime,Ratings,Year};
    if(Title){
        movies.push(newMovie);
        
        const m = movies.sort((a, b) => (parseInt(a.id) < parseInt(b.id)) ? 1 : -1); 
        res.status(200).json(m);
    }else{
        res.status(500).json({error:'There was an error.'});
    }
});

router.put('/update-movie', (req, res) => {
    const id  = req.query.id;
    const m = [];
   const {Title,Actors,Director,Genre, Country,Language,Plot,Poster,Runtime,Year} = req.body;
   console.log(id)
    if (id) {
        movies.forEach((movie) => {
          
            if (movie.id === id) { 
                console.log(Title)
                movie.id = id;
                movie.Title = Title;
                movie.Director = Director;
                movie.Genre = Genre;
                movie.Country = Country;
                movie.Actors = Actors;
                movie.Language = Language;
                movie.Runtime = Runtime;
                movie.Plot = Plot;
                movie.Poster = Poster;
                movie.Year = Year;
                movie.Ratings = movie.Ratings;
                m.push(movie);
                console.log(m)

            }
        });
        res.json(movies);
    } else {
        res.status(500).json({ error: 'There was an error.' });
    }
});

router.delete('/delete-movie', (req, res) => {  
    const { id }= req.query;
    console.log("nono ",id)
    if (id) {
        movies.forEach((movie, index) => {
            if (movie.id == id) {
                movies.splice(index, 1);
                movies.sort((a, b) => (parseInt(a.id) < parseInt(b.id)) ? 1 : -1); 
                console.log(movies)
            }

        });
        res.json(movies);
    } else {
        res.status(500).json({ error: 'There was an error.' });
    }
});

// methods for users

router.get('/get-users',(req,res)=>{

    res.json(users);
});

router.get('/verify-user',(req,res)=>{
    
    const {email,password} = req.query;
    console.log(email,password)
    let resp = users.find(user => user.email === email && user.password === password);
    if(resp){
        res.json({email:resp.email,password:resp.password, name:resp.name, email:resp.lastName, status:'ok'});
    }else{
        res.json(404,{status:'error'});
    }
   
});

router.post('/create-user',(req,res)=>{

    console.log("di",req.body);
    const id = users.length + 1;
    const {email,password,name,lastName} = req.body;
    const newUser = {id,email,password,name,lastName};
    if(email && password && name && lastName){
        users.push(newUser);
        
        res.status(200).json({status:'ok',user:newUser});
    }else{
        res.status(500).json({error:'There was an error.'});
    }
});


module.exports = router;