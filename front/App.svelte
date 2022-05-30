<script>
	
  
	import Home from './Home.svelte';
	import Router from 'svelte-spa-router';
	import Analytics from "./Analytics.svelte";
	import Integrations from "./integrations.svelte";
	import Videos from "./videos.svelte";
	// Tony

	import InequalityTable from './inequality/inequalityTable.svelte';
	import EINEQ from './inequality/EditInequalityTable.svelte';
	import InequalityHighCharts from './inequality/analytics/InequalityHighChart.svelte';
	import InequalityPlotlyCharts from './inequality/analytics/InequalityPlotlyChart.svelte';
	import Apiexterna1Tony from './inequality/analytics/Apiexterna1.svelte';
	import Apiexterna2Tony from './inequality/analytics/Apiexterna2.svelte';
	import ApiG27ExpenditureTony from './inequality/analytics/APIG27Expenditure.svelte';
	import ApiG27DebtTony from './inequality/analytics/APIG27Debt.svelte';


	import EducationTable from './education-stats/EducationTable.svelte';
	import EditEducationTable from './education-stats/EditEducationTable.svelte';
	import EducationHighcharts from './education-stats/analytics/EducationHighcharts.svelte';
	import EducationEcharts from './education-stats/analytics/EducationEcharts.svelte';
	import Apig10Population from './education-stats/analytics/APIG10Population.svelte';
	import Apig27Smi from './education-stats/analytics/APIG27SMI.svelte';
	import ApiExterna1 from './education-stats/analytics/ApiExterna1.svelte';


	
	const routes = {
		"/": Home,
		"/Home": Home,
		"/info": Home,
		"/analytics":Analytics,
		"/integrations":Integrations,
		"/about":Videos,

		"/inequality-stats": InequalityTable,
		"/inequality-stats/:country/:year": EINEQ,
		"/inequality-stats/inequalityHighCharts":InequalityHighCharts,
		"/inequality-stats/inequalityPlotlyCharts":InequalityPlotlyCharts,
		"/inequality-stats/Apiexterna1tony":Apiexterna1Tony,
		"/inequality-stats/Apiexterna2tony":Apiexterna2Tony,
		"/inequality-stats/ApiIntegracion27Expenditure":ApiG27ExpenditureTony,
		"/inequality-stats/ApiIntegracion27Debt":ApiG27DebtTony,

		"/education-stats/": EducationTable,
		"/education-stats/:country/:year": EditEducationTable,
		"/education-stats/educationHighcharts": EducationHighcharts,
		"/education-stats/educationEcharts": EducationEcharts,
		"/education-stats/ApiG10Population": Apig10Population,
		"/education-stats/ApiG27SMI": Apig27Smi,
		"/education-stats/ApiExterna1": ApiExterna1	

		};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>