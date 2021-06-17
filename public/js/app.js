let auth0 = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

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
  console.log("This is query:", query);
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
  console.log("isAuthenticated?:", isAuthenticated);

  document.getElementById("btn-logout").hidden = !isAuthenticated;
  document.getElementById("btn-login").hidden = isAuthenticated;

  // add logic to show/hide gated content after authentication
  if (isAuthenticated && URLValue == 'edit') {
    console.log("URLValue is edit");
    document.getElementById("gated-content-1").classList.add("hidden");
    document.getElementById("gated-content-2").classList.add("hidden");
  }
  else if (isAuthenticated && URLValue == 'create') {  
    console.log("URLValue is create");
    document.getElementById("gated-content-2").classList.add("hidden");
  }
  else if (isAuthenticated) {
    document.getElementById("gated-content-1").classList.remove("hidden");
    document.getElementById("gated-content-2").classList.add("hidden");

    // document.getElementById("ipt-access-token").innerHTML = await auth0.getTokenSilently();

    // document.getElementById("ipt-user-profile").textContent = JSON.stringify(await auth0.getUser());

  }
  else {
    document.getElementById("gated-content-1").classList.add("hidden");
    document.getElementById("gated-content-2").classList.remove("hidden");
    
  }
};

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin+'/?type=task'
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin+'/?type=task'
  });
};
