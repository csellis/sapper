<script>
  import Login from "./Login.svelte";
  let email;
  let password;
  let formState = "fresh";

  async function handleSubmit() {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          // alert("Wrong password.");
          formState = "wrong-password";
        } else if (errorCode === "auth/user-not-found") {
          // alert(errorMessage);
          formState = "user-not-found";
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });

    // console.log(userCredential);
  }
</script>

<h2 class="text-3xl font-semibold mb-4 text-gray-700">
  Log into Svelte Backpack
</h2>

<p>
  Or
  <a
    class="inline-block align-baseline font-bold text-sm text-blue-500
    hover:text-blue-600 mb-8"
    href="auth/register">
    Create an Account
  </a>
</p>

<div class="w-full max-w-xs">
  <form
    on:submit|preventDefault={handleSubmit}
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input
        bind:value={email}
        class:border-red-500={formState === 'user-not-found'}
        class="shadow appearance-none border rounded w-full py-2 px-3
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Email" />
      {#if formState === 'user-not-found'}
        <p class="text-red-500 text-xs italic">
          Please check your email address.
        </p>
      {/if}
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        bind:value={password}
        class:border-red-500={formState === 'wrong-password'}
        class="shadow appearance-none border rounded w-full py-2 px-3
        text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="******************" />

      {#if formState === 'wrong-password'}
        <p class="text-red-500 text-xs italic">Your password was incorrect.</p>
      {/if}
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
        rounded focus:outline-none focus:shadow-outline w-full"
        type="submit">
        Log In
      </button>
    </div>
  </form>
</div>

<p class="text-gray-700">or continue with</p>

<Login />

<div>
  <a
    class="inline-block align-baseline float-right text-sm text-gray-700
    hover:text-gray-800 uppercase tracking-tight"
    href="auth/recover">
    Can't Log In?
  </a>
</div>
