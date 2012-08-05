var recess = exports;

recess.data_connections = function data_connections(connections) {

  // Connections required
  if (!connections) {
    throw new Error('data_connections() a connections object is required');
  }

  return function data_connections(req, res, next) {
    req.storage = connections;
    next();
  };
};