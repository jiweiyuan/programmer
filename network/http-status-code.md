# HTTP 状态码

##### 1xx 信息态
##### 2xx 成功态
- 200 OK
- 201 Created
- 204 No Content

##### 3xx 重定向
- 301 Moved Permanently 永久重定向
- 302 Found 临时重定向
- 304 Not Modified 协商缓存(Get 请求 if-Match/if-Modified-Since/if-None-Match...)

##### 4xx 客户端错误
- 400 Bad Request 请求报文中存在语法错误
- 401 Unauthoried 未经许可
- 403 Forbidden 拒绝该次访问(没有访问权限)
- 404 Not Found 无法找到请求的资源
- 405 Method not Allowed 方法不被允许

##### 5xx 服务器错误
- 500 Inter Server Error 服务器解析错误
