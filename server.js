import http from "http";
import app from './app/app.js';
import dotenv from "dotenv";


dotenv.config({
  path: './.env'
});


// create the serve 
const PORT = process.env.PORT || 8000;
const server = http.createServer(app)
server.listen(PORT, console.log(`server is up and runing on port ${PORT}`))