const IOTA = require("iota.lib.js")
// Create IOTA instance directly with provider
var iota = new IOTA({
    'provider': 'http://localhost:14800'
});

// now you can start using all of the functions
const toaddr = 'TURZROPXXKUGCRTEGYXZARYYXWWPDRFRQDGMSIZGACGOU9YBIRWLUONPTPCKEXVJKQFZPKRPZZBLLNMCX'
const fromseed = 'PZJOTYRNDBDVIDSWMVFOUNDFHDJWECI9QRXFHFQEY9TFFJLBXTQEHOMIZZXHOGJVWKXRDZQVKQUVHSSHZ'

const message = iota.utils.toTrytes('Hello World!')

const transfers = [
	{
		value: 3,
		address: toaddr,
		message: message
	}
]

iota.api.sendTransfer(fromseed, 3, 14, transfers, (error, success) => {
	if (error) {
		console.log(error)
	}
	else {
		console.log(success)
	}
})

// you can also get the version
//console.log(iota.version);
