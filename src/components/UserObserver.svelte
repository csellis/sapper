<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();

  onMount(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // console.log("User: ", user);
        //currentUser.set(user);
        session.update(currentStore => {
          currentStore.currentUser = user;
          return currentStore;
        });
        user.getIdToken().then(idToken => {
          sendTokenToServer(idToken, "csrfLaters");
        });
      } else {
        // User is signed out.
        // currentUser.set(null);
        session.update(currentStore => {
          currentStore.currentUser = null;
          return currentStore;
        });
        clearCookiesOnServer("csrfLaters");
        console.log("Signed out");
      }
    });
  });

  async function clearCookiesOnServer(csrfToken) {
    const rawResponse = await fetch("/auth/clear_cookie", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ csrfToken })
    });
    console.log("POST /auth/clear_cookie", rawResponse.status);
  }

  async function sendTokenToServer(idToken, csrfToken) {
    const rawResponse = await fetch("/auth/session", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idToken, csrfToken })
    });
    console.log(`POST /auth/session ${rawResponse.status}`);
  }
</script>
