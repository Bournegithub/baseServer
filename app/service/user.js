
const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {
  // 对数据进行md5加密，输入明文返回密文
  getMd5Data(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }
  async addUser() {
    const { ctx } = this;
    const { userName, password } = ctx.params;
    const userObj = {
      userName, password,
    };
    const addResult = await this.app.mysql.insert('user', userObj);
    return addResult;
  }
  // async addScore() {
  //   const { ctx } = this;
  //   const { creatdate, userid, divinationid, score, randomtext } = ctx.params;
  //   const addResult = await this.app.mysql.insert('score', scoreObj);
  //   console.log('addResult', addResult);
  //   return addResult;
  // }
  // async getScoreList() {
  //   const { ctx } = this;
  //   const { userid } = ctx.params;
  //   const listResult = await this.app.mysql.select('score', {
  //     columns: [ 'id', 'userid', 'score', 'creatdate', 'divinationid', 'randomtext' ], // 查询字段，全部查询则不写，相当于查询*
  //     where: {
  //       userid,
  //     }, // 查询条件
  //     orders: [
  //       [ 'id', 'desc' ], // 降序desc，升序asc
  //     ],
  //     limit: 7, // 查询条数
  //     offset: 0, // 数据偏移量（分页查询使用）
  //   });
  //   console.log('listResult', listResult);
  //   if (listResult && listResult.length) {
  //     listResult.forEach(item => {
  //       item.creatdate = item.creatdate.match(/(\S*)/)[1];
  //     });
  //   }
  //   return listResult.length > 0 ? listResult : [];
  // }
}

module.exports = UserService;
