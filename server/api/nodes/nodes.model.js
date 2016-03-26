'use strict';

import mongoose from 'mongoose';

var NodesSchema = new mongoose.Schema({
  url: String,
  uid: String,
  createdAt: String,
  updatedAt: String,
  label: String,
  paused: Boolean,
  subscribes: [{
      object: String,
      url:String,
      uid:String,
      label: String,
      type:String,
      used:Boolean
  }],
  publishes:[{
      object: String,
      url:String,
      uid:String,
      label: String,
      type:String,
      used:Boolean
  }],
  resource: { type:String,
      slug:String
    }
});

export default mongoose.model('Nodes', NodesSchema);
