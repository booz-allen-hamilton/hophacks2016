var http = require('http');

const PORT=3000; 

//We need a function which handles requests and send response
function handle(request, response){
    response.end('Hello: ' + request.url);
}

var server = http.createServer(handle);

server.listen(PORT, function(){
    console.log("Listening on: http://localhost:%s", PORT);
});
