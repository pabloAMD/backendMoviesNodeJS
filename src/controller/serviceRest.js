const { Router } = require('express');

const router = Router();


const movies = require('../database/database.json');
//console.log(movies);

router.get('/', (req, res) => {
    res.json(movies)
});

router.get('/search', (req, res) => {
    const j = req.query.title;

    let carro = movies.filter(movie => movie.Title.toUpperCase().search(j.toUpperCase()) != -1);
    console.log(carro);
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

module.exports = router;