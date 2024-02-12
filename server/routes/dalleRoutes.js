import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // dangerouslyAllowBrowser: true,
});


// router.route('/').get((req, res) => {
//     res.status(200).json({ message: 'Hello from DALL-E!' });
//   });
router.route('/').get((req, res) => {
  res.send('Hello from DALL-E');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("prompt", prompt)

    const aiResponse = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    console.log("res", aiResponse.data)

    const image = aiResponse.data.data[0].b64_json;

    console.log(image);
    res.status(200).json({ photo: 'image' });

  } catch (error) {
    // console.log(error.response.data);
    console.log('nahi chal raha')
    res.status(500).send(error?.response.data.error.message)

  }
})
export default router;