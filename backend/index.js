const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const path = require('path');
const cors = require('cors');

app.use(cors(
    {
        origin: ["http://localhost:3000", "https://portfolio-client-fawn-rho.vercel.app"], // Add multiple origins here
        methods: ["GET", "POST"],
        credentials: true
    }
))

const dbconfig = require('./config/dbconfig');
const portfolioRoute = require('./routes/portfolioRoute');
app.use(express.json());

app.use('/api/portfolio', portfolioRoute);

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join('frontend/build')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
//     });
// }
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});