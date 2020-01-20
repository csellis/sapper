<script>
  import { fade } from "svelte/transition";
  import UserObserver from "../components/UserObserver.svelte";
  // import PageObserver from "../components/PageObserver.svelte";
  import Nav from "../components/Nav.svelte";
  import LandingNav from "../components/LandingNav.svelte";
  export let segment;
</script>

<UserObserver />
{#if segment === 'app'}
  <div class="">
    <Nav />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
{:else}
  <div class="bg-gray-100">
    <div class="">
      <LandingNav />
      <main class="flex-1 flex flex-col sm:px-4">
        <slot />
      </main>
    </div>
  </div>
{/if}
