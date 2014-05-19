'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Jamendo Artist Schema
 */
var ArtistSchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	website: String,
	joindate: {
		type: Date,
		required: true,
	},
	image: String,
	shorturl: String,
	shareurl: String,
});

/**
 * Validations
 */
var validateURL = function (url) {
	return typeof url === 'string' && url.startsWith('http://');
};

ArtistSchema.path('shorturl').validate(validateURL, 'shorturl must be a URL');
ArtistSchema.path('shareurl').validate(validateURL, 'shorturl must be a URL');
ArtistSchema.path('name').index();

mongoose.model('JamendoArtist', ArtistSchema);