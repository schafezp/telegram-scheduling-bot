const TeleBot = require('telebot');
const api_secret = require('./api_secret');
const bot = new TeleBot(api_secret.api_key);
bot.on('/hello', msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let reply = msg.message_id;
    return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});
bot.connect();
