<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2122-11.herokuapp.com/api/v2/inequality-stats";
    var API2 = "https://sos2122-27.herokuapp.com/api/v2/public-debt-stats";
    var API2load = "https://sos2122-27.herokuapp.com/api/v2/public-debt-stats/loadinitialdata";

    
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosPaisIneq=[];
        let datosAñosIneq = [];
        let inequalityCoefficients = [];
        let debt_gdp = [];
        let datosAñosDebt = [];
        let datosPaisDebt =[];
        
        const datag1 = await fetch(API2load);

        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);
        myData = await resData.json();
        dataG2 = await resDataG2.json();
      
        datosPaisIneq = myData.map((myData)=> (myData.country));
        datosAñosIneq = myData.map((myData)=> parseInt(myData.year));
        inequalityCoefficients = myData.map((myData)=> myData.coefficients);
        
        datosPaisDebt = dataG2.map((dataG2)=> dataG2.country);
        datosAñosDebt = dataG2.map((dataG2)=> dataG2.year);
        debt_gdp = dataG2.map((dataG2)=> dataG2.debt_gdp);
        
        dataG2.forEach((e) => {
        datosPaisDebt.push(e.country);
        debt_gdp.push(e.debt_gdp);
        datosAñosDebt.push(e.date);
        });

        console.log(debt_gdp);
        var traces = [
                {x: datosAñosIneq, y: inequalityCoefficients, stackgroup: 'two'},
                {x: datosAñosDebt, y: debt_gdp, stackgroup: 'three'},
            ];
            Plotly.newPlot('myDiv', traces, {title: 'Azul:Coeficiente de desigualdad. Naranja: Deuda publica'});
}
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load={loadGraph}></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Coeficiente de desigualdad según hdi y la deuda publica</h3>

    <div id="myDiv"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>