const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '@2-T2bS:0ZT0s',
    saveUninitialized: false,
    resave: false,
    cookie: {
        // 1 minute
        maxAge: 60 * 1000,
    },
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    res.locals.username = req.session.username || null;
    next();
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
})

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/login', (req, res) => {
    res.render("login.ejs");
});

app.get('/dashboard', (req, res) => {
    res.render("dashboard.ejs");
});

app.get('/logout', (req, res) => {

    req.session.destroy((error) => {
        if (error) {
            console.log('Error');
        }
        res.redirect('/')
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == 'Admin' && password == 123) {
        req.session.loggedIn = true;
        req.session.username = 'Admin';
        if (req.session.loggedIn) {
            res.redirect('/');
        }
    } else {
        res.redirect('/login');
    }

});


