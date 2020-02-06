<script>
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { stores, goto } from "@sapper/app";
  const { session, page } = stores();
  import { media } from "../stores/media.js";

  import AccountDropdown from "./AccountDropdown.svelte";

  let isNavOpen = false;

  function closeNav() {
    isNavOpen = false;
  }

  function handleScrollToForm() {
    if ($page.path !== "/") {
      goto("/");
    }
    document.querySelector("#signup-form").scrollIntoView({
      behavior: "smooth"
    });
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

  // console.log($session);
</script>

<header
  class="container mx-auto sm:flex sm:justify-between sm:px-4 sm:py-3
  sm:items-center bg-white shadow z-50"
  style="position: sticky; top: 0px;">
  <div class="flex items-center justify-between p-4 sm:p-0">
    <div
      class="text-green-500 uppercase text-base sm:text-3xl tracking-wider
      font-extrabold">
      <a on:click={() => closeNav()} href=".">Svelte Backpack</a>
    </div>
    <div class="sm:hidden">
      <button
        on:click={() => (isNavOpen = !isNavOpen)}
        type="button"
        class="text-gray-500 block hover:text-gray-700 focus:text-gray-700
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
    {#if $session.currentUser}
      <div class="px-2 pt-2 pb-4 sm:flex sm:items-center">
        <a
          class="mt-1 mr-4 landingLink"
          href="."
          on:click={() => {
            signOut();
          }}>
          Logout
        </a>
        <a
          class="hidden sm:inline bg-white hover:bg-gray-100 text-gray-700
          border border-gray-500 hover:border-gray-700 font-bold py-2 px-4
          rounded"
          href="app/dashboard"
          rel="prefetch">
          Dashboard
        </a>
      </div>

      <div class="px-2 py-4 border-t border-gray-200 sm:hidden text-gray-800">
        <div class="">
          <span class="font-semibold landingLink">
            {$session.currentUser.email}
          </span>
          <a class="mt-1 block landingLink" rel="prefetch" href="app/dashboard">
            Dashboard
          </a>
          <a
            class="mt-1 block landingLink"
            href="."
            on:click={() => {
              signOut();
            }}>
            Logout
          </a>
        </div>
      </div>
    {:else}
      <div class="px-2 pt-2 pb-4 sm:flex sm:items-center">
        <a
          on:click|preventDefault={() => handleScrollToForm()}
          class="hidden sm:inline sm:bg-blue-500 hover:bg-blue-700 text-white
          font-bold py-2 px-4 rounded"
          href=".">
          Join Beta
        </a>
      </div>
    {/if}
  </nav>
</header>
