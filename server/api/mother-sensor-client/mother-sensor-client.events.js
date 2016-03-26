/**
 * MotherSensorClient model events
 */

'use strict';

import {EventEmitter} from 'events';
var MotherSensorClient = require('./mother-sensor-client.model');
var MotherSensorClientEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MotherSensorClientEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MotherSensorClient.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MotherSensorClientEvents.emit(event + ':' + doc._id, doc);
    MotherSensorClientEvents.emit(event, doc);
  }
}

export default MotherSensorClientEvents;
