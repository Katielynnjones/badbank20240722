const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dal = require('./dal.js');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS configuration
app.use(cors());


// Serve static files from 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.post('/account/create', function (req, res) {
    const { name, email, password } = req.body;
    console.log('Received create account request:', req.body);
    
    dal.find(email).then((users) => {
        if (users.length > 0) {
            console.log('User already exists');
            res.status(400).send('User already exists');
        } else {
            dal.create(name, email, password).then((user) => {
                console.log(user);
                res.send(user);
            });
        }
    }).catch(err => {
        console.error('Error creating account:', err);
        res.status(500).send(err);
    });
});


// Login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email).then((user) => {
        if (user.length > 0) {
            if (user[0].password === req.params.password) {
                res.send(user[0]);
            } else {
                res.status(400).send('Login failed: wrong password');
            }
        } else {
            res.status(400).send('Login failed: user not found');
        }
    });
});

// Find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// Find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// Update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount).then((response) => {
        console.log(response);
        res.send(response);
    });
});

// All accounts
app.get('/account/all', function (req, res) {
    dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

//Test
app.get('/test', (req, res) => {
    res.send('Test route is working');
});


// Catch-all route to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Running on port: ' + port);
});


