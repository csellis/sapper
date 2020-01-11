<script>
  import { tick } from "svelte";
  import { goto } from "@sapper/app";
  import Login from "./Login.svelte";
  let email = "";
  let password = "";
  let confirmPassword = "";

  let formState = "fresh";
  let formErrorMessage = "";

  async function handleSubmit() {
    formState = "sending";
    if (password === "") {
      formState = "auth/password-missing";
      formErrorMessage = "Please provide a password";
    } else if (password !== confirmPassword) {
      formState = "auth/password-confirm-mismatch";
      formErrorMessage = "Your passwords don't match";
    } else {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          formState = error.code;
          formErrorMessage = error.message;
        });
      formState = "submitted";
      email = "";
      password = "";
      confirmPassword = "";

      if (user) {
        goto("dashboard");
      }
    }
  }
</script>

<h2 class="text-3xl font-semibold mb-4 text-gray-700">Create an Account</h2>

{#if formState.includes('operation')}
  <p class="text-red-500 text-xs italic">{formErrorMessage}</p>
{/if}

<p>
  Already have an account?
  <a
    class="inline-block align-baseline font-bold text-sm text-blue-500
    hover:text-blue-600 mb-8"
    href="auth/login">
    Login
  </a>
</p>

<div class="w-full max-w-xs">
  <form
    on:submit|preventDefault={handleSubmit}
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <input
        bind:value={email}
        class:border-red-500={formState.includes('email')}
        class="shadow appearance-none border rounded w-full py-2 px-3
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        autocomplete="username"
        id="email"
        type="email"
        placeholder="Email Address" />
      {#if formState.includes('email')}
        <p class="text-red-500 text-xs italic">{formErrorMessage}</p>
      {/if}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        bind:value={password}
        class:border-red-500={formState.includes('password')}
        class="shadow appearance-none border border-red-500 rounded w-full py-2
        px-3 text-gray-700 mb-3 leading-tight focus:outline-none
        focus:shadow-outline"
        autocomplete="new-password"
        id="password"
        type="password"
        placeholder="******************" />
      {#if formState.includes('password')}
        <p class="text-red-500 text-xs italic">{formErrorMessage}</p>
      {/if}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm">
        Confirm Password
      </label>
      <input
        bind:value={confirmPassword}
        class:border-red-500={formState.includes('password')}
        class="shadow appearance-none border border-red-500 rounded w-full py-2
        px-3 text-gray-700 mb-3 leading-tight focus:outline-none
        focus:shadow-outline"
        autocomplete="new-password"
        id="confirm"
        type="password"
        placeholder="******************" />

    </div>
    <div class="flex items-center justify-between">
      <button
        class:inactive={formState === 'sending'}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
        rounded focus:outline-none focus:shadow-outline"
        type="submit">
        Register
      </button>
    </div>
  </form>
</div>

<p class="text-gray-700">or continue with</p>

<Login />
