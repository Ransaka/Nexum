require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const Sentiment = require('sentiment');
const sentiment = new Sentiment();


app.post('/messages', (req, res) => {
  const { body } = req;
  const { text, name } = body;
  const result = sentiment.analyze(text);
  const comparative = result.comparative;

  const data = {
    text,
    name,
    timeStamp: new Date(),
    score: result.score,
  };
  try {
    pusher.trigger(['chat', 'rate','reply'], 'message', data);
  } catch (e) {}
  res.json(data);
});