module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{png,json,ico,txt,js,css,jpg,ttf,gif,svg,woff,eot,woff2}'
	],
	swDest: 'build/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};