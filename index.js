const express = require('express');

const app = express();

app.use(express.json());

require('dotenv').config();

const connectDB = require('./db/db');

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome" });
})

connectDB();


const adminRoutes = require('./routes/admin');

const lessonsRoutes = require('./routes/lessons');

const subjectsRoutes = require('./routes/subjects');

const tutorsRoutes = require('./routes/tutors');

const usersRoutes = require('./routes/users');

app.use(adminRoutes);
app.use(lessonsRoutes);
app.use(subjectsRoutes);
app.use(tutorsRoutes);
app.use(usersRoutes);


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App running at port ${port}`);
});