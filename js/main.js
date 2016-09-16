$(document).ready(function(){
  ['master','cam'].forEach(function(branch){
    $.get('.git/logs/refs/heads/'+branch,function(data){
      $('body').append('<div id="'+branch+'" class="branch"><h2>'+branch+'</h2><ol reversed></ol></div>');
      data.match(/(.+)\n/g).forEach(function(c,i){ 
        console.log(c);
        $('#'+branch+" ol").prepend( "<li class=\"commit_" + i + 
          "\" data-type=\"" + c.match(/-[0-9]{4}\W([^:]+):/)[1] + 
          "\"data-title=\"" + c.match(/-[0-9]{4}\W[^:]+:\W(.*)/)[1] +"\">" + 
          c.match(/^\w+\W(\w+)\W/)[1].substring(0,8) + "</li>");
          // c.match(/-[0-9]{4} ([^:]+):/)[1] //type
          // c.match(/-[0-9]{4} [^:]+: (.*)/)[1] //msg
      }); //end match commits
    });//end get heads data
  });//end branch processing
});//end document load