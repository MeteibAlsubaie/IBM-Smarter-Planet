'use strict';

import mongoose from 'mongoose';

var FeedsSchema = new mongoose.Schema({
  profile: String,
  feedUid: String,
  dateServer: String,
  dateEvent: String,
  type: String,
  payload: String,
  nodeUid: String,
  data: {
      body: String,
      code: Number,
      centidegreeCelsius: Number
  }
});

export default mongoose.model('Feed', FeedsSchema);
