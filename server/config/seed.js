/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Nodes from '../api/nodes/nodes.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
  
var Client = require('node-rest-client').Client;

// configure basic http auth for every request 
var options_auth = { user: "jevkid", password: "SmarterPlanet2" };

var client = new Client(options_auth);

var args = {
    //path: {"arg1": "-u",},
    //parameters: { "-u": "jevkid:SmarterPlanet2" },
    //headers: { "test-header": "client-api" }
};

//"https://apis.sen.se/v2/nodes/?-u=jevkid:SmarterPlanet2"
client.get("https://apis.sen.se/v2/nodes/", args,
    function(data, response) {
        // parsed response body as js object 
        console.log(data);
        // raw response 
        console.log(response);
        Nodes.find({}).remove()
            .then(() => {
                Nodes.collection.insert(data.objects);
            });
    });


