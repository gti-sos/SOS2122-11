

<script>
    var APIext = "https://api.n.exchange/en/api/v1/currency/"
    let Divisa = [];
    let obj;
    let data=[];
	async function loadGraph(){
        console.log("");	
		const res = await fetch(APIext);  //Piped proxy
		if (res.ok) {
			console.log("Ok, loaded successfully");
			const json = await res.json();
            Divisa = json;
		} else {
			console.log("ERROR!");
        }
        
        Divisa.forEach(x =>{
        console.log(Object.keys(x));
        obj = {
                    name: x.name,
                    weight: parseFloat(x.maximal_amount) 
                };
        data.push(obj);
        
      }  )
        
        

            

        Highcharts.chart('container', {
        accessibility: {
            screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
            }
            },
            series: [{
                type: 'wordcloud',
                data: data,
                name: 'Valor'
            }],
            title: {
                text: 'Divisas'
            }
        });
        
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          Cuanto mayor es el tamaño del nombre, mayor es su cantidad minima
        </p>
    </figure>
    
</main>

<style>
    .highcharts-figure {
        min-width: 320px; 
        max-width: 800px;
        margin: 1em auto;
    }
</style>