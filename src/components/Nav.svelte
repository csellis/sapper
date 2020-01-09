<script>
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { stores } from "@sapper/app";
  const { session } = stores();
  import { media } from "../stores/media.js";

  import LoginButtons from "./LoginButtons.svelte";

  let isNavOpen = false;
  function closeNav() {
    isNavOpen = false;
  }
</script>

<header
  class="bg-gray-900 sm:flex sm:justify-between sm:px-4 sm:py-3 sm:items-center">
  <div class="flex items-center justify-between px-4 py-3 sm:p-0">
    <div class="text-gray-500 uppercase text-xl tracking-wider font-medium">
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

  {#if $media.sm}
    <div class="px-2 pt-2 pb-4 sm:flex">
      <a class="sm:mt-1 navLink" href=".">Home</a>
      <a class="mt-1 navLink" href="about">About</a>
      <a class="mt-1 navLink" rel="prefetch" href="blog">Blog</a>
      {#if $session.currentUser}
        <a rel="prefetch" class="mt-1 navLink" href="dashboard">Dashboard</a>
      {/if}
      <LoginButtons />
    </div>
  {:else if isNavOpen}
    <div
      transition:slide
      on:click={() => closeNav()}
      class="px-2 pt-2 pb-4 {isNavOpen ? 'block' : 'hidden'} sm:flex">
      <a class="sm:mt-1 navLink" href=".">Home</a>
      <a class="mt-1 navLink" href="about">About</a>
      <a class="mt-1 navLink" rel="prefetch" href="blog">Blog</a>
      {#if $session.currentUser}
        <a rel="prefetch" class="mt-1 navLink" href="dashboard">Dashboard</a>
      {/if}
      <LoginButtons />
    </div>
  {/if}

</header>
