require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/db');


const app = express();

// Handlebars middleware
app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body-Parser middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
