import http from "http";
import app from './app/app.js';


// create the serve 
const PORT = process.env.PORT || 3000;
const server = http.createServer(app)
server.listen(PORT,console.log(`server is up and runing on port ${PORT}`))