const exppress = require('express')
const app = exppress()
const { status } = require('http-status')
const cors = require('cors')
require('dotenv').config()
const chatRouter = require('./routes/chat.route')
app.use(cors())

app.use(exppress.json())

app.get('/', (req,res,next) => {
  try {
    res.status(status.OK).json({
      message:"Server Running",
      status:status.OK,
      data:null
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.use('/chat', chatRouter)


app.listen(process.env.API_PORT, () => {
  console.log(`app is running on http://${process.env.API_HOST}:${process.env.API_PORT}/`)
})