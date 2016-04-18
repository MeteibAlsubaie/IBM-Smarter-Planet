'use strict';

import mongoose from 'mongoose';

var MotherSensorClientSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('MotherSensorClient', MotherSensorClientSchema);
