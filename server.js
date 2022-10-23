const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express()

// Express App Config
app.use(express.json())
app.use(cookieParser());
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const toyRoutes = require('./api/toy/toy.controller');
const userRoutes = require('./api/user/user.controller');

app.use('/api/toy', toyRoutes)
app.use('/api/user', userRoutes)

const port = process.env.PORT || 3030
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'
    ));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

