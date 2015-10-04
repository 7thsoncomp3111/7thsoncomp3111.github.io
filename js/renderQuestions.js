//Pre-compile
var source   = $("#questionTemplate").html();
var feed = $("#questionTemplateTop").html();
var template = Handlebars.compile(source);
var feedTemplate = Handlebars.compile(feed);
//Execution
var context = [
              {title: "My First Post", body: "Who is the founder of Google?"},
              {title: "Another Post", body: "Who is the founder of Microsoft?"},
              {title: "Picture Post", body: "<img src='images/seagull-205528_640.jpg'>"}
              ];
var html;
for(var i=0; i<context.length; i++){
  context[i].index = i;
  html = template(context[i]);
  $("#questionList").append(html);

}
// Pseudo: sort posts with an algorithm
html = feedTemplate(context[context.length-1]);
$("#questionListTop").append(html);
