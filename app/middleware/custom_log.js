'use strict';

const fs = require('fs');
const path = require('path');

module.exports = () => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const req = ctx.request;
    const res = ctx.response;
    await next();
    const log = {
      method: req.method,
      url: req.url,
      host: req.header.host,
      responeStatus: res.status,
      data: res.body,
      timeLen: Date.now() - sTime,
    };
    const data = ctx.app.utils.time.currentDateTime() + '[test-httpLog]' + JSON.stringify(log) + '\r\n';
    // const data = dayjs(sTime).format('YYYY-MM-DD HH:mm:ss') + '[test-httpLog]' + JSON.stringify(log) + '\r\n';
    if (ctx.app.env === 'local') {
      // 为让egg-logrotator可以分割自定义log, 文件名格式为.log.YYYY-MM-DD
      fs.appendFileSync(path.resolve(ctx.app.baseDir, `./logs/${ctx.app.name}/customLog-local.log.${ctx.app.utils.time.currentDate()}`), data);
    } else {
      fs.appendFileSync(path.resolve(ctx.app.baseDir, `./logs/${ctx.app.name}/customLog-prod.log.${ctx.app.utils.time.currentDate()}`), data);
    }
  };
};
