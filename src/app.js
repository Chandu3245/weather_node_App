const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views locTION
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup for static directory to serve  
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Chandrasekhar"
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About",
        name: "Chandrasekhar"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Chandrasekhar",
        helpTest: 'This is some helpful test.'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, {summary, temperature, precipProbability}) => {
            if(error){
                return res.send({error});
            }
            res.send({summary, temperature, precipProbability, location});
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide search term"
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Chandrasekhar",
        error: "Help article not found"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Chandrasekhar",
        error: 'Page not found!!'
    });
})


app.listen(port, () => {
    console.log(' Listening on port '+ port);
});