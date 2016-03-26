'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var feedsCtrlStub = {
  index: 'feedsCtrl.index',
  show: 'feedsCtrl.show',
  create: 'feedsCtrl.create',
  update: 'feedsCtrl.update',
  destroy: 'feedsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var feedsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './feeds.controller': feedsCtrlStub
});

describe('Feeds API Router:', function() {

  it('should return an express router instance', function() {
    feedsIndex.should.equal(routerStub);
  });

  describe('GET /api/feeds', function() {

    it('should route to feeds.controller.index', function() {
      routerStub.get
        .withArgs('/', 'feedsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/feeds/:id', function() {

    it('should route to feeds.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'feedsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/feeds', function() {

    it('should route to feeds.controller.create', function() {
      routerStub.post
        .withArgs('/', 'feedsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/feeds/:id', function() {

    it('should route to feeds.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'feedsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/feeds/:id', function() {

    it('should route to feeds.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'feedsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/feeds/:id', function() {

    it('should route to feeds.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'feedsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
