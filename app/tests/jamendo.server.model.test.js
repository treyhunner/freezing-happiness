'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Artist = mongoose.model('JamendoArtist');

/**
 * Globals
 */
var artist, artist2;

/**
 * Unit tests
 */
describe('JamendoArtist Model Unit Tests:', function() {
	beforeEach(function(done) {
		artist = new Artist({
			id: '431809',
			name: 'Uikhtor',
			website: '',
			joindate: '2013-03-12',
			image: 'http://imgjam.com/artists/U/Uikhtor.jpg',
			shorturl: 'http://jamen.do/a/431809',
			shareurl: 'http://www.jamendo.com/artist/431809'
		});

		artist2 = new Artist(artist);

		done();
	});

	describe('Object initialization', function() {
		it('should convert joindate to a Date', function(done) {
			var identicalDate = new Date('Mar 12 2013 00:00:00 UTC');
			artist.joindate.should.be.type('object');
			artist.joindate.valueOf().should.equal(identicalDate.valueOf());
			done();
		});
	});

	describe('Method Save', function() {
		it('should begin without the test artist', function(done) {
			Artist.find({ name: 'Uikhtor' }, function(err, artists) {
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

		it('should show an error when trying to save without title', function(done) {
			artist.name = '';

			return artist.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show an error when trying to save an inalid shareurl', function(done) {
			artist.shareurl = 'invalid';
			return artist.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show an error when trying to save without joindate', function(done) {
			artist.joindate = '';
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
