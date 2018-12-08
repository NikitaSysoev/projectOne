const app = require('./app');
const database = require('./config/database');

database.connect();
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on ${port}`));
