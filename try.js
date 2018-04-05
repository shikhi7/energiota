const IOTA = require("iota.lib.js")
const iota = new IOTA({provider: "http://localhost:14800"})
//var sync = require('sync')

const fromseed = 'FRBOCU9PHRLCUYOGUCXXUHFPINKDVRJXBBHOHXXE9OTJMJKBBLYZNNNEXDCQYDSTRKIFYLRRX9WEDXKOC'

let resp = ""
iota.api.getNewAddress(fromseed, (error, success) => {
	if (error) {
		console.log(error)
	}
	else {
		console.log(success)
		resp = success
	}
})

setTimeout(function(){console.log(resp);}, 500);

// function x(){
// 	var resp = "cummonnnn";
// 	iota.api.getNewAddress(fromseed, (error, success) => {
// 		if (error) {
// 			console.log(error)
// 		}
// 		else {
// 			console.log(success)
// 			resp = success;
// 		}
// 	})
// 	console.log(resp);
// 	setTimeout(function(){return resp;}, 3000);
// }

// console.log(x())
