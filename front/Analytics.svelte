<script>
    import {
      Button,
    } from "sveltestrap";
    let isOpen = false;
    var BASE_API_PATH = "/api/v2";
    // Array de Datos
    var inequality=[];
    var education=[];
    // Valores que se van a mostrar en la grafica
    var xKeys = [];
    var inequalityGraphCoefficient=[];
    var inequalityGraphEducations=[];
    var inequalityGraphLifes=[];
    var educationGraphDropCoe=[];
    var educationGraphComCoe=[];
    var educationGraphGobExp=[];

    
    let errorPrint = "";
    async function getData() {
      const dataA = await fetch("/api/v2/inequality-stats");
      const dataB = await fetch("/api/v2/education-stats/");

      
      if (dataA.ok && dataB.ok) { 
        inequality = await dataA.json();
        education = await dataB.json();

      
        // Se añaden las claves de cada banco de datos
        inequality.forEach(element=>{
          xKeys.push(element.country+","+parseInt(element.year));
        });
        education.forEach(element=>{
          xKeys.push(element.country+","+parseInt(element.year));
        });
        // Se añaden los valores de cada banco de datos que se van a mostrar
        // Inequality
        inequality.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
        inequality.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
        inequality.forEach(element=>{
          inequalityGraphCoefficient.push(parseFloat(element.coefficients));
          inequalityGraphEducations.push(parseFloat(element.educations));
          inequalityGraphLifes.push(parseFloat(element.lifes));
        });
        // education
        education.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
        education.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
        education.forEach(element=>{
          educationGraphDropCoe.push(parseFloat(element.dropCoefficients));
          educationGraphComCoe.push(parseFloat(element.completionCoefficients));
          educationGraphGobExp.push(parseFloat(element.gobermentExpenditure));
     
        });
       
        
        
        // Eliminamos repetidos y ordenamos por país y año
        xKeys=new Set(xKeys);
        xKeys=Array.from(xKeys);
        xKeys.sort();
        
        
      } else {
        console.log("Error!");
      }
    }
    async function loadGraph() {
      getData().then(() => {
        Highcharts.chart('container', {
      chart: {
          type: 'spline',
          inverted: true
      },
      title: {
          text: 'Gráfica grupal'
      },
      yAxis: {
            title: {
              text: "Valor",
            },
          },
          xAxis: {
            title: {
              text: "País,Año",
            },
            categories: xKeys,
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
          },
          annotations: [
            {
              labels: [
                {
                  point: "year",
                  text: "",
                },
                {
                  point: "min",
                  text: "Min",
                  backgroundColor: "white",
                },
              ],
            },
          ],
      plotOptions: {
          spline: {
              marker: {
                  enable: false
              }
          }
      },
      series: [{
          name: 'Desigualdad',
          data: inequalityGraphCoefficient
          },
        {
          name: 'Educacion',
          data: inequalityGraphEducations
        },
        {
          name: 'Esperanza de vida',
          data: inequalityGraphEducations
        },
        {
          name: 'Coeficiente de abandono',
          data: educationGraphDropCoe
        },
        {
          name: 'Coeficiente de finalización',
          data: educationGraphComCoe
        },
        {
          name: 'Gasto gubernamental',
          data: educationGraphGobExp
        }
      ]
  });
      });
    }
  </script>
  
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
  </svelte:head>
  
  <main>
    <body>
        <Button id ="volverbtn" href="#/info">Volver</Button>
  
    {#if errorPrint}
      <div class="hideMe">
        <span class="alertERROR">
          <strong style="align:center">ERROR! </strong>
          <p />
          {errorPrint}
        </span>
      </div>
    {:else}
      <div style="margin-bottom: 15px">
        <figure class="highcharts-figure">
          <div id="container" />
          <p class="centrado">
            <strong>Gráfica en la que se muestran:</strong><br />
            · Desigualdad<br />
            · Educacion<br />
           
          </p>
        </figure>
      </div>
    {/if}
  </main>
  
  