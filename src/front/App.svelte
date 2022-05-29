<script>
	
  
	import Home from './Home.svelte';
	import Router from 'svelte-spa-router';
	import Analytics from "./Analytics.svelte";
	import Integrations from "./integrations.svelte";
	import About from "./acerca.svelte";
	// Tony

	import InequalityTable from './inequality/inequalityTable.svelte';
	import EINEQ from './inequality/EditInequalityTable.svelte';
	import InequalityHighCharts from './inequality/analytics/InequalityHighChart.svelte';
	import InequalityPlotlyCharts from './inequality/analytics/InequalityPlotlyChart.svelte';
	import Apiexterna1Tony from './inequality/analytics/Apiexterna1.svelte';
	import Apiexterna2Tony from './inequality/analytics/Apiexterna2.svelte';
	import ApiG27ExpenditureTony from './inequality/analytics/APIG27Expenditure.svelte';
	import ApiG27DebtTony from './inequality/analytics/APIG27Debt.svelte';
	import ApiG20FertilizerTony from './inequality/analytics/APIG20Fertilizers.svelte';


	import EducationTable from './education-stats/EducationTable.svelte';
	import EditEducationTable from './education-stats/EditEducationTable.svelte';
	import EducationAnalytics from './education-stats/EducationAnalytics.svelte';


	
	const routes = {
		"/": Home,
		"/Home": Home,
		"/info": Home,
		"/analytics":Analytics,
		"/integrations":Integrations,
		"/about":About,

		"/inequality-stats": InequalityTable,
		"/inequality-stats/:country/:year": EINEQ,
		"/inequality-stats/inequalityHighCharts":InequalityHighCharts,
		"/inequality-stats/inequalityPlotlyCharts":InequalityPlotlyCharts,
		"/inequality-stats/Apiexterna1tony":Apiexterna1Tony,
		"/inequality-stats/Apiexterna2tony":Apiexterna2Tony,
		"/inequality-stats/ApiIntegracion27Expenditure":ApiG27ExpenditureTony,
		"/inequality-stats/ApiIntegracion27Debt":ApiG27DebtTony,
		"/inequality-stats/ApiIntegracion20Fertilizer":ApiG20FertilizerTony,
		"/education-stats/": EducationTable,
		"/education-stats/:country/:year": EditEducationTable,
		"/education-stats/analytics": EducationAnalytics,
		};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>