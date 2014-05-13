#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */
var init = require('../config/init')(),
	config = require('../config/config'),
	mongoose = require('mongoose'),
	sqlite3 = require('sqlite3').verbose();

// Bootstrap db connection
var mongoose_db = mongoose.connect(config.db);

// Init the express application
var app = require('../config/express')(mongoose_db);

var Artist = mongoose.model('MagnatuneArtist'),
	db = new sqlite3.Database('./sqlite_magnatune.db');

var artists = 0;

db.each('SELECT * FROM artists', function (err, row) {
	if (err) {
		console.error(err);
	}
	else {
		new Artist(row).save();
		artists++;
	}
});

db.close(function () {
	console.log('Saved ' + artists + ' artists');
	process.exit();
});
