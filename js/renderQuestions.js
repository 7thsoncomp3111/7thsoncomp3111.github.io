//Pre-compile
var source   = $("#questionTemplate").html();
var feed = $("#questionTemplateTop").html();
var template = Handlebars.compile(source);
var feedTemplate = Handlebars.compile(feed);
//Execution
var context = [
              {title: "Picture Post", body: "<img src='images/seagull-205528_640.jpg'>", time: "posted just now"},
              {title: "Another Post", body: "Who is the founder of Microsoft?", time: "posted 3 days ago"},
              {title: "My First Post", body: "Who is the founder of Google?", time: "posted 1 week ago"}
              ];
var html;
for(var i=0; i<context.length; i++){
  context[i].index = i;
  html = template(context[i]);
  if(context[i].time.indexOf("now")!=-1){
    html = html.replace("question","question now");
  }
  $("#questionList").append(html);

}
// Pseudo: sort posts with an algorithm
html = feedTemplate(context[0]);
$("#questionListTop").append(html);

//Format comments
voting = '<div class="voting"><a href="" class="glyphicon glyphicon-thumbs-up up"></a> <a href="" class="glyphicon glyphicon-thumbs-down down"></a></div>';
$(".comment").append(voting);
