<script>
  import { stores } from "@sapper/app";
  import { onMount, onDestroy } from "svelte";
  const { session } = stores();

  const handleEscape = e => {
    if (e.key === "Esc" || e.key === "Escape") {
      isOpen = false;
    }
  };
  onMount(() => {
    document.addEventListener("keydown", handleEscape);
    onDestroy(() => document.removeEventListener("keydown", handleEscape));
  });

  let isOpen = false;

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
  <div class="relative hidden sm:block sm:ml-6">
    <div class="mt-1">
      <button
        class="relative navLink block z-10"
        on:click={() => (isOpen = !isOpen)}>
        {$session.currentUser.email}
      </button>
    </div>
    {#if isOpen}
      <button
        on:click={() => (isOpen = false)}
        tabindex="-1"
        class="fixed inset-0 w-full h-full bg-black opacity-25 cursor-default" />
      <div
        on:click={() => (isOpen = !isOpen)}
        class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
        <a
          rel="prefetch"
          class="text-gray-800 hover:bg-indigo-500 hover:text-white block px-4
          py-2"
          href="dashboard">
          Dashboard
        </a>
        <a
          class="text-gray-800 hover:bg-indigo-500 hover:text-white block px-4
          py-2"
          href=".">
          Account
        </a>
        <a
          class="text-gray-800 hover:bg-indigo-500 hover:text-white block px-4
          py-2"
          href=".">
          Support
        </a>
        <a
          class="text-gray-800 hover:bg-indigo-500 hover:text-white block px-4
          py-2"
          href="."
          on:click={() => {
            signOut();
          }}>
          Logout
        </a>
      </div>
    {/if}
  </div>
{:else}
  <a class="mt-1 navLink" href="auth/login">Login</a>
{/if}
