'use strict';

(function () {

    class MainController {

        constructor($http, $scope, socket, feedResource) {
            this.$http = $http;
            this.socket = socket;
            this.awesomeThings = [];
            this.data = { dataset: [] };
            this.google = google;
            this.feedResource = feedResource;
            this.$scope = $scope;
            this.color = { name: '' }
            this.sensorId  = 'Abyr91CL2yYWR7ZUfI2VbaKtoHqoz13I'

            $scope.$on('$destroy', function () {
                socket.unsyncUpdates('thing');
            });
        }

        initGoogleCharts() {
            this.google.charts.load('current', { 'packages': ['corechart'] });
            this.google.charts.setOnLoadCallback(this.drawChart);
        }

        drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('datetime', 'TimeStamp');
            data.addColumn('number', 'Temperature');

            if (this !== undefined) {
                this.data.dataset.forEach(function (item) {
                    data.addRow([item.timestamp, item.data.centidegreeCelsius / 100]);
                });
            }

            var options = {
                //title: 'Temperature',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }

        $onInit() {
            this.initGoogleCharts();
            this.$http.get('/api/things').then(response => {
                this.awesomeThings = response.data;
                this.socket.syncUpdates('thing', this.awesomeThings);
            });
        }

        getFeed() {
            this.feedResource.getFeed({ feedId: this.sensorId }).then(response => {
                var dataset = [];
                response.forEach(function (item) {
                    item.timestamp = new Date(item.dateEvent);
                    dataset.push(item);
                });

                this.data.dataset = dataset;

                this.drawChart();
            });
        }

        addThing() {
            if (this.newThing) {
                this.$http.post('/api/things', { name: this.newThing });
                this.newThing = '';
            }
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }
    }

    angular.module('smarterPlanetApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController
        });

})();
