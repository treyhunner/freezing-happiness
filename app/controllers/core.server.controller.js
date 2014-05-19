'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	JamendoArtist = mongoose.model('JamendoArtist'),
	MagnatuneArtist = mongoose.model('MagnatuneArtist'),
	async = require('async'),
	_ = require('lodash');

	/**
	* Homepage
	*/
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};

/**
 * Search for artist by name
 */
exports.search = function(req, res) {
	var query = req.query.q;
	async.parallel([
		async.apply(_.bindKey(MagnatuneArtist, 'find'), {artist: query}),
		async.apply(_.bindKey(JamendoArtist, 'find'), {name: query}),
	],
	function (err, results) {
		if (err) {
			res.send(400, {
				message: 'error',  // FIXME
			});
		} else {
			res.jsonp(_.flatten(results, true));
		}
	});
};