var branches = ['master'];
$(document).ready(function(){

  generateGitViz(branches);                         // generate visualization

  $('input[name=add_branch]').click(function(event){  // handle when a new branch is added
    console.log('test');
    event.preventDefault();                         // prevent form from submitting
    branches.push($('input[name=branch]').val());   // add new branch to Global array
    generateGitViz(branches);                       // regenerate visualization
    $('input[name=branch]').val('');                // remove text from input
  });
 
  $('h1').click(function(){                         // refresh the visualization if you click the main heading
    generateGitViz(branches);
  });

});//end document load

/** 
 * Generates a visualization of the local git repository by examining the contents
 * of each ref/head file within the .git directory, parsing out commit details
 *
 * @param arr branches to look for within ref/head
 */
function generateGitViz(arr) {
  $('body > .branch').remove();                             // remove previously added branches

   arr.forEach(function(branch){                            // cycle over each branch
    $.get('.git/logs/refs/heads/'+branch,function(data){    // request the relevant file
      // to do: if a ref/head is not found, remove from global branches variable

      $('body').append('<div id="'+branch+'" class="branch"><h2>'+branch+'</h2><ol reversed></ol></div>');
      data.match(/(.+)\n/g).forEach(function(c,i){          // process each line of the file
        // console.log(c);
        $('#'+branch+" ol").prepend( "<li class=\"commit_" + i + 
          "\" data-type=\"" + c.match(/-[0-9]{4}\W([^:]+):/)[1] + 
          "\"data-title=\"" + c.match(/-[0-9]{4}\W[^:]+:\W(.*)/)[1] +"\">" + 
          c.match(/^\w+\W(\w+)\W/)[1].substring(0,8) + "</li>");  // add an li for each commit
          // c.match(/-[0-9]{4} ([^:]+):/)[1]                     // type
          // c.match(/-[0-9]{4} [^:]+: (.*)/)[1]                  // msg
      }); //end match commits
    });//end get heads data
  });//end branch processing
}