import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import http from 'http';

// Create an HTTP server
const server = http.createServer(app);

// Start the server

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});

