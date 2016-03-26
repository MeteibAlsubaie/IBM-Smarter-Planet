'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var motherSensorClientCtrlStub = {
  index: 'motherSensorClientCtrl.index',
  show: 'motherSensorClientCtrl.show',
  create: 'motherSensorClientCtrl.create',
  update: 'motherSensorClientCtrl.update',
  destroy: 'motherSensorClientCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var motherSensorClientIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mother-sensor-client.controller': motherSensorClientCtrlStub
});

describe('MotherSensorClient API Router:', function() {

  it('should return an express router instance', function() {
    motherSensorClientIndex.should.equal(routerStub);
  });

  describe('GET /api/mother-sensor-clients', function() {

    it('should route to motherSensorClient.controller.index', function() {
      routerStub.get
        .withArgs('/', 'motherSensorClientCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/mother-sensor-clients/:id', function() {

    it('should route to motherSensorClient.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'motherSensorClientCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/mother-sensor-clients', function() {

    it('should route to motherSensorClient.controller.create', function() {
      routerStub.post
        .withArgs('/', 'motherSensorClientCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/mother-sensor-clients/:id', function() {

    it('should route to motherSensorClient.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'motherSensorClientCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mother-sensor-clients/:id', function() {

    it('should route to motherSensorClient.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'motherSensorClientCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mother-sensor-clients/:id', function() {

    it('should route to motherSensorClient.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'motherSensorClientCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
