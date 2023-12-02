/*
	@定义异常基类，构造函数中接收参数，初始化成员变量
	{
		"code": xxx,
		"msg": "xxx",
		"data": xxx
	}
*/

class HttpException extends Error {
  constructor(code = 50000, message = '服务器异常', data = null, httpCode = 500) {
    super();
    this.code = code; // 自定义状态码
    this.msg = message; // 自定义返回消息
    this.data = data; // 自定义返回数据
    this.httpCode = httpCode; // http状态码
  }
}
module.exports = HttpException;

