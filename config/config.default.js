/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1700447316136_4128';

  // add your middleware config here
  config.middleware = [ 'params', 'errorHandler', 'customLog' ];

  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: [ '*' ],
  };
  config.customLoader = {
    utils: {
      directory: 'app/utils',
      inject: 'app',
      loadunit: true,
    },
  };
  config.errorHandler = {
    enable: true, // 中间件开启配置
    // match: '', // 设置请求中间件的请求路由
    ignore: '', // 设置不经过这个中间件的请求路由
  };
  // 日志分割
  config.logrotator = {
    filesRotateByHour: [], // list of files that will be rotated by hour
    hourDelimiter: '-', // rotate the file by hour use specified delimiter
    filesRotateBySize: [], // list of files that will be rotated by size
    maxFileSize: 50 * 1024 * 1024, // Max file size to judge if any file need rotate
    maxFiles: 10, // pieces rotate by size
    rotateDuration: 60000, // time interval to judge if any file need rotate
    maxDays: 7, // keep max days log files, default is `31`. Set `0` to keep all logs
  };
  // config.cors = {
  //   origin: '*', // 或者 origin: '*'  *代表所有来源都可访问
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 允许的请求方式  get、post等基本请求方式不需要设置
  // };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      // host: 'mariadb',
      host: '124.220.108.159',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'mariadb2Root3PWD6',
      // 数据库名
      database: 'base_db',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // config.jwt = {
  //   secret: '123456',
  // };
  /**
  * 配置swagger
  * @property {String} dirScanner - 插件扫描的文档路径
  * @property {String} basePath - api前置路由
  * @property {Object} apiInfo - 可参考Swagger文档中的Info
  * @property {Array[String]} apiInfo - 可参考Swagger文档中的Info
  * @property {Array[String]} schemes - 访问地址协议http或者https
  * @property {Array[String]} consumes - contentType的集合
  * @property {Array[String]} produces - contentType的集合
  * @property {Object} securityDefinitions - 安全验证，具体参考swagger官方文档
  * @property {Boolean} enableSecurity - 是否使用安全验证
  * @property {Boolean} routeMap - 是否自动生成route
  * @property {Boolean} enable - swagger-ui是否可以访问
  */
  config.swaggerdoc = {
    dirScanner: './app/controller', // 指定swaggerdoc从哪个目录开始检索,
    apiInfo: {
      title: 'base-server接口',
      description: 'base-server项目接口 swagger-ui for egg',
      version: '1.0.0',
    }, // 接口文档主要信息、描述、版本号
    schemes: [ 'http', 'https' ], // 协议
    // consumes: [ 'application/json' ], // 输出方式
    // produces: [ 'application/json' ],
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    // enableSecurity: false,
    // enableValidate:true, //是否开启参数校验（很遗憾虽然有这个api，但是功能没有实现)
    routerMap: true, // 是否自动注册路由（很香）
    enable: true,
  };
  // add your user config here
  const userConfig = {
    myAppName: 'base-server',
  };

  return {
    ...config,
    ...userConfig,
  };
};
