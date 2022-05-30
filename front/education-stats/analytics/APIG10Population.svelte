<script>
    import{Nav, NavItem, NavLink } from "sveltestrap";
    var eduApi = "https://sos2122-11.herokuapp.com/api/v2/education-stats"
    var apiPopulation = "https://sos2122-10.herokuapp.com/api/v2/population-levels"

    let educationData = [];
    let educationYear = [];
    let educationDropCoe = [];
    let educationCompCoe = [];
    let educationGobExp = [];

    let populationData = [];
    let populationYear = [];
    let populationDR = [];
    let populationLER = [];
    let populationBR = [];

    let categorias = [];
 
    let error = "Tiene que cargar los datos para visualizar las analíticas";
    let cargados = false;

    async function loadChart() {
        const res = await fetch(eduApi);
        const res1 = await fetch(apiPopulation);
        educationData = await res.json();
        populationData = await res1.json();

        if(res.ok && res1.ok){
            console.log(educationData);
            console.log(populationData);
            educationData.forEach(stat => {
                categorias.push(stat.country + "-" + stat.year);
                educationDropCoe.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.dropCoefficients)});
                educationCompCoe.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.completionCoefficients)});
                educationGobExp.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.gobermentExpenditure)});
            });

            populationData.forEach(stat => {
                categorias.push(stat.country + "-" + stat.year);
                populationDR.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.death_rate)});
                populationLER.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.life_expectancy_birth)});
                populationBR.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.birth_rate)});
            });
            
            cargados = true;

            Highcharts.chart('graph', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Integración de datos de Educación y Población'
                },
                xAxis: {
                    categories: categorias
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Coeficientes (%)'
                    },
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.1,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Drop Coefficients',
                    data: educationDropCoe
                },
                {
                    name: 'Completion Coefficients',
                    data: educationCompCoe
                },
                {
                    name: 'Goberment Expenditure Coefficients',
                    data: educationGobExp
                },
                {
                    name: 'Death Rate',
                    data: populationDR,
                    pointStart: educationData.length
                },
                {
                    name: 'Life Expectancy Rate',
                    data: populationLER,
                    pointStart: educationData.length
                },
                {
                    name: 'Birth Rate',
                    data: populationBR,
                    pointStart: educationData.length
                }
                ]
            });
        }
    }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
</svelte:head>

<main>
    <div class="nav">
        <Nav>
            <NavItem>
            <NavLink href="#/info">Página Principal</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="#/integrations">Integraciones</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="#/education-stats">Datos Educación</NavLink>
            </NavItem>
        </Nav>
        </div>  

        <div>
            <h1>
              Integración con datos de Población
            </h1>
        </div>
    
        <div id="graph"></div>
      
        <div>
            <p class="description">
                Gráficos de areas que muestra los porcentajes de abandono, terminación y gasto gubernamental en educación, así como
                las tasas de muerte, esperanza de vida y nacimientos por país y año
            </p>
        </div>
        
      
        <div>
          {#if !cargados}
            <p class="error">{error}</p>
          {/if}
        </div>
</main>

<style>
     main {
        text-align: center;
        padding: 30px;       
    }
    div.nav {
        text-align: left;
    }
    p.error{
      color: red; 
      text-align:center;
      font-size: 20px;
      margin-top:80px;
    }
</style>