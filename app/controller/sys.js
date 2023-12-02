'use strict';
const BaseController = require('./base');
const HttpException = require('../exception/http');
/**
 * @Controller 系统管理
 */

class SysController extends BaseController {
  /**
	* @Summary 注册
	* @Description 注册
	* @Router POST /sys/register
  * @request body register *body
	* @Response 200 baseResponse 创建成功
  * @response 500 failResponse 创建失败
 	*/
  async register() {
    const { ctx } = this;
    // 参数校验统一放在controller
    // const errors = this.app.validator.validate({
    //   userName: { type: 'string', required: true, format: /^[a-zA-Z0-9_]{8,16}$/ },
    //   pwd: { type: 'string', requried: true, format: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?.&_-])[\w$@$!%*?.&-]{8,16}/ },
    // }, ctx.params);
    console.log('this.app.utils.reg', this.app.utils.reg);
    const errors = this.app.validator.validate(ctx.rule.register, ctx.params);
    if (errors) {
      console.log('errors', errors);
      throw new HttpException(500, '参数校验异常', null, 500);
    }
    const data = await ctx.service.sys.register();
    this.success(data);
  }
  async login() {
    const { ctx } = this;
    const data = await ctx.service.sys.login();
    this.success(data);
  }
}

module.exports = SysController;
