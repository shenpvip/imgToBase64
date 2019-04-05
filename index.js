/*
 * @Author: shenpeng 
 * @Date: 2019-04-05 19:08:07 
 * @Last Modified by:   shenpeng 
 * @Last Modified time: 2019-04-05 19:08:07 
 */
const fs = require('fs')
const imgUrl = `./wxEmojis/`
const fileType = `gif`
const imagePrefix = `data:image/${fileType};base64,`
const { emojis } = require('./emojis')
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// 输出base64到txt
// let data = ''
// for (let i = 0; i < 105; i++) {
//   const rs = fs.createReadStream(imgUrl + i + `.${fileType}`)
//   const ws = fs.createWriteStream(`./${fileType}.txt`)
//   rs.on('data', function(chunk) {
//     // console.log(`正在读第${i}个文件`)
//     const val = imagePrefix + chunk.toString('base64')
//     data += `${i}：${val} \r\n \r\n`
//   })
//   rs.on('end', () => {
//     //监听状态
//     console.log(`第${i}个文件读取结束`)
//     ws.write(data)
//   })
// }

const arr = [...emojis]
for (let i = 0; i < 105; i++) {
  const rs = fs.createReadStream(imgUrl + i + `.${fileType}`)
  rs.on('data', function(chunk) {
    console.log(`正在读第${i}个文件`)
    const val = imagePrefix + chunk.toString('base64')
    arr[i][2] = val
  })
  rs.on('end', () => {
    //监听状态
    console.log(`第${i}个文件读取结束`)
  })
}

router.get('/', async (ctx, next) => {
  ctx.body = arr
  await next()
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('starting at port 3000')
})
