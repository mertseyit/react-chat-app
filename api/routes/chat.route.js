const router = require('express').Router()
const { status } = require('http-status')
const generateTextContent = require('../aimodel/generate')
const generateCurrentDate = require('../utils/generateCurrentDate')

router.post('/speak', async (req,res, next) => {
  try {
    const { message } = req.body
    const chatContent = await generateTextContent(`${message}`)
    res.status(status.OK).json({
      message:"success",
      status:status.OK,
      data:{
        msg:chatContent,
        time: generateCurrentDate()
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router