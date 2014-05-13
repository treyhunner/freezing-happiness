'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Artist = mongoose.model('MagnatuneArtist');

/**
 * Globals
 */
var artist, artist2;

/**
 * Unit tests
 */
describe('MagnatuneArtist Model Unit Tests:', function() {
	beforeEach(function(done) {
		artist = new Artist({
			artist: 'Adriano Fontana',
			description: 'a trip with woodwinds and strings',
			homepage: 'adriano_fontana',
			city: 'Conscenti de Ne',
			state: '',
			country: 'Italy',
			bio: 'Born in Genoa, Adriano Fontana started to study classic guitar when he was 7 years old.\n\n',
			bandphoto: '/artists/img/adriano_fontana.jpg',
			id: null
		});

		artist2 = new Artist(artist);

		done();
	});

	describe('Method Save', function() {
		it('should begin without the test artist', function(done) {
			Artist.find({ artist: 'Adriano Fontana' }, function(err, artists) {
				artists.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			return artist.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should fail to save an existing artist again', function (done) {
			artist.save();
			return artist2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show an error when trying to save without artist', function(done) {
			artist.artist = '';

			return artist.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Artist.remove().exec();
		done();
	});
});