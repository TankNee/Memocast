export default {
  requestError: 'Request Error',
  301: 'Invalid Token',
  304: 'Traffic Limit',
  305: 'Storage Limit',
  2000: 'Parameter errors, usually missing parameters, or parameter errors',
  31001: 'Invalid Username',
  31002: 'Invalid Password',
  31004: 'Over Logging',
  74001: 'Fail to upload image'
}
/**
 200: 请求成功
 301: 无效的token或者没有token
 304：traffic limit
 305：storage limit
 3032：note count limit
 380：biz service expr
 30321：free service expr
 30322：VIP service expr
 31001: 无效的用户名
 31002：密码错误
 31004：登录频繁
 2000: 参数错误，通常是缺少参数，或者参数错误
 2001：内部错误，通常是服务端遇到无法出路的错误，或者未知错误
 2002：OSS错误，数据存储错误
 2003：逻辑错误，例如数据错误等
 2004：数据不存在错误
 2005：禁止访问，通常是用户权限问题
 2006：解压缩错误，通常是数据错误
 2007：上传限制错误，通常代表用户vip可能过期等
 2009：OAUTH错误，OAuth功能出错
 60000：系统错误
 **/
