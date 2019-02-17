const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

const env = require('./env');
mongoose.connect(env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public/`));
  app.get(/.*/, (request, response) =>
    response.sendFile(`${__dirname}/public/index.html`)
  );
}

app.listen(8000, () => {
  console.log('App listening to port 8000');
});
