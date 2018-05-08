require('dotenv').config();
const express = require('express');
const db = require('./config/db');

const app = express();

// General middleware and config
require('./config/general')(app);


// Routes
const indexRoutes = require('./routes/index');
const ideaRoutes = require('./routes/ideas');
const userRoutes = require('./routes/users');

app.use(indexRoutes);
app.use('/ideas', ideaRoutes);
app.use('/users', userRoutes);



if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
} else {
    module.exports = app;
}
