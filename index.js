// Import packages
const express = require("express");
const tunnel = require("./routes/tunnel");
const cors = require('cors');
const bodyParser = require('body-parser');

// Middlewares
const app = express();

// Apply CORS middleware globally
app.use(cors());

// Apply bodyParser middleware
app.use(bodyParser.text({ type: ['text/*', '*/json'], limit: '100mb' }));

// Routes
app.use("/home", tunnel);

// Start server
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
