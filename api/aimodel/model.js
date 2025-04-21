require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_AI_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" }) //see all models: https://ai.google.dev/gemini-api/docs/models#gemini-2.5-flash-preview

module.exports = model