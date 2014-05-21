'use strict';

function escapeRegExp(string){
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	JamendoArtist = mongoose.model('JamendoArtist'),
	MagnatuneArtist = mongoose.model('MagnatuneArtist'),
	async = require('async'),
	_ = require('lodash');

/**
 * Search for artist by name
 */
exports.search = function(req, res) {
	var query = new RegExp(escapeRegExp(req.query.q), 'i');
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
