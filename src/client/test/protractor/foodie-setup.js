// setup.js
exports.config = {
	capabilities: {
		browserName: 'chrome',
		maxInstances: 1 
	},
	seleniumAddress: 'http://localhost:4444/wd/hub', 
	specs: ['foodie-splash.js', 'foodie-signup.js'],
	allScriptsTimeout: 100000,

}