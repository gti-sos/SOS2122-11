<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2122-11.herokuapp.com/api/v2/inequality-stats";
    var API2 = "https://sos2122-27.herokuapp.com/api/v2/public-expenditure-stats";
    var API2load = "https://sos2122-27.herokuapp.com/api/v2/public-expenditure-stats/loadinitialdata";

    
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosPaisIneq=[];
        let datosAñosIneq = [];
        let inequalityCoefficients = [];
        let expenditure_gdp = [];
        let datosAñosExpenditure = [];
        let datosPaisExpenditure =[];
        
        const datag1 = await fetch(API2load);

        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);
        myData = await resData.json();
        dataG2 = await resDataG2.json();
      
        datosPaisIneq = myData.map((myData)=> (myData.country));
        datosAñosIneq = myData.map((myData)=> parseInt(myData.year));
        inequalityCoefficients = myData.map((myData)=> myData.coefficients);
        
        datosPaisExpenditure = dataG2.map((dataG2)=> dataG2.country);
        datosAñosExpenditure = dataG2.map((dataG2)=> dataG2.year);
        expenditure_gdp = dataG2.map((dataG2)=> dataG2.pe_to_gdp);
        
        dataG2.forEach((e) => {
        datosPaisExpenditure.push(e.country);
        expenditure_gdp.push(e.pe_to_gdp);
        datosAñosExpenditure.push(e.date);
        });
        console.log(datosAñosExpenditure);
        var trace1 = {
        x: datosAñosIneq,
        y: inequalityCoefficients,
        mode: 'markers',
        type: 'scatter',
        name: 'Coeficiente de desigualdad segun hdi',
        text: datosPaisIneq,
        marker: { size: 10 }
        };
        var trace2 = {
        x: datosAñosExpenditure,
        y: expenditure_gdp,
        mode: 'markers',
        type: 'scatter',
        name: 'Gasto publico por habitante',
        text: datosPaisExpenditure,
        marker: { size: 10 }
        };
        var data = [ trace1, trace2];
        var layout = {
        xaxis: {
            range: datosAñosIneq
        },
        yaxis: {
            range: [0, 65]
        },
        title:'Data Labels Hover'
        };
        Plotly.newPlot('myDiv', data, layout);
}
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.0.0-rc.2.min.js' on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Coeficiente de desigualdad según hdi y Estadísticas sobre el gasto público</h3>

    <div id="myDiv"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>