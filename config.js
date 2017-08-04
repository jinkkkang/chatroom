module.exports = {
	mongodb:'mongodb://mongdbip:mongdodbport/chat',
	session:{
        name: "kangchat",
        secret: "kangchat", 
        maxAge: 2592000000
	},
	mail:{
		name: "youremail",
		mailhost: "emailhost",
		password: "emailpasswd"
	}

}