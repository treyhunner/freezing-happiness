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
		function (callback) {
			MagnatuneArtist.find({artist: query}, callback);
		},
		function (callback) {
			JamendoArtist.find({name: query}, callback);
		}
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