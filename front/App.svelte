<script>
	
  
	import Home from './Home.svelte';
	import Router from 'svelte-spa-router';
	import InequalityTable from './inequality/inequalityTable.svelte';
	import EINEQ from './inequality/EditInequalityTable.svelte';
	import EducationTable from './education-stats/EducationTable.svelte';
	import EditEducationTable from './education-stats/EditEducationTable.svelte';
	

	
	const routes = {
		"/": Home,
		"/info": Home,
		"/inequality-stats": InequalityTable,
		"/inequality-stats/:country/:year": EINEQ,
		"/education-stats/": EducationTable,
		"/education-stats/:county/:year": EditEducationTable,
		};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>