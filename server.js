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
				console.log("success in getNewAddress: " + success);
				resolve(success);
			}
		})
	});
}

function getAccountInfo(seed){
	return new Promise(function(resolve, reject){
		iota.api.getAccountData(seed, (error, success) => {
			if (error) {
				reject(error);
			}
			else {
				console.log("account data: " + success.inputs);
        resolve(success.inputs);
			}
		})
	});
}

function getUsed(seed){
	return new Promise(function(resolve, reject){
		iota.api.getAccountData(seed, (error, success) => {
			if (error) {
				reject(error);
			}
			else {
				console.log("used addresses: " + success.addresses);
        resolve(success.addresses);
			}
		})
	});
}

let fromseed = ''

io.on('connection', function(socket){
	socket.on('new address', function(msg){
		let p = getNewAddr(fromseed);
		p.then(function(msg){
			//console.log("working: " + msg);
			io.emit('new address', msg);
		}).catch(function(error){
			console.log(error);
		})
	});
  socket.on('account info', function(msg){
		let p = getAccountInfo(fromseed);
		p.then(function(msg){
			io.emit('account info', msg);
		}).catch(function(error){
			console.log(error);
		})
	});
  socket.on('used address', function(msg){
		let p = getUsed(fromseed);
		p.then(function(msg){
			io.emit('used address', msg);
		}).catch(function(error){
			console.log(error);
		})
	});
});

app.post('/process_seedlogin', urlencodedParser, function(req, res){
    console.log("login seed is: " + req.body.seed);
    fromseed = req.body.seed;
    console.log("fromseed: " + fromseed);
    res.sendFile(__dirname + '/logged.html');
})

// app.post('/process_getNodeInfo', urlencodedParser, function(req, res){
//   // Prepare output in JSON format
//     response = {};
//     iota.api.getNodeInfo((error, success) => {
// 		if (error){
// 			console.log(error);
// 		} else {
// 			console.log(success);
// 		}
//     });
//     res.end(JSON.stringify(response));
// })
//
// //const fromseed = 'FRBOCU9PHRLCUYOGUCXXUHFPINKDVRJXBBHOHXXE9OTJMJKBBLYZNNNEXDCQYDSTRKIFYLRRX9WEDXKOC'
//
// app.post('/process_genAddr', urlencodedParser, function(req, res){
//   // Prepare output in JSON format
//     iota.api.getNewAddress(fromseed, (error, success) => {
// 		if (error) {
// 			console.log(error)
// 		}
// 		else {
// 			console.log(success);
// 		}
// 	});
// })


http.listen(3000, function(){
  console.log('listening on *:3000');
});
