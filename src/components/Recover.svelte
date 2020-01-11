<script>
  let email;
  let formState = "fresh";
  let formErrorMessage = "";

  async function handleSubmit() {
    console.log(email);
    const passwordSent = await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
      })
      .catch(function(error) {
        // An error happened.
        formState = error.code;
        formErrorMessage = error.message;
        // console.log(error);
      });

    console.log(passwordSent);
  }
</script>

<div class="bg-gray-200 flex items-center flex-col justify-center flex-grow">

  <h2 class="text-3xl font-semibold mb-4 text-gray-700">
    Recover your Account
  </h2>

  <p class="text-gray-500 mb-8">
    Enter the email address you used to create your account
  </p>

  <div class="w-full max-w-xs">
    <form
      on:submit|preventDefault={handleSubmit}
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input
          bind:value={email}
          class:border-red-500={formState === 'auth/user-not-found'}
          class="shadow appearance-none border rounded w-full py-2 px-3
          text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email Address" />
        {#if formState.includes('email')}
          <p class="text-red-500 text-xs italic">{formErrorMessage}</p>
        {/if}
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
          rounded focus:outline-none focus:shadow-outline w-full"
          type="submit">
          Send Email
        </button>
      </div>
    </form>
  </div>

  <div>
    <a
      class="inline-block align-baseline float-right text-sm text-gray-700
      hover:text-gray-800 uppercase tracking-tight"
      href="auth/login">
      Have an account?
    </a>
  </div>
</div>
