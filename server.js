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
  //can also be implemented using iota.api.getInputs(seed, [, options], callback)
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

function getBal(seed){
	return new Promise(function(resolve, reject){
		iota.api.getAccountData(seed, (error, success) => {
			if (error) {
				reject(error);
			}
			else {
				console.log("balance: " + success.balance);
        resolve(success.balance);
			}
		})
	});
}

function getNodeInf(){
  return new Promise(function(resolve, reject){
		iota.api.getNodeInfo((error, success) => {
			if (error) {
				reject(error);
			}
			else {
				console.log("node: " + success);
        resolve(JSON.stringify(success, null, "\t"));
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
  socket.on('balance', function(msg){
		let p = getBal(fromseed);
		p.then(function(msg){
			io.emit('balance', msg);
		}).catch(function(error){
			console.log(error);
		})
	});
  socket.on('node', function(msg){
		let p = getNodeInf();
		p.then(function(msg){
			io.emit('node', msg);
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
