<script>
    import { onMount } from "svelte";
    import{Nav, NavItem, NavLink } from "sveltestrap";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let dates = [];
    let educationDropCoe = [];
    let educationCompCoe = [];
    let educationGobExp = [];
    let smiLocal = [];
    let smiEuros = [];
    let smiVariation = [];
 
    let error = "Tiene que cargar los datos para visualizar las analíticas";
    let cargados = false;


    async function loadData(){        
        let loadSMI = await fetch('/remoteApiSMI/loadInitialData');
        

        delay(1000);
        let resEducation = await fetch('/api/v2/education-stats');
        let resSMI = await fetch ('/remoteApiSMI');
        
        if(resEducation.ok && resSMI.ok){
            const jsonEdu = await resEducation.json();
            const jsonSMI = await resSMI.json();

            const countrYear = [];
            for(let i = 0; i < jsonSMI.length; i++){
                dates.push(jsonSMI[i].country + '-' + jsonSMI[i].year);
                countrYear.push(jsonSMI[i].country + '-' + jsonSMI[i].year);
                smiLocal.push(jsonSMI[i].smi_local);
                smiEuros.push(jsonSMI[i].smi_euros);
                smiVariation.push(jsonSMI[i].smi_variation);

                if(dates.includes(countrYear)){
                    let index = dates.indexOf(countrYear);
                    educationDropCoe.push(jsonSMI[index].dropCoefficients);
                    educationCompCoe.push(jsonSMI[index].completionCoefficientes);
                    educationGobExp.push(jsonSMI[index].gobermentExpenditure);
                } else {
                    educationDropCoe.push(0);
                    educationCompCoe.push(0);
                    educationGobExp.push(0);
                }
                
            }
            for(let i = 0; i < jsonEdu.length; i++){
                let date = jsonEdu[i].country + '-' + jsonEdu[i].year;
                dates.push(date);

                if(countrYear.includes(date)){
                    let index = countrYear.indexOf(date);
                    smiLocal.push(jsonSMI[index].smi_local);
                    smiEuros.push(jsonSMI[index].smi_euros);
                    smiVariation.push(jsonSMI[index].smi_variation);
                } else {
                    smiLocal.push(0);
                    smiEuros.push(0);
                    smiVariation.push(0);
                }
                educationDropCoe.push(jsonEdu[i].dropCoefficients);
                educationCompCoe.push(jsonEdu[i].completionCoefficients);
                educationGobExp.push(jsonEdu[i].gobermentExpenditure);
            }
            console.log(dates);
            console.log(smiLocal);
            console.log(educationCompCoe);

            for(let i = 0; i < jsonSMI; i++){
                dates.push(jsonSMI[i].country + '-' + jsonSMI[i].year);
                smiLocal.push(jsonSMI[i].smi_local);
                smiEuros.push(jsonSMI[i].smi_euros);
                smiVariation.push(jsonSMI[i].smi_variation);
                dropCoefficient.push(0);
                completionCoefficients.push(0);
                gobermentExpenditure.push(0);
            }
            cargados = true;
            console.log(dates);
            console.log(smiLocal);
            console.log(educationDropCoe);
            
            loadChart();
        } else {
            let loadError = 200.4;
            loadChart();
        }
    }
    async function loadChart() {
        var chartDom = document.getElementById('graph');
        var myChart = echarts.init(chartDom);

        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['DropCoefficients', 'CompletionCoefficient', 'GobermentExpenditure', 'SMI Local', 'SMI Euros', 'SMI Variación']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                axisLabel:{
                    rotate: -35,
                },
                data: dates,
            },
              yAxis: {
                type: 'value'
            },
            series: [
                {
                name: 'DropCoeffiecients',
                type: 'line',
                data: educationDropCoe
                },
                {
                name: 'CompletionCoeffiecients',
                type: 'line',
                data: educationCompCoe
                },
                {
                name: 'GobermentExpenditure',
                type: 'line',
                data: educationGobExp
                },
                {
                name: 'SMI Local',
                type: 'line',
                data: smiLocal
                },
                {
                name: 'SMI Euros',
                type: 'line',
                data: smiEuros
                },
                {
                name: 'SMI Variación',
                type: 'line',
                data: smiVariation
                },
                
            ]
        };

        option && myChart.setOption(option);

    };



    onMount(loadData);
</script>



<svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.2/echarts.min.js" integrity="sha512-weWXHm0Ws2cZKjjwugRMnnOAx9uCP/wUVf84W7/fXQimwYUK28zPDGPprDozomQLpKv6U99xN9PI9+yLI9qxNw==" crossorigin="anonymous" referrerpolicy="no-referrer" on:load={loadChart}></script>
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
          Análiticas de Educación y SMI
        </h1>
    </div>

    <div id="graph"></div>
  
    <div>
        <p class="description">
            Gráficos de lineas que integra los datos de Educación y Salario Mínimo Interprofesional
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