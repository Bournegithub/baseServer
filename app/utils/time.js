'use strict';

const dayjs = require('dayjs');

// 写法一
// module.exports = class Time {
//   constructor(app) {
//     this.app = app;
//     this.config = app.config;
//     this.logger = app.logger;
//   }
//   // 会被挂载为 `app.utils.time.currentDateTime()`
//   currentDateTime() {
//     const sTime = Date.now();
//     return dayjs(sTime).format('YYYY-MM-DD HH:mm:ss');
//   }
//   currentDate() {
//     const sTime = Date.now();
//     return dayjs(sTime).format('YYYY-MM-DD');
//   }
// };

// 写法二
// module.exports = app => {
//   console.log('app', app);
//   return {
//     currentDateTime() {
//       const sTime = Date.now();
//       return dayjs(sTime).format('YYYY-MM-DD HH:mm:ss');
//     },
//     currentDate() {
//       const sTime = Date.now();
//       return dayjs(sTime).format('YYYY-MM-DD');
//     },
//   };
// };

// 写法三
module.exports = {
  currentDateTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  currentDate: dayjs(Date.now()).format('YYYY-MM-DD'),
};
