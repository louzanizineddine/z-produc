<script>
    import { onMount } from 'svelte';
    import CardHistory from './CardHistory.svelte';
    // create an async function to call data from the server with onMount

    let history = [];

    onMount(async () => {
        history = await getHistory();
    });

    async function getHistory() {
        // fetch the data from the server
        const response = await fetch('http://localhost:3000/history');
        // convert the response to json
        const json = await response.json();
        // return the json
        console.log(json);
        return json;
        
    }
</script>

<div>
    <h1>History</h1>
    <ul>
        {#each history as info}
           <CardHistory {info} />
        {/each}
    </ul>
</div>