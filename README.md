## web_wda_mirror
我想做一个web客户端端，通过它实现网页上镜像iPhone并进行控制，其中要使用到WebDriverAgent这个库，通过这个来实现控制iPhone。

我使用xcode在手机中运行WebDriverAgent，并且运行appium --port 4723命令，把MJPEG server 映射到 9100 端口

===================== 相关配置 =====================

WDA_URL   = "http://127.0.0.1:8100"   # 触控

MJPEG_URL = "http://127.0.0.1:9100"   # 视频源

根据以上信息，请帮我完成项目，实现这个web客户端功能。

## 运行

1. 安装依赖: `npm install`
2. 启动服务: `npm start`
3. 浏览器访问 `http://localhost:3000` 查看镜像并点击控制

可以通过环境变量调整以下配置:

- `WDA_URL` (默认 `http://127.0.0.1:8100`)
- `MJPEG_URL` (默认 `http://127.0.0.1:9100`)
- `PORT` (默认 `3000`)
