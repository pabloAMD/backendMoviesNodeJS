const { Router } = require('express');
const cors = require('cors');

const router = Router();

router.use(cors());


const movies = require('../database/database.json');
const users = require('../database/users.json');
//console.log(movies);

router.get('/', (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = movies.slice(startIndex, endIndex);

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




router.get('/search', (req, res) => {
    const j = req.query.title;

    let resp = movies.filter(movie => movie.Title.toUpperCase().search(j.toUpperCase()) != -1);
    res.json(resp);
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

router.post('/', (req, res) => {
    const id = movies.length + 1;
    const { title, precio, img } = req.body;
    const newProducto = {...req.body, id };
    if (id && producto && precio && img) {
        movies.push(newProducto);
        res.json(movies);
    } else {
        res.status(500).json({ error: 'There was an error.' });
    }

});

router.put('update-movie/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, genre, country,actors,languages,runtime,plot,img } = req.body;
    if (id && producto && precio && img) {
        movies.forEach((movie) => {
            if (movie.id == id) {
                movie.Title = title;
                movie.Director = director;
                movie.Genre = genre;
                movie.Country = country;
                movie.Actors = actors;
                movie.Language = languages;
                movie.Runtime = runtime;
                movie.Plot = plot;
                movie.Poster = img;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({ error: 'There was an error.' });
    }
});

module.exports = router;