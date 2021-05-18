const express = require('express');

const connectDB = require('./db/db');

require('dotenv').config();

const { PORT } = process.env;

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome" });
})

connectDB();

const port = process.env.PORT || PORT;

app.listen(port, () => {
    console.log(`App running at port ${port}`);
})