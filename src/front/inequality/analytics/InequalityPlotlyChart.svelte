<script>
    import{Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_API_PATH = "/api/v2";
    let inequalityData=[];
    let inequalityChartCountryYear = [];
    let inequalityChartCoefficients = [];
    let inequalityCharteducations = [];
    let inequalityChartlifes = [];
 
		let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
    let cargados = false;
    async function loadChart() {
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH + "/inequality-stats");
        inequalityData = await res.json();
        if (res.ok) {
          inequalityData.forEach(stat => {
            inequalityChartCountryYear.push(stat.country+"-"+stat.year);  
            inequalityChartCoefficients.push(parseFloat(stat.coefficients));
            inequalityCharteducations.push(parseFloat(stat.educations));
            inequalityChartlifes.push(parseFloat(stat.lifes));
            });
            cargados=true;
        }
        
        console.log("Unemployment Chart data: " + inequalityData);
  
        var x0=inequalityChartCountryYear;
        var y0 = inequalityChartCoefficients;
        var y1 = inequalityCharteducations;
        var y2 = inequalityChartlifes;
  
        var trace0 = {
          x:x0,
          y: y0,
          type: 'box'
        };
  
        var trace1 = {
          x:x0,
          y: y1,
          type: 'box'
        };
        var trace2 = {
          x:x0,
          y: y2,
          type: 'box'
        };
        var data = [trace0,trace1, trace2];
  
        Plotly.newPlot('myDiv', data);
    }
  </script>
  
  <svelte:head>
    <script src='https://cdn.plot.ly/plotly-1.58.4.min.js' on:load={loadChart}></script>
  </svelte:head>
  
  <main>
    <Nav>
        <NavItem>
          <NavLink href="#/info">Página Principal</NavLink>
        </NavItem> 
        <NavItem>
          <NavLink href="#/integrations">Integrations</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#/Inequality-stats">Datos</NavLink>
        </NavItem>
  
        <p color="blue">Marca azul: Coeficiente de desigualdad|| Marca naranja: Desigualdad en educación
          ||Marca verde:Desigualdad en esperanza de vida </p>
    </Nav>
  
    <div id="myDiv"></div>
    
  
    <div>
      {#if !cargados}
        <p class="error">{errorMsg}</p>
      {/if}
    </div>
  </main>