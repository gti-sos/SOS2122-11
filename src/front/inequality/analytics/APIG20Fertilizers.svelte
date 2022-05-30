<script>
	
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

	let MyData = [];
	let API_01 = [];
	
	async function loadGraph(){
		
		const resData = await fetch("https://sos2122-11.herokuapp.com/api/v2/inequality-stats");
		MyData = await resData.json();
		const resData2 = await fetch("https://sos2122-20.herokuapp.com/api/v1/fertilizers-stats");
		if (resData2.ok) {
			console.log("Ok, api 01 loaded");
			const json = await resData2.json();
            API_01 = json;
			console.log(API_01)
		} else {
			console.log("ERROR!");
        }
		let aux = []
		let valores = []
		MyData.forEach((x) => {	
				aux={
					name: x.country,
					data: [parseInt(x.coefficients),parseInt(x.lifes),0,0]
				}
				valores.push(aux)
			
        });
		API_01.forEach((x) => {
            
				aux={
					name: x.country,
					data: [0,0,x.quantity,x.absolute_change]
				}
				valores.push(aux)
			  	
		

        });

		Highcharts.chart('container', {
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Nacimientos y turismo rural en el año 2015'
			},
			xAxis: {
				categories: ['Coeficiente de desigualdad', 'Desiguladad en esperanza de vida',"Cantidad de fertilizante","Cambio de fertilizante"],
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				labels: {
					overflow: 'justify'
				}
			},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true
					}
				}
			},
			credits: {
				enabled: false
			},
			series: valores
		});
	}
</script>
	<svelte:head>
		<script src="https://code.highcharts.com/highcharts.js"></script>
		<script src="https://code.highcharts.com/modules/exporting.js"></script>
		<script src="https://code.highcharts.com/modules/export-data.js"></script>
		<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
	</svelte:head>
<main>
	<h3 style="text-align: center;"> Integración con la API fertilizers-stats del grupo 20</h3>
	<Button outline color="secondary" on:click="{pop}">Volver</Button>
	<figure class="highcharts-figure">
		<div id="container"></div>
		<p style="text-align:center;" class="highcharts-description">
			Desigualdad y abono
		</p>
	</figure>

</main>

