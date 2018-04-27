const TeleBot = require('telebot');
const constants = require('./constants.js');
const request = require('./request');

const bot = new TeleBot(constants.TELEGRAM_BOT_TOKEN);

// ========================================================
// /start - Exibe uma tela de ajuda com a lista de comandos
// ========================================================
bot.on('/start', msg => {

    const start_message = `*Olá ${msg.from.first_name}*
    Eu posso mostrar pra você facilmente os últimos posts publicados no blog "A Ponte".
    Você pode me controlar com os seguintes comandos:

    [/start](/start) - Mostra essa tela de ajuda
    [/last_post](/last_post) - Exibe o último post publicado
    [/list_posts](/list_posts) - Exibe a lista de todos os posts publicados`

    let id = msg.from.id;
    let parseMode = 'Markdown'
    let webPreview = false
    return bot.sendMessage(id, start_message, {parseMode, webPreview});
});

// ========================================================
// /last_post - Exibe o ultimo post publicado
// ========================================================
bot.on('/last_post', msg => {
    let id = msg.from.id;
    let postUrl = request.feedArray[0].url
    return bot.sendMessage(id, postUrl);
});

// ========================================================
// /list_posts - Exibe a lista de todos os posts publicados
// ========================================================
bot.on('/list_posts', msg => {
    let id = msg.from.id;

    let printPostArray = ""

    // pegando todos os posts do array
    let numero = 1
    for (var index in request.feedArray) {
      let postTitle = request.feedArray[index].title
      let postUrl = request.feedArray[index].url

      let printPost = `${numero}. [${postTitle}](${postUrl})`

      printPostArray = `${printPostArray}\n${printPost}`
      numero++
    }

    let parseMode = 'Markdown'
    let webPreview = false
    return bot.sendMessage(id, printPostArray, {parseMode, webPreview});
});

// ========================================================
// inlineQuery - Procura por um post específico por inline_query
// ========================================================
bot.on('inlineQuery', msg => {
  let query = msg.query;


    // essa 'dinamicList' é necessaŕia porque eu tive que fazer
    // a busca dinamica na mão. Quando o usuário digitar uma busca
    // ele procura na lista [request.feedArray] atraves do 'indexOf'
    // se encontrar, ele adiciona o objeto todo na [dinamicList]
    var feedArrayLenght = request.feedArray.length
    var dinamicList = []

    for (var j=0; j < feedArrayLenght; j++) {
      var title = request.feedArray[j].title.toLowerCase()
      if(query != ""){
        if (title.indexOf(query.toLowerCase()) >= 0){
          dinamicList.push(request.feedArray[j])
        }
      }
    }

    const answers = bot.answerList(msg.id, {cacheTime: 60});

    // A primeira vez, a [dinamicList] é sempre vazia porque o
    // usuário não digitou nada ainda.
    // se ela for vazia, exiba a lista da request [request.feedArray]
    // mas se não for vazia, é porque o usuário digitou algo, então exiba ela
    if(dinamicList.length == 0){
        showList(answers, request.feedArray)
      }else{
        showList(answers, dinamicList)
    }

    // Send answers
    return bot.answerQuery(answers);
});

// metodo que exibe a listagem do inlineQuery
function showList(answers, list) {
  for (var index in list) {
    let postTitle = list[index].title
    let postUrl = list[index].url
    let image = list[index].image
    let subtitle = list[index].subtitle

    // Article
    answers.addArticle({
        id: `query${index}`,
        title: `${postTitle}`,
        description: `${subtitle}`,
        message_text: `${postUrl}`,
        photo_url: `${image}`,
        thumb_url: `${image}`
    });

  }
}

bot.start();
