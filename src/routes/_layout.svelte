<script>
  import { fade } from "svelte/transition";
  import UserObserver from "../components/UserObserver.svelte";
  // import PageObserver from "../components/PageObserver.svelte";
  import Nav from "../components/Nav.svelte";
  import LandingNav from "../components/LandingNav.svelte";
  export let segment;

  const currentYear = new Date().getFullYear();

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
    <div class="flex flex-col min-h-screen">
      <LandingNav />
      <main class="flex-1 flex flex-col sm:px-4 z-30">
        <slot />
      </main>

      <footer
        class="container mx-auto flex justify-center sm:justify-between sm:px-4
        sm:py-3 sm:items-center bg-white shadow z-50">
        <div class="flex flex-col content-center py-4 sm:content-start">
          <div
            class="text-green-500 uppercase text-base sm:text-xl tracking-wider
            font-extrabold">
            <a href=".">Svelte Backpack</a>
          </div>
          <div class="text-gray-800 uppercase text-base mx-auto sm:mx-0">
            &copy; {currentYear}
          </div>
        </div>
        <div class="hidden sm:block">
          <a href=".">Home</a>
        </div>
      </footer>
    </div>
  </div>
{/if}
