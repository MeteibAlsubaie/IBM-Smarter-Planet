'use strict';

var app = require('../..');
import request from 'supertest';

var newNodes;

describe('Nodes API:', function() {

  describe('GET /api/nodes', function() {
    var nodess;

    beforeEach(function(done) {
      request(app)
        .get('/api/nodes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          nodess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      nodess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/nodes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/nodes')
        .send({
          name: 'New Nodes',
          info: 'This is the brand new nodes!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNodes = res.body;
          done();
        });
    });

    it('should respond with the newly created nodes', function() {
      newNodes.name.should.equal('New Nodes');
      newNodes.info.should.equal('This is the brand new nodes!!!');
    });

  });

  describe('GET /api/nodes/:id', function() {
    var nodes;

    beforeEach(function(done) {
      request(app)
        .get('/api/nodes/' + newNodes._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          nodes = res.body;
          done();
        });
    });

    afterEach(function() {
      nodes = {};
    });

    it('should respond with the requested nodes', function() {
      nodes.name.should.equal('New Nodes');
      nodes.info.should.equal('This is the brand new nodes!!!');
    });

  });

  describe('PUT /api/nodes/:id', function() {
    var updatedNodes;

    beforeEach(function(done) {
      request(app)
        .put('/api/nodes/' + newNodes._id)
        .send({
          name: 'Updated Nodes',
          info: 'This is the updated nodes!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNodes = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNodes = {};
    });

    it('should respond with the updated nodes', function() {
      updatedNodes.name.should.equal('Updated Nodes');
      updatedNodes.info.should.equal('This is the updated nodes!!!');
    });

  });

  describe('DELETE /api/nodes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/nodes/' + newNodes._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when nodes does not exist', function(done) {
      request(app)
        .delete('/api/nodes/' + newNodes._id)
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
