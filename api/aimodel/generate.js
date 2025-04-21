const model = require('./model')
const generateTextContent = async (promt) => {
  const result = await model.generateContent(promt);

  return result.response.text()
}

module.exports = generateTextContent