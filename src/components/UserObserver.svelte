<script>
  import { onMount } from "svelte";
  import { currentUser } from "./../stores/user.js";

  onMount(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("User: ", user);
        currentUser.set(user);
      } else {
        // User is signed out.
        currentUser.set(null);
        console.log("Signed out");
      }
    });
  });
</script>
