<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  h1,
  p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<section
  class="container mx-auto sm:w-3/4 lg:w-1/2 sm:px-4 sm:py-8 m-8 mb-24 bg-white
  shadow text-gray-800 max-w-3xl">
  <div class="flex flex-col items-center justify-center">
    <h2 class="font-semibold text-3xl pt-12 pb-8">{status}</h2>
    <h3 class="text-xl pb-12">{error.message}</h3>
  </div>
</section>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
