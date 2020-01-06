<script>
  export let displayName;
  export let photoURL;
  export let uid;
</script>

<h3>Hi {displayName}</h3>

<img src={photoURL} alt="Profile pic" width="100" />
<p>Logged in with user {uid}</p>
