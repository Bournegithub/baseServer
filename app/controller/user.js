'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async addScore() {
    const { ctx } = this;
    const resultAll = await ctx.service.score.addScore();
    ctx.body = resultAll;
  }
  async getScoreList() {
    const { ctx } = this;
    const resultAll = await ctx.service.score.getScoreList();
    // this.success(resultAll);
    ctx.body = resultAll;
  }
}

module.exports = UserController;
