# telegram_feed_reader

[![environment](https://img.shields.io/badge/environment-Telegram-blue.svg?logo=telegram)](https://img.shields.io/badge/environment-Telegram-blue.svg?logo=telegram)

A simple Telegram bot to feed posts of blog ["A Ponte"](https://medium.com/a-ponte) in Medium.

The bot have some commands

1. `/last_post` --> retrieve last published blog post
1. `/lists_posts` --> list all posts published
1. `@a_ponte_bot` --> inline Query to search a specific post

## Installation

This bot not yet published, so is necessary to download code and run locally
```bash
# Download
curl -LJO https://github.com/frankjuniorr/telegram_feed_reader/archive/master.zip
# unzip file
unzip telegram_feed_reader-master.zip
# enter in directory
cd telegram_feed_reader-master.zip
# install node dependencies
npm install
# create a empty file constants.js
touch constants.js
```

The bot token is in `constants.js`. So, is necessary create a new bot in Telegram, get Token, e write in `constants.js` this lines:

```javascript
module.exports = {

  TELEGRAM_BOT_TOKEN : '<YOUR_TOKEN_HERE>',
};
```

## Use

After is just `node app.js`

When bot is running, just type `@a_ponte_bot` in a Telegram search
