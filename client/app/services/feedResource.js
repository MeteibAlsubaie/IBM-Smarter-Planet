angular.module('smarterPlanetApp').service('feedResource', ['$resource',
    function($resource) {
        var self = this,
            feedRes = $resource('/api/feeds/:id', null,{
                get: {method: 'get', isArray:true}
            });

        self.getFeeds = function() {
            return feedRes.query().$promise;
        };

        self.getFeed = function(data) {
            return feedRes.get({ id: data._id }).$promise;
        };
    }
]);