<script>
  import { stores } from "@sapper/app";
  const { session } = stores();

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(async () => {})
      .catch(error => {
        alert(error);
      });
  }
</script>

{#if $session.currentUser}
  <a
    class="mt-1 navLink"
    href="."
    on:click={() => {
      signOut();
    }}>
    Logout
  </a>
{:else}
  <a class="mt-1 navLink" href="auth/login">Login</a>
{/if}
