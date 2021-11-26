var issuesContainerEl = document.querySelector("#issues-container");
// the function that makes displaying repos on page possible
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issuesContainerEl.innerHTML =" This repo has no open issues!";
        return;
    }
for(i=0; i < issues.length; i++) {
    // create a link element to take users to the issue on github 
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "blank");
  
    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");

    // check if issue is an actual issue or pull request
  if(issues[i].pull_request) {
      typeEl.textContent ="Pull request";
  }else {
      typeEl.textContent = "issue"
  }
  issueEl.appendChild(typeEl);
  issuesContainerEl.appendChild(issueEl);
}
};

// function to comunicate with git hub api end point
var getRepoIssues = function(repo) {
   var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
   
   fetch(apiUrl).then(function(response) {
       if(response.ok) {
           response.json().then(function(data) {
              displayIssues(data);
              console.log(data);
           });
       }else {
           alert("There was a problem with your request");
       }
   });
};
getRepoIssues("Sebastian2908-2007/employee-cms");