const express = require('express');
const config = require('config')
const mongoose = require('mongoose')

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/', require('./routes/halls.routes'))
app.use('/', require('./routes/films.routes'))
app.use('/', require('./routes/sessions.routes'))

const PORT = config.get('port') || 7070;

const start = async () => {
  try {
    await mongoose.connect(config.get('MongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App is started on port ${PORT}...`))
  } catch (e) {
    console.log(`Server error is ${e}`);
    process.exit(1);
  }
}

start();
