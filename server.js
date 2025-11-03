const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
const authRouter = require('./routes/auth');
const gamesRouter = require('./routes/games');
const resultsRouter = require('./routes/results');

app.use('/api/auth', authRouter);
app.use('/api/games', gamesRouter);
app.use('/api/results', resultsRouter);

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// For Vercel serverless deployment
module.exports = app;

// For local development
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
