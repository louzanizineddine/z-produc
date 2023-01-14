<script>
    let username = '';
    let password = '';
    async function handleSignIn() {
    const url = 'http://localhost:3000/login';
    const data = { username, password };
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
        loggedin = true;
    })
  }

</script>

<div>
    <form>
        <label for="username">Username</label>
        <input bind:value={username} type="text" placeholder="Username" />
        <label for="password">Password</label>
        <input bind:value={password} type="password" placeholder="Password" />
        <button type="submit" on:click|preventDefault={handleSignIn}>Login</button>
    </form>
</div>