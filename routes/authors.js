const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// get all authors
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== ''){   // because it's a GET request, the parameters are stored in req.query
        searchOptions.name = new RegExp(req.query.name, 'i'); // RegExp treats the variable as a regular expression, 'i' for case insensitive
    }
    try {
        const authors = await Author.find(searchOptons);
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
         });
    } catch {
        res.redirect('/'); // if there's an error, redirect to the home page
    }

});

// get new author
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

// create a new author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });

    try {
        const newAuthor = await author.save();
        //res.redirect(`authors/${newAuthor.id}`);
        res.redirect(`authors`);
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating the author'
        });
    }
});

module.exports = router;