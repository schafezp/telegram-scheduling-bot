const TeleBot = require('telebot');
const bot = new TeleBot('300253032:AAEO8X4HOmNlzFA6_dfS5avAoR7h7MfBly4');
bot.on('/hello', msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let reply = msg.message_id;
    return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});
bot.connect();
