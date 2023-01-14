<script>
    let rating = 0;
    let wakeUpDate = '';
    let note = '';
    let that_thing = '';

    function handleSignIn(e)   {
        const url = 'http://localhost:3000/rate';
        const data = { rating, wakeUpDate, note , that_thing };
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
        })
    }

</script>

<div>
    <form>
        <label for="rating">Rating</label>
        <input type="range" min="0" max="1" step=".01" bind:value={rating}>
        <label for="wakeUpDate">Wake Up Date</label>
        <input type="date" bind:value={wakeUpDate}>
        <label for="that_thing">That Thing</label>
        <input type="text" bind:value={that_thing}>

        <label for="note">Note</label>
        <input type="text" bind:value={note}>

        <button type="submit" on:click|preventDefault={handleSignIn}>Submit</button>
        
    </form>

</div>