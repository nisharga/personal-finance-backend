const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

// Nisharga Kabir
app.post("/chat", (req, res) => {
  const question = req.body.question;
  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 1500,
      temperature: 1,
    })
    .then((response) => {
      return response?.data.choices?.[0]?.text;
    })
    .then((answer) => {
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());
      return array;
    })
    .then((answer) => {
      res.json({ answer, question });
    });
});

app.listen(port, () => {
  console.log("port listen:", port);
});
