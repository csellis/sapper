<script>
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { stores } from "@sapper/app";
  const { session } = stores();
  import { media } from "../stores/media.js";

  import AccountDropdown from "./AccountDropdown.svelte";

  let isNavOpen = false;

  function closeNav() {
    isNavOpen = false;
  }

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(async () => {})
      .catch(error => {
        alert(error);
      });
  }

  console.log($session);
</script>

<header
  class="container mx-auto sm:flex sm:justify-between sm:px-4 sm:py-3
  sm:items-center bg-white shadow"
  style="position: sticky; top: 0px;">
  <div class="flex items-center justify-between sm:p-0">
    <div
      class="text-green-500 uppercase text-3xl tracking-wider font-extrabold">
      <a on:click={() => closeNav()} href=".">Svelte Backpack</a>
    </div>
    <div class="sm:hidden">
      <button
        on:click={() => (isNavOpen = !isNavOpen)}
        type="button"
        class="text-gray-500 block hover:text-white focus:text-white
        focus:outline-none">
        <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
          {#if isNavOpen}
            <path
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1
              1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1
              1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828
              4.829 4.828 4.828z" />
          {:else}
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1
              1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
          {/if}
        </svg>
      </button>
    </div>
  </div>

  <nav
    on:click={() => closeNav()}
    class="{isNavOpen ? 'block' : 'hidden'} sm:block">
    <div class="px-2 pt-2 pb-4 sm:flex sm:items-center">
      <a class="sm:mt-1 mr-2 landingLink" href=".">Pricing</a>

      <a class="mt-1 mr-4 landingLink" href="auth/login">Login</a>
      <a
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
        rounded"
        href=".">
        Join Beta
      </a>
    </div>
    {#if $session.currentUser}
      <div class="px-4 py-4 border-t border-gray-800 sm:hidden">
        <div>
          <span class="font-semibold text-white">
            {$session.currentUser.email}
          </span>
        </div>
        <div class="">
          <a
            class="mt-1 block text-gray-400 hover:text-white"
            rel="prefetch"
            href="app/dashboard">
            Dashboard
          </a>
          <a
            class="mt-1 block text-gray-400 hover:text-white"
            href="."
            on:click={() => {
              signOut();
            }}>
            Logout
          </a>
        </div>
      </div>
    {/if}
  </nav>
</header>
