const IOTA = require("iota.lib.js")
// Create IOTA instance directly with provider
var iota = new IOTA({
    'provider': 'http://localhost:14800'
});

// now you can start using all of the functions
iota.api.getAccountData('PZJOTYRNDBDVIDSWMVFOUNDFHDJWECI9QRXFHFQEY9TFFJLBXTQEHOMIZZXHOGJVWKXRDZQVKQUVHSSHZ', function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log(success);
    }
});

// you can also get the version
//console.log(iota.version);
