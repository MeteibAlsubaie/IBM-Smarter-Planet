'use strict';

var app = require('../..');
import request from 'supertest';

var newFeeds;

describe('Feeds API:', function() {

  describe('GET /api/feeds', function() {
    var feedss;

    beforeEach(function(done) {
      request(app)
        .get('/api/feeds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          feedss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      feedss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/feeds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/feeds')
        .send({
          name: 'New Feeds',
          info: 'This is the brand new feeds!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFeeds = res.body;
          done();
        });
    });

    it('should respond with the newly created feeds', function() {
      newFeeds.name.should.equal('New Feeds');
      newFeeds.info.should.equal('This is the brand new feeds!!!');
    });

  });

  describe('GET /api/feeds/:id', function() {
    var feeds;

    beforeEach(function(done) {
      request(app)
        .get('/api/feeds/' + newFeeds._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          feeds = res.body;
          done();
        });
    });

    afterEach(function() {
      feeds = {};
    });

    it('should respond with the requested feeds', function() {
      feeds.name.should.equal('New Feeds');
      feeds.info.should.equal('This is the brand new feeds!!!');
    });

  });

  describe('PUT /api/feeds/:id', function() {
    var updatedFeeds;

    beforeEach(function(done) {
      request(app)
        .put('/api/feeds/' + newFeeds._id)
        .send({
          name: 'Updated Feeds',
          info: 'This is the updated feeds!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFeeds = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFeeds = {};
    });

    it('should respond with the updated feeds', function() {
      updatedFeeds.name.should.equal('Updated Feeds');
      updatedFeeds.info.should.equal('This is the updated feeds!!!');
    });

  });

  describe('DELETE /api/feeds/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/feeds/' + newFeeds._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when feeds does not exist', function(done) {
      request(app)
        .delete('/api/feeds/' + newFeeds._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
