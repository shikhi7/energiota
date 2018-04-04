const IOTA = require("iota.lib.js")
const iota = new IOTA({provider: "http://localhost:14800"})

const fromseed = 'FRBOCU9PHRLCUYOGUCXXUHFPINKDVRJXBBHOHXXE9OTJMJKBBLYZNNNEXDCQYDSTRKIFYLRRX9WEDXKOC'

iota.api.getNewAddress(fromseed, (error, success) => {
	if (error) {
		console.log(error)
	}
	else {
		console.log(success)
	}
})