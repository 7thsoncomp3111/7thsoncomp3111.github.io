//Pre-compile
var source   = $("#questionTemplate").html();
var template = Handlebars.compile(source);
//Execution
var context = [
              {title: "Picture Post", body: "<img src='images/4.jpg'>", time: "posted just now"},
              {title: "Another Post", body: "Who is the founder of Microsoft?", time: "posted 3 days ago"},
              {title: "My First Post", body: "Who is the founder of Google?", time: "posted 1 week ago"}
              ];
var html;

function genNum(){
  var maximum = 10, minimum = 1;
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function genComments(){
  var raw = "", max = Math.floor(Math.random() * (20 + 1)), nestNum = 0, randWord = 0,
  word = ["Wow!","So cool!","Nice!","So good!","Yay!","Good!"];
  for(var i=0; i<max ;i++){
    nestNum = Math.floor(Math.random() * (3 + 1));
    for(var j=0; j<nestNum; j++){
      randWord = Math.floor(Math.random() * (word.length-1 + 1));
      raw = raw + '<div class="comment level'+j+'">' + word[randWord] + '</div>';
    }
  }
  return raw;
}

function countTags(s, t){
  var ms = s.split('</'+t+'>');
  return ms.length-1;
}

// function makeId()
// {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for( var i=0; i < genNum()+10; i++ )
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return text;
// }

function genImg(){
  var imgs = ['1.jpg','2.jpg','3.jpg','4.jpg','5.png','6.jpg','7.jpg'];
  return '<img src="images/'+imgs[Math.floor(Math.random() * (imgs.length))]+'">';
}

function genTitle(){
  var titles = ["Wow","So cool","Nice","So good","Yay","Good","This","That"];
  return titles[Math.floor(Math.random() * (titles.length))];
}

//Generate random contexts
function genContexts(){
  for(var i=0; i<genNum(); i++){
    var title, body, time;
    title = genTitle();
    body = genTitle() + ". " + genTitle() + ".";
    if(genNum()-genNum()<0){
      body += genImg();
    }
    time = "posted " + genNum() + " weeks";
    time+=" ago";
    context.push({title: title, body: body, time: time});
  }
}

function extractImg(s){
  var regex = /<img.*?src='(.*?)'/;
  var src = regex.exec(s)[1];
  return '<div class="question"><div class="body"><img src="'+src+'"</div></div>';
}

genContexts();

// Sort posts by time
function compare_time(a,b) {
  return a-b;
}

//context.sort(compare_time);

for(var i=0; i<context.length; i++){
  context[i].index = i;
  context[i].up = genNum()*genNum()*genNum();
  context[i].down = genNum()*genNum()*genNum();
  context[i].comments = genComments();
  context[i].replies = countTags(context[i].comments,'div');
  context[i].views = genNum()*genNum();
  context[i].activity = Math.round((context[i].up-context[i].down)*0.1 + context[i].replies*0.45 + context[i].views*0.45);
  html = template(context[i]);
  if(context[i].time.indexOf("now")!=-1){
    html = html.replace("question","question now");
  }
  $("#questionList").append(html);
}
// Sort posts by activity
function compare_activity(a,b) {
  return parseInt(b.activity)-parseInt(a.activity);
}

context.sort(compare_activity);
for(var i=0; i<context.length; i++){
    html = '<div class="question"><div class="body">'+context[i].body+'<p><strong>Activity:</strong> '+context[i].activity+'</p>'+'</div></div>';
    $("#questionListTop").append(html);
}

//Format comments voting
voting = '<div class="voting"><a href="" class="glyphicon glyphicon-thumbs-up up"></a> <a href="" class="glyphicon glyphicon-thumbs-down down"></a></div>';
$(".comment").append(voting);
