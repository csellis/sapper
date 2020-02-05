<script>
  import { fade } from "svelte/transition";
  import UserObserver from "../components/UserObserver.svelte";
  // import PageObserver from "../components/PageObserver.svelte";
  import Nav from "../components/Nav.svelte";
  import LandingNav from "../components/LandingNav.svelte";
  export let segment;

  if (process.browser) {
    const wave = String.fromCodePoint(0x1f44b);
    const flame = String.fromCodePoint(0x1f525);

    const welcomeStyle = [
      "color: #48bb78",
      "font-size: 1.875rem",
      "font-weight: 800"
    ].join(";");

    const subStyle = ["font-size: 1.25rem", "font-weight: 500"].join(";");

    console.log(`%cSvelte Backpack`, welcomeStyle);
    console.log(
      `%c${wave} Feel free to check out our source, but please don't flame ${flame}`,
      subStyle
    );
  }
</script>

<UserObserver />
{#if segment === 'app'}
  <div class="">
    <Nav />
    <main class="flex-1 flex flex-col z-30">
      <slot />
    </main>
  </div>
{:else}
  <div class="bg-gray-100">
    <div class="">
      <LandingNav />
      <main class="flex-1 flex flex-col sm:px-4 z-30">
        <slot />
      </main>
    </div>
  </div>
{/if}
