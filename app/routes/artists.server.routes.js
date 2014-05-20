'use strict';

module.exports = function(app) {
	// Artist Routes
	var artists = require('../../app/controllers/artists');
	app.route('/search').get(artists.search);
};