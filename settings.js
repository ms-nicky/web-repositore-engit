const fs = require('fs')

global.creator = 'NICKY'// yourname
global.MONGO_DB_URI = "mongodb+srv://Msxploiter:OV3LnrGmV1Bywlxp@database1.gvxak6b.mongodb.net/?retryWrites=true&w=majority&appName=Database1" //database mongodb 
global.ACTIVATION_TOKEN_SECRET = "NICKY" //isi apa aja bebas
global.your_email = "nickystore604@gmail.com" //email
global.email_password = "tyldipvcnpifyxzw" //application password email
global.gemini_aoikey = "" //apikey chat gemini
//global.limitCount = 10000
global.limitCount = 100; // misalnya default limit 100
global.YUOR_PORT = 8000
global.loghandler = {
	noapikey:{
		status: 403,
        message: 'Input parameter apikey',
        creator: `${creator}`,
        result: "error"
    },
    error: {
        status: 503,
        message: 'Service Unavaible, Sedang dalam perbaikan',
        creator: `${creator}`
    },
    apikey: {
    	status: 403,
    	message: 'Forbiden, Invalid apikey',
    	creator: `${creator}`
    },
    noturl: {
    	status: 403,
    	message: 'Forbiden, Invlid url, masukkan parameter url',
    	creator: `${creator}`,
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
	delete require.cache[file]
	require(file)
})

