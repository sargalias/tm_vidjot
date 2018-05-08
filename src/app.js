const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');


const app = express();

// Handlebars middleware
app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
const routes = require('./routes/index');
app.use(routes);



if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
} else {
    module.exports = app;
}
