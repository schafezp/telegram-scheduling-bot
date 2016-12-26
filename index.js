const TeleBot = require('telebot');
const api_secret = require('./api_secret');
const bot = new TeleBot(api_secret.api_key);
var users = [];
var events = [];

// On commands
bot.on(['/start', '/back'], msg => {
  
    let markup = bot.keyboard([
        ['/send'],
    ['/one', '/two']
  ], { resize: true });
  
    return bot.sendMessage(msg.from.id, 'Keyboard example.', { markup });

});

bot.on('/send' , msg => {
    var message = msg.text;
    var end = message.length;
    message = message.slice(5,end);
    return bot.sendMessage(msg.from.id, message);
});

bot.on('/storetest' , msg =>{
    var userArray = {firstName:msg.from.first_name,lastName:msg.from.last_name,username:msg.from.username};
    var message = userArray.firstName.concat(" ",userArray.lastName," , ",userArray.username)
    return bot.sendMessage(msg.from.id, message);
    
});
bot.on('/store' , msg => {
    var message = "";
    var userArray = {firstName:msg.from.first_name,lastName:msg.from.last_name,userName:msg.from.username,id:msg.from.id};
    if (checkDuplicateUser(userArray.id) == false)
        users.push(userArray);
    for (var i = 0; i<users.length; i++){
        message = message.concat(users[i].firstName," ",users[i].lastName," , ",users[i].userName,"\n");
    }
    return bot.sendMessage(msg.from.id, message);
});


bot.on('/stEvent' , msg => {
    //format of inMes /stEvent month(xx)/day(xx)/year(xxxx) time:24:00: text:reminder: user:username(no @):
    var currentTime = new Date();
    var inMes = msg.text;
    inMes = inMes.replace("/stEvent","");
    var month = inMes.substring(inMes.indexOf("/")-2,inMes.indexOf("/"));
    var day = inMes.substring(inMes.lastIndexOf("/")-2,inMes.lastIndexOf("/"));
    var year = inMes.substring(inMes.lastIndexOf("/")+1,inMes.lastIndexOf("/")+5);
    
    var startPos = inMes.indexOf("text:") + 5;
    var endPos = inMes.indexOf(":",startPos);
    var remindertext = inMes.substring(startPos , endPos);
    
    var id = msg.from.id;
    var userName = msg.from.username;
    if (inMes.includes("user:")){
        var userExistsFlag = false;
        startPos = inMes.indexOf("user:") + 5;
        endPos = inMes.indexOf(":",startPos);
        username = inMes.substring(startPos, endPos);
        for ( i = 0; i < users.length; i++ ){
            if (userName == users[i].userName){
                id = users[i].id;
                userExistsFlag = true;
            }}
        if (userExistsFlag == false){
            return bot.sendMessage(msg.from.id, "The user: ".concat(userName," does not exist"));
        }
    }
    var hour = currentTime.getHours()+1;
    var minute = 0;
    if (inMes.includes("time:")){
        startPos = inMes.indexOf("time:") + 5;
        endPos = inMes.indexOf(":",startPos);
        hour = inMes.substring(startPos, endPos);
        minute = inMes.substring(endPos+1,endPos+3);
    }
    
    if (checkDuplicateEvent(remindertext) == false){
        var time = new Date(year, month-1, day, hour, minute, 0);
        var job = sch.scheduleJob(time,function(){
            bot.sendMessage(id, remindertext);
        });
        var eventArray = {month:month, day:day, year:year, text:remindertext, event:job};
        events.push(eventArray);
    }
    var oMes = "";
    oMes = oMes.concat("I will remind you to ",remindertext," on ",month,"/",day,"/",year, " at ", hour, ":",minute);
    
    return bot.sendMessage(msg.from.id, oMes);
});

    function checkDuplicateEvent(event){
        var i = 0;
        for ( i = 0; i < users.length; i++ ){
            if (user == events[i].text)
                return true;
        }
        return false
    }
    
    function checkDuplicateUser(user){
        var i = 0;
        for ( i = 0; i < users.length; i++ ){
            if (user == users[i].id)
                return true;
        }
        return false
    }
// Buttons
bot.on('/one', msg => {

    let markup = bot.keyboard([
        ['/A','/B'],['/start']
    ], { resize: true });
    return bot.sendMessage(msg.from.id, 'Teesting', { markup });
});

bot.on('/two', msg => {

    let markup = bot.keyboard([
        ['/red','/blue'],['/start']
    ], { resize: true });
    return bot.sendMessage(msg.from.id, 'Teesting', { markup });
});

bot.on('/A', msg => {

    let markup = bot.keyboard([
        ['/start']
    ], { resize: true });
    return bot.sendMessage(msg.from.id, 'a', { markup });
});

bot.on('/B', msg => {

    let markup = bot.keyboard([
        ['/start']
    ], { resize: true });
    return bot.sendMessage(msg.from.id, 'b', { markup });
});

bot.on('/red', msg => {

    let markup = bot.keyboard([
        ['/start']
    ], { resize: true });
    return bot.sendMessage(msg.from.id, 'read', { markup });
});

bot.on('/blue', msg => {

    let markup = bot.keyboard([
        ['/start']
    ], { resize: true });
    return bot.sendMessage(msg.from.id, 'blew', { markup });
});
// Hide keyboard
bot.on('/hide', msg => {
  return bot.sendMessage(
    msg.from.id, 'Hide keyboard example. Type /back to show.', { markup: 'hide' }
  );
});

// On location on contact message
bot.on(['location', 'contact'], (msg, self) => {
  return bot.sendMessage(msg.from.id, `Thank you for ${ self.type }.`);
});

// Inline buttons
bot.on('/inKeyboard', msg => {

  let markup = bot.inlineKeyboard([
    [
      bot.inlineButton('callback', { callback: 'this_is_data' }),
      bot.inlineButton('inline', { inline: 'some query' })
    ], [
      bot.inlineButton('url', { url: 'https://telegram.org' })
    ]
  ]);

  return bot.sendMessage(msg.from.id, 'Inline keyboard example.', { markup });

});

// Inline button callback
bot.on('callbackQuery', msg => {
  // User message alert
  return bot.answerCallback(msg.id, `Inline button callback: ${ msg.data }`, true);
});

// Inline que
bot.on('inlineQuery', msg => {

  const query = msg.query;
  const answers = bot.answerList(msg.id);

  answers.addArticle({
    id: 'query',
    title: 'Inline Query',
    description: `Your query: ${ query }`,
    message_text: 'Click!'
  });

  return bot.answerQuery(answers);

});

bot.connect();
