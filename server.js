const http = require("http");
const app = require("./app");
const PORT = 4003;

http.createServer(app).listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`);
});