var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
// format the github api url
apiUrl = "https://api.github.com/users/" + user + "/repos";


// make a request to the url
fetch(apiUrl).then(function(response){
  if(response.ok) { 
response.json().then(function(data) {
    //console.log(data);
 

      displayRepos(data, user);
    
   });
  }else{
    alert("Error: Github User Not Found");
  }
 })
 .catch(function(error) {
   //  Notice this `.catch()` getting chained onto the end of the `.then()`
   alert("unable to connect to GitHub");
   console.log(error);
 });
};

var displayRepos = function(repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositiries found for this user.";
    return;
  }
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  // loop over repos
  for (i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement('a');
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repo name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);
    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = "flex-row align-center";

    // check if curent repo has issues or not
    if(repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
       "<i class='fas fa-times status-icon icon-danger'></i>"  + " "  + repos[i].open_issues_count +  " " +  "issues(s)";
    }else {
      statusEl.innerHTML = "<i class= 'fas fa-check-square status-icon icon-success'></i>";
    }
//  append statusEl to the repoEl container
repoEl.appendChild(statusEl);

    // append container to dom
    repoContainerEl.appendChild(repoEl);

  }

};

var formSubmitHandler = function(event) {
  event.preventDefault();
 var username = nameInputEl.value.trim();

 if(username) {
   getUserRepos(username);
   nameInputEl.value = "";
 }else {
   alert("please enter a GitHub username");
 }
};


userFormEl.addEventListener("submit", formSubmitHandler);
