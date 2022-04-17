<script>
	
  
	import Home from './Home.svelte';
	import Router from 'svelte-spa-router';
	import InequalityTable from './inequality/inequalityTable.svelte';
	import EINEQ from './inequality/EditInequalityTable.svelte';
	

	
	const routes = {
		"/": Home,
		"/inequality-stats": InequalityTable,
		"/inequality-stats/:country/:year": EINEQ,

		};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>