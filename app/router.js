'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.redirect('/', '/swagger-ui.html', 302);
  router.post('/sys/register', controller.sys.register);
  // router.get('/sys/login', controller.sys.login);
};
