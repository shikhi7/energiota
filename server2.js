var express = require("express");
var bodyParser = require('body-parser');
const IOTA = require("iota.lib.js")

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const iota = new IOTA({provider: "http://localhost:14800"})

var urlencodedParser = bodyParser.urlencoded({extended:false});
let newAddr = ''

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


 function getNewAddr(seed){

	return new Promise(function(resolve, reject){
		iota.api.getNewAddress(seed, (error, success) => {
			if (error) {
				reject(error);
			}
			else {
				console.log(success);
				resolve(success);
			}
		})
	});

	//setTimeout(function(){}, 4000);
}

// let gWrapper = function (f1){
// 	resp = 
// }

const fromseed = 'FRBOCU9PHRLCUYOGUCXXUHFPINKDVRJXBBHOHXXE9OTJMJKBBLYZNNNEXDCQYDSTRKIFYLRRX9WEDXKOC'

io.on('connection', function(socket){
	socket.on('new address', function(msg){
		let p = getNewAddr(fromseed);
		p.then(function(msg){
			//console.log(msg);
			//resp = msg;
			//return resp;
			console.log("working: " + msg);
			io.emit('new address', msg);
		}).catch(function(error){
			console.log(error);
		})
		// setTimeout(function(){
		// 	console.log("working: " + resp);
		// 	io.emit('new address', resp);
		//}, 2500);
		//let respo = resp.next();
	});
});








app.post('/process_seedlogin', urlencodedParser, function(req, res){
  // Prepare output in JSON format
    response = {
      seed:req.body.seed,
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

// const fromseed = 'FRBOCU9PHRLCUYOGUCXXUHFPINKDVRJXBBHOHXXE9OTJMJKBBLYZNNNEXDCQYDSTRKIFYLRRX9WEDXKOC'

app.post('/process_genAddr', urlencodedParser, function(req, res){
  // Prepare output in JSON format
    iota.api.getNewAddress(fromseed, (error, success) => {
		if (error) {
			console.log(error)
		}
		else {
			console.log(success);
			newAddr = success;
			setTimeout(function(){res.end(newAddr);}, 2000);
		}
	});
})


http.listen(3000, function(){
  console.log('listening on *:3000');
});

