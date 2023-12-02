'use strict';

const reg = require('../utils/reg');

module.exports = {
  register: {
    userName: {
      type: 'string',
      required: true,
      description: '用户名',
      example: 'test12345',
      format: reg.checkUserName,
    },
    pwd: {
      type: 'string',
      required: true,
      description: '密码',
      example: 'Test123456_',
      format: reg.checkPassword,
    },
  },
  registerDataType: {
    userName: { type: 'string', example: 'test12345' },
  },
  baseResponse: {
    code: { type: 'integer', required: true, example: 200 },
    data: { type: 'registerDataType', example: { userName: 'test12345' } },
    msg: { type: 'string', example: '请求失败' },
  },
};
