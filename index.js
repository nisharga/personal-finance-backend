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

// Nisharga Kabir in envy
app.post("/result", (req, res) => {
  const wants_buy = req.body.wants_buy;
  const money_need = req.body.money_need;
  const wait_years = req.body.wait_years;
  const salary_month = req.body.salary_month;
  const expenses = req.body.expenses;
  const expenses_amount_month = req.body.expenses_amount_month;
  const give_hours_for_dream = req.body.give_hours_for_dream;
  const can_do_it_from = req.body.can_do_it_from;
  const interested_in = req.body.interested_in;

  const result = `I wants to buy a ${wants_buy}, my salary is ${salary_month}/month. but i spend ${expenses_amount_month}/month I need ${money_need} in ${wait_years} years. Most expenses for me in ${expenses}. give me some ideas`;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: result,
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
      res.json({ answer });
    });
});

//sites looks
app.post("/sitelooks", (req, res) => {
  const wants_buy = req.body.wants_buy;
  const money_need = req.body.money_need;
  const wait_years = req.body.wait_years;
  const salary_month = req.body.salary_month;
  const expenses = req.body.expenses;
  const expenses_amount_month = req.body.expenses_amount_month;
  const give_hours_for_dream = req.body.give_hours_for_dream;
  const can_do_it_from = req.body.can_do_it_from;
  const interested_in = req.body.interested_in;

  const sites_to_looks_at = `i can give ${give_hours_for_dream} everyday from ${can_do_it_from}. i am interested in ${interested_in}. give me some idea how i earn money in 1 years, which type of skills i need to expert on that field. Suggest me some website also including youtube, discord`;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: sites_to_looks_at,
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
      res.json({ answer });
    });
});

//
app.post("/tips", (req, res) => {
  const wants_buy = req.body.wants_buy;
  const money_need = req.body.money_need;
  const wait_years = req.body.wait_years;
  const salary_month = req.body.salary_month;
  const expenses = req.body.expenses;
  const expenses_amount_month = req.body.expenses_amount_month;
  const give_hours_for_dream = req.body.give_hours_for_dream;
  const can_do_it_from = req.body.can_do_it_from;
  const interested_in = req.body.interested_in;

  const tips = `I expenses all money every month. i spend most of my money in ${expenses} . Provide me some tips about assets and liabilities. how i will savings my moeny`;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: tips,
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
      res.json({ answer });
    });
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log("port listen:", port);
});
