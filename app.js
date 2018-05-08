const express = require('express');
require('dotenv').config();

const app = express();


app.set('view engine', 'pug');

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
