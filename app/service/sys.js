
const Service = require('egg').Service;
const HttpException = require('../exception/http');

class SysService extends Service {
  async register() {
    const { ctx } = this;
    const { userName, pwd } = ctx.params;
    // 参数校验 将参数校验统一放在controller层减少代码逻辑 代码保持整洁
    // ctx.validate({
    //   userName: { type: 'string', required: true, format: /^[a-zA-Z0-9_]{8,16}$/ },
    //   pwd: { type: 'string', requried: true, format: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?.&_-])[\w$@$!%*?.&-]{8,16}/ },
    // }, ctx.params);
    // 第二种写法便于异常处理
    // const errors = this.app.validator.validate({
    //   userName: { type: 'string', required: true, format: /^[a-zA-Z0-9_]{8,16}$/ },
    //   pwd: { type: 'string', requried: true, format: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?.&_-])[\w$@$!%*?.&-]{8,16}/ },
    // }, ctx.params);
    // if (errors) {
    //   console.log('errors', errors);
    //   throw new HttpException(500, '参数校验异常', null, 500);
    // }
    // userName 查重
    const queryResult = await this.app.mysql.query('select * from user where userName = ?', [ userName ]);
    // console.log('queryResult', queryResult);
    if (queryResult && queryResult.length > 0) {
      throw new HttpException(500, '用户名已存在', null, 500);
    }
    // 密码加密
    const obj = {
      userName,
      pwd: ctx.service.user.getMd5Data(pwd),
      createDateTime: this.app.utils.time.currentDateTime,
    };
    // 插入数据
    // creatUser creatDateTime
    const registerResult = await this.app.mysql.insert('user', obj);
    console.log('registerResult', registerResult);
    if (!registerResult.insertId) {
      throw new HttpException(500, '注册失败', null, 500);
    } else {
      return { userName };
    }
  }
  async login() {
    const { ctx } = this;
    const { creatdate, userid, divinationid, score, randomtext } = ctx.params;
    const scoreObj = {
      creatdate, userid, divinationid, score, randomtext,
    };
    const addResult = await this.app.mysql.insert('score', scoreObj);
    console.log('addResult.insertId', addResult.insertId);
    return addResult;
  }
  async getScoreList() {
    const { ctx } = this;
    const { userid } = ctx.params;
    const listResult = await this.app.mysql.select('score', {
      columns: [ 'id', 'userid', 'score', 'creatdate', 'divinationid', 'randomtext' ], // 查询字段，全部查询则不写，相当于查询*
      where: {
        userid,
      }, // 查询条件
      orders: [
        [ 'id', 'desc' ], // 降序desc，升序asc
      ],
      limit: 7, // 查询条数
      offset: 0, // 数据偏移量（分页查询使用）
    });
    console.log('listResult', listResult);
    if (listResult && listResult.length) {
      listResult.forEach(item => {
        item.creatdate = item.creatdate.match(/(\S*)/)[1];
      });
    }
    return listResult.length > 0 ? listResult : [];
  }
}

module.exports = SysService;
