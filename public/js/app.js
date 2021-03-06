let auth0 = null;

// getting data from the auth_config.json and storing it in fetchAuthConfig
const fetchAuthConfig = () => fetch("/auth_config.json");

// 
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

window.onload = async () => {
  await configureClient();

  // update the UI state
  updateUI();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // show the gated content
    return;
  }

  // check for the code and state parameters
  const query = window.location.search;
  // console.log("This is query:", query);
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();
  // console.log("isAuthenticated?:", isAuthenticated);


  document.getElementById("btn-logout").hidden = !isAuthenticated;
  document.getElementById("btn-login").hidden = isAuthenticated;

  // if the user is logged in and on the edit page all the divs except edit.js's are hidden
  if (isAuthenticated && URLValue == 'edit') {
    document.getElementById("ipt-user-profile3").textContent = 'Logged in...Welcome '+capitalizeName(JSON.stringify(await auth0.getUser()));
    document.getElementById("gated-content-1").classList.add("hidden");
    document.getElementById("gated-content-2").classList.add("hidden");
    document.getElementById("gated-content-3").classList.remove("hidden");
    document.getElementById("gated-content-4").classList.add("hidden");
    document.getElementById("navBar").classList.remove("hidden");

  }

  // if the user is logged in and on the create page all the divs except create.js's are hidden
  else if (isAuthenticated && URLValue == 'create') {  
    document.getElementById("ipt-user-profile4").textContent = 'Logged in...Welcome '+capitalizeName(JSON.stringify(await auth0.getUser()));
    document.getElementById("gated-content-1").classList.add("hidden");
    document.getElementById("gated-content-2").classList.add("hidden");
    document.getElementById("gated-content-3").classList.add("hidden");
    document.getElementById("gated-content-4").classList.remove("hidden");  
    document.getElementById("navBar").classList.remove("hidden");

  }

  // if the user is logged in and on the list page all the divs except list.js's are hidden
  else if (isAuthenticated && URLValue == 'list') {
    document.getElementById("ipt-user-profile1").textContent = 'Logged in...Welcome '+capitalizeName(JSON.stringify(await auth0.getUser()));
    document.getElementById("gated-content-1").classList.remove("hidden");
    document.getElementById("gated-content-2").classList.add("hidden");
    document.getElementById("gated-content-3").classList.add("hidden");
    document.getElementById("gated-content-4").classList.add("hidden");
    document.getElementById("navBar").classList.remove("hidden");

  }

  // this case is just for when the user logs in and URLValue is not specified
  else if (isAuthenticated) {
    document.getElementById("ipt-user-profile1").textContent = 'Logged in...Welcome '+capitalizeName(JSON.stringify(await auth0.getUser()));
    document.getElementById("gated-content-1").classList.remove("hidden");
    document.getElementById("gated-content-2").classList.add("hidden");
    document.getElementById("gated-content-3").classList.add("hidden");
    document.getElementById("gated-content-4").classList.add("hidden");
    document.getElementById("navBar").classList.remove("hidden");


    // prints out the access token to the HTML
    // document.getElementById("ipt-access-token").innerHTML = await auth0.getTokenSilently();

    // prints the user's information to the HTML
    // document.getElementById("ipt-user-profile").textContent = JSON.stringify(await auth0.getUser());
  }

  // adds hidden to all divs except the one telling the user that they're logged out
  else {
    document.getElementById("gated-content-1").classList.add("hidden");
    document.getElementById("gated-content-2").classList.remove("hidden");
    document.getElementById("gated-content-3").classList.add("hidden");
    document.getElementById("gated-content-4").classList.add("hidden");
    document.getElementById("navBar").classList.add("hidden");
  }
};

// on login, the url will be http://localhost:3000/?type=task
const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin+'/?type=task'
  });
};

// on logout, the url will also be http://localhost:3000/?type=task so the alert isnt triggered
const logout = () => {
  auth0.logout({
    returnTo: window.location.origin+'/?type=task'
  });
};

// clears the localStorage
function clr() {
  localStorage.clear();
}

function capitalizeName(name) {
  var parsedName = JSON.parse(name);
  var cap = parsedName['nickname'];
  var newName = cap[0].toUpperCase()+cap.substring(1);
  return newName;
}