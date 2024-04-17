// Import packages
const express = require("express");
const tunnel = require("./routes/tunnel");
const cors = require('cors');

const bodyParser  = require('body-parser') 

// Middlewares
const app = express();
app.use(bodyParser.text({ type: ['text/*', '*/json'], limit: '100mb' }), cors())
// Routes
app.use("/home", tunnel);



// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
