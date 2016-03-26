/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mother-sensor-clients              ->  index
 * POST    /api/mother-sensor-clients              ->  create
 * GET     /api/mother-sensor-clients/:id          ->  show
 * PUT     /api/mother-sensor-clients/:id          ->  update
 * DELETE  /api/mother-sensor-clients/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import MotherSensorClient from './mother-sensor-client.model';
import Feed from '../feeds/feeds.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      console.log(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of MotherSensorClients
export function index(req, res) {
  return MotherSensorClient.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single MotherSensorClient from the DB
export function show(req, res) {
  return MotherSensorClient.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new MotherSensorClient in the DB
export function create(req, res) {
    console.log(req.body);
  return MotherSensorClient.create(req.body)
    .then(saveFeed(req.body))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function saveFeed(data) {
    Feed.create(data, function(err, feed){
        if(err) console.log(err);
    });
}

// Updates an existing MotherSensorClient in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MotherSensorClient.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a MotherSensorClient from the DB
export function destroy(req, res) {
  return MotherSensorClient.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
