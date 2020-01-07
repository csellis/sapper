<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
  import Profile from "./Profile.svelte";
  import { onMount, tick } from "svelte";

  let user;

  onMount(() => {
    if (!$session.currentUser) {
      createLoginButton();
    }
  });

  // const unsubscribe = authState(auth).subscribe(u => (user = u));
  function createLoginButton() {
    var uiConfig = {
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return false;
        }
      }
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      // tosUrl: "<your-tos-url>",
      // Privacy policy url/callback.
      // privacyPolicyUrl: function() {
      //   window.location.assign("<your-privacy-policy-url>");
      // }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await tick();
        createLoginButton();
      })
      .catch(error => {
        alert(error);
      });
  }
</script>

{#if $session.currentUser}
  <button
    on:click={() => {
      signOut();
    }}>
    Logout
  </button>
{:else}
  <div id="firebaseui-auth-container" />
{/if}
