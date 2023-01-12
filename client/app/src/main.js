import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		loggedin: false,
	}
});

export default app;