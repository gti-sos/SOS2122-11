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
   

    async function loadData() {
        const res = await fetch(BASE_API_PATH);
        educationData = await res.json();
        if(res.ok){
            educationData.forEach(stat => {
                educationYear.push(stat.country + "-" + stat.year);
                educationDropCoe.push(parseFloat(stat.dropCoefficients));
                educationCompCoe.push(parseFloat(stat.completionCoefficients));
                educationGobExp.push(parseFloat(stat.gobermentExpenditure));
            });
            cargados = true;
        }

        console.log("Education chart data: " + educationYear)
        console.log("Drop data: " + educationDropCoe)
        console.log("Comp data: " + educationCompCoe)
        console.log("Exp data: " + educationGobExp)

        var chartDom = document.getElementById('graph');
        var myChart = echarts.init(chartDom);
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            legend: {
                data: ['DropCoefficient', 'CompletionCoefficient', 'GobermentExpenditure']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            xAxis: [
                {
                type: 'category',
                axisTick: { show: false },
                axisLabel:{
                    rotate: -35,
                },
                data: educationYear
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: 'DropCoefficient',
                type: 'bar',
                label: "DropCoefficient",
                emphasis: {
                    focus: 'series'
                },
                data: educationDropCoe
                },
                {
                name: 'CompletionCoefficient',
                type: 'bar',
                label: "CompletionCoefficient",
                emphasis: {
                    focus: 'series'
                },
                data: educationCompCoe
                },
                {
                name: 'GobermentExpenditure',
                type: 'bar',
                label: "gobermentExpenditure",    
                emphasis: {
                    focus: 'series'
                },
                data: educationGobExp
                }
            ]
        };

        option && myChart.setOption(option);



    }
</script>

<svelte:head>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.2/echarts.min.js" on:load={loadData}></script>-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.2/echarts.min.js" integrity="sha512-weWXHm0Ws2cZKjjwugRMnnOAx9uCP/wUVf84W7/fXQimwYUK28zPDGPprDozomQLpKv6U99xN9PI9+yLI9qxNw==" crossorigin="anonymous" referrerpolicy="no-referrer" on:load={loadData}></script>
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

    <div id="graph"></div>
  
    <div>
        <p class="description">
            Gráficos de barras que muestran los porcentajes de abandono, terminación y gasto gubernamental; respectivamente.
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
    #graph {
        width: 1000px;
        height:550px;
        padding-left: 200px;
    }
    p.error{
      color: red; 
      text-align:center;
      font-size: 20px;
      margin-top:80px;
    }
    
   
  </style>