require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/db');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');


const app = express();

// Handlebars middleware
app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body-Parser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Method override middleware
app.use(methodOverride('_method'));

// Session middleware
let sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
};
if (process.env.NODE_ENV === 'production') {
    sessionConfig.cookie = {
        secure: true
    };
    app.set('trust proxy', 1);
}
app.use(session(sessionConfig));


// Routes
const indexRoutes = require('./routes/index');
const ideaRoutes = require('./routes/ideas');

app.use(indexRoutes);
app.use('/ideas', ideaRoutes);



if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
} else {
    module.exports = app;
}
