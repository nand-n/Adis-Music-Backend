const express = require('express');

const songRoute = require('./song.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/song',
    route: songRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
