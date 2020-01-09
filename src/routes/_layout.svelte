<script>
  import { fade } from "svelte/transition";
  import Nav from "../components/Nav.svelte";
  import UserObserver from "../components/UserObserver.svelte";
  export let segment;
</script>

<style>

</style>

<UserObserver />
<div class="flex flex-col min-h-screen" transition:fade>
  <Nav {segment} />

  <main class="flex-1 flex flex-col">
    <slot />
  </main>
</div>
