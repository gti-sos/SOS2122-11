<script>
    import{Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_API_PATH = "/api/v2/education-stats";

    let educationData = [];
    let educationYear = [];
    let educationDropCoe = [];
    let educationCompCoe = [];
    let educationGobExp = [];

    let error = "Tiene que cargar los datos para visualizar las analíticas";
    let cargados = false;

    async function loadChart() {
        const res = await fetch(BASE_API_PATH);
        educationData = await res.json();
        if(res.ok){
            educationData.forEach(stat => {
                educationYear.push(stat.country + "-" + stat.year);
                educationDropCoe.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.dropCoefficients)});
                educationCompCoe.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.completionCoefficients)});
                educationGobExp.push({name: stat.country + "-" + stat.year, y: parseFloat(stat.gobermentExpenditure)});
            });
            cargados = true;
        }

        console.log("Education chart data" + educationYear)
        
        Highcharts.chart('first', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },  
            title: {
                text: 'Estadisticas del coeficiente de abandono'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },  
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Drop Coefficients',
                type: 'pie',
                colorByPoint: true,
                data: educationDropCoe,
            }, 
            ]
        
        });

        Highcharts.chart('second', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },  
            title: {
                text: 'Estadisticas del coeficiente de finalización'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },  
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [
                {
                name: 'Completion Coefficients',
                type: 'pie',
                colorByPoint: true,
                data: educationCompCoe, 
                },
            ]
        
        });

        Highcharts.chart('third', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },  
            title: {
                text: 'Estadisticas del gasto gubernamental en educación'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },  
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [ 
                {
                name: 'Goberment Expenditure Coefficients',
                type: 'pie',
                colorByPoint: true,
                data: educationGobExp
                }
            ]
        
        });
        
    };


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
          Análiticas de Educación
        </h1>
    </div>

    <div id="first"></div>
    <div id="second"></div>
    <div id="third"></div>
  
    <div>
        <p class="description">
            Gráficos de tarta que muestran los porcentajes de abandono, terminación y gasto gubernamental; respectivamente.
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