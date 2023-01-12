<script>
  

</script>

<div>
    <form>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Username" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" />
        <button type="submit" on:click|preventDefault={handleSignIn}>Login</button>
    </form>
</div>