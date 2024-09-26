const express = require('express');
const app = express();
require('dotenv').config();
const dbconfig = require('./config/dbconfig');
const port = process.env.PORT || 5001;
const path = require('path');
const portfolioRoute = require('./routes/portfolioRoute');
const cors = require('cors');

app.use(cors(
    {
        origin:["portfolio-server-amber-pi.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
))

app.use(express.json());

app.use('/api/portfolio', portfolioRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join('frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});