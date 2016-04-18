'use strict';

var app = require('../..');
import request from 'supertest';

var newMotherSensorClient;

describe('MotherSensorClient API:', function() {

  describe('GET /api/mother-sensor-clients', function() {
    var motherSensorClients;

    beforeEach(function(done) {
      request(app)
        .get('/api/mother-sensor-clients')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          motherSensorClients = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      motherSensorClients.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/mother-sensor-clients', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mother-sensor-clients')
        .send({
          name: 'New MotherSensorClient',
          info: 'This is the brand new motherSensorClient!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMotherSensorClient = res.body;
          done();
        });
    });

    it('should respond with the newly created motherSensorClient', function() {
      newMotherSensorClient.name.should.equal('New MotherSensorClient');
      newMotherSensorClient.info.should.equal('This is the brand new motherSensorClient!!!');
    });

  });

  describe('GET /api/mother-sensor-clients/:id', function() {
    var motherSensorClient;

    beforeEach(function(done) {
      request(app)
        .get('/api/mother-sensor-clients/' + newMotherSensorClient._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          motherSensorClient = res.body;
          done();
        });
    });

    afterEach(function() {
      motherSensorClient = {};
    });

    it('should respond with the requested motherSensorClient', function() {
      motherSensorClient.name.should.equal('New MotherSensorClient');
      motherSensorClient.info.should.equal('This is the brand new motherSensorClient!!!');
    });

  });

  describe('PUT /api/mother-sensor-clients/:id', function() {
    var updatedMotherSensorClient;

    beforeEach(function(done) {
      request(app)
        .put('/api/mother-sensor-clients/' + newMotherSensorClient._id)
        .send({
          name: 'Updated MotherSensorClient',
          info: 'This is the updated motherSensorClient!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMotherSensorClient = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMotherSensorClient = {};
    });

    it('should respond with the updated motherSensorClient', function() {
      updatedMotherSensorClient.name.should.equal('Updated MotherSensorClient');
      updatedMotherSensorClient.info.should.equal('This is the updated motherSensorClient!!!');
    });

  });

  describe('DELETE /api/mother-sensor-clients/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mother-sensor-clients/' + newMotherSensorClient._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when motherSensorClient does not exist', function(done) {
      request(app)
        .delete('/api/mother-sensor-clients/' + newMotherSensorClient._id)
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
