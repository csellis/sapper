<script>
  export let segment;
  let isNavOpen = false;

  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<header class="bg-gray-900">
  <div class="flex items-center justify-between px-4 py-3">
    <div />
    <div>
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
              v-if="!isOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1
              1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
          {/if}
        </svg>
      </button>
    </div>
  </div>
  <div class="px-2 pt-2 pb-4 {isNavOpen ? 'block' : 'hidden'}">
    <a
      class="py-1 block text-white font-semibold hover:bg-gray-800 rounded px-2"
      href=".">
      Home
    </a>
    <a
      class="mt-1 py-1 block text-white font-semibold hover:bg-gray-800 rounded
      px-2"
      href="about">
      About
    </a>
    <a
      class="mt-1 py-1 block text-white font-semibold hover:bg-gray-800 rounded
      px-2"
      rel="prefetch"
      href="blog">
      Blog
    </a>
    {#if $session.currentUser}
      <a
        rel="prefetch"
        class="mt-1 py-1 block text-white font-semibold hover:bg-gray-800
        rounded px-2"
        href="/dashboard">
        Dashboard
      </a>
    {/if}
  </div>
</header>
