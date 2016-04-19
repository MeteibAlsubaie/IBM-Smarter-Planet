angular.module('smarterPlanetApp').service('feedResource', ['$resource',
  function ($resource) {
    var self = this,
      feedRes = $resource('/api/feeds/:id', null, {
        get: { method: 'get', isArray: true }
      }),

      senseFeedRes = $resource('https://apis.sen.se/v2/feeds/:feedId/events/',
        {feedId: '@JZdFdwBB97sSbgKFRrhKNjINX3rDhWU'},
        {get:{method: 'GET', isArray:true, headers: { 'Authorization': 'token 51dd53a17ccbebfaa782f6a020e49c03c8192f6f' }}});

    self.getSenseFeed = function(data){
      return senseFeedRes.get(data).$promise;
    };



    self.getFeeds = function () {
      return feedRes.query().$promise;
    };

    self.getFeed = function (data) {
      return feedRes.get({ id: data.feedId }).$promise;
    };
  }
]);
