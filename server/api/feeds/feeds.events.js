/**
 * Feeds model events
 */

'use strict';

import {EventEmitter} from 'events';
var Feeds = require('./feeds.model');
var FeedsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FeedsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Feeds.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FeedsEvents.emit(event + ':' + doc._id, doc);
    FeedsEvents.emit(event, doc);
  }
}

export default FeedsEvents;
