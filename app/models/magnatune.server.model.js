'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Magnatune Artist Schema
 */
var ArtistSchema = new Schema({
	id: {
		type: String,
	},
	artist: {
		type: String,
		required: true,
	},
	description: String,
	bandphoto: String,
	homepage: String,
	city: String,
	state: String,
	country: String,
	bio: String,
});

ArtistSchema.path('artist').index();

mongoose.model('MagnatuneArtist', ArtistSchema);