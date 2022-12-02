const express = require('express');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const postRoutes = require('./routes/postRoutes');
// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);

app.use('/user', userRoutes);

app.use('/categories', categoriesRoutes);

app.use('/post', postRoutes);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
