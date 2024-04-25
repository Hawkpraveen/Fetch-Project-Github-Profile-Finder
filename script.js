//getting all elements
const userInput = document.getElementById("username");
const getDetailsBtn = document.getElementById("getdetails");
const profile = document.getElementById("profile");
const repo = document.getElementById("repo");

// getting user name from input and
// using async function to fetch details from github

getDetailsBtn.addEventListener("click", async () => {
  const userName = userInput.value;
  //console.log(userName);

  //using github api to fetch profile details
  //from the server

  const res = await fetch(`https://api.github.com/users/${userName}`);
  const res1 = await res.json();
  //console.log(res1);
  getprofile(res1);
  getrepo(userName);
});

function getprofile(data) {
  //console.log(data);

  //displaying the profile details in card

  profile.innerHTML = `<div class="card mb-3">
    <div class="card-img">
    <img src=${data.avatar_url} alt="${data.name}">
    </div>
    <div class="card-body">
    <div class="card-title">User Name: ${data.name}</div>
    <div class="card-subHeading">User ID: ${data.login}</div>
    <div class="card-text">
    <p>User Bio : ${data.bio}</p>
    <p><i class="fa-solid fa-user-group fa-lg"></i>&nbsp;${data.followers} Followers . ${data.following} Following
    </p>
    <p>
    Location <i class="fa-solid fa-location-dot fa-lg"></i> : &nbsp;  ${data.location}
    </p>  
    <button>
    <a href=${data.html_url} target="_blank">Visit Profile</a>
    </button>
    </div>
    </div>
    </div>
    `;
}

//getting repo
async function getrepo(userName){
    //getting user Name
//console.log(userName);

const result= await fetch(`https://api.github.com/users/${userName}/repos`)
const repository= await result.json();
//console.log(repository);

for(let i=0;i<repository.length;i++)
{
    repo.innerHTML +=`
    <div class="card text-center">
    <div class="card-body py-2 ">
    <div class="card-title fs-3">Repository Name : ${repository[i].name}</div>
    <div class="card-subHeading fs-4">Used Languages: ${repository[i].language}</div>
    <div class="card-text">
    <button>
    <a href=${repository[i].html_url} target="_blank">Visit Repository</a>
    </button>
    </div>
    </div>
    </div>
    `
}
}