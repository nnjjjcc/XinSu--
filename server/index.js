//导入Express
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
//创建web服务器
const app = express();
// dotenv.config()读取一个.env文件，解析其内容，将.env文件中声明的环境变量合并进process.env，然后返回一个对象result。
require("dotenv").config();
//运行 CORS 中间件。
app.use(cors())
//Express 有一个内置 express.json() 方法，该方法返回一个 Express 中间件函数，将 JSON HTTP 请求体解析为 JavaScript 对象。
//// 解析此应用程序的 JSON 正文。确保在路由处理程序之前放置 app.use(express.json())！
app.use(express.json())
mongoose.connect(process.env.MONGO_URL, {
    // 一些兼容配置，必须加，你不写运行的时候会提示你加。
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connection Successfull")
    })
    .catch((err) => {
        console.log(err.message)
    })
//为了满足正式环境中的node服务的端口启动需求，有时候需要用到port环境变量，那么这时候就需要在node启动时，设置process.env.PORT。
//process.env.PORT：读取当前目录下环境变量port的值
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`)
})