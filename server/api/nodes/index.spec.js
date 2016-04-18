'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var nodesCtrlStub = {
  index: 'nodesCtrl.index',
  show: 'nodesCtrl.show',
  create: 'nodesCtrl.create',
  update: 'nodesCtrl.update',
  destroy: 'nodesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var nodesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './nodes.controller': nodesCtrlStub
});

describe('Nodes API Router:', function() {

  it('should return an express router instance', function() {
    nodesIndex.should.equal(routerStub);
  });

  describe('GET /api/nodes', function() {

    it('should route to nodes.controller.index', function() {
      routerStub.get
        .withArgs('/', 'nodesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/nodes/:id', function() {

    it('should route to nodes.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'nodesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/nodes', function() {

    it('should route to nodes.controller.create', function() {
      routerStub.post
        .withArgs('/', 'nodesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/nodes/:id', function() {

    it('should route to nodes.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'nodesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/nodes/:id', function() {

    it('should route to nodes.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'nodesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/nodes/:id', function() {

    it('should route to nodes.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'nodesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
