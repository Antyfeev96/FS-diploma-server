const express = require('express');
const config = require('config')
const mongoose = require('mongoose')

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/', require('./routes/halls.routes'))

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