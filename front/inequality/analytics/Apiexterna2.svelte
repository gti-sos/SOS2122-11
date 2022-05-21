

<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    //Uso de API externa rick and morty
    var apienfermedad = [];
    let aux = []
		let array = []
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
      console.log("Fetching data...");
      const res = await fetch("https://disease.sh/v2/gov/Germany");
      if (res.ok) {
        const json = await res.json();
        console.log(`We have received ${json} characters.`);
        console.log("Ok");
        apienfermedad=json;
      } else {
        errorMsg = "Error al obtener los  datos de api externa";
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    }
    async function onLoad() {
      await getStats();
      var array = [];
     
      apienfermedad.forEach(x =>{
        aux={ 
            name: x.province,
            data:[x.casesPerHundredThousand,0]
        }

        var point ={x: "name", y: "Casos por cien mil habitantes"}
        point.x = x.province
        point.y = x.casesPerHundredThousand
        array.push(point) 
        
      }  )
     
  
      const chart = new JSC.Chart("chartDiv", {
        // Pass points to the series
        series: [{ points: array }],
      });
    }
  </script>
  
  <svelte:head>
    <script
      src="https://code.jscharting.com/latest/jscharting.js"
      on:load={onLoad}></script>
  </svelte:head>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/#/integrations/">volver</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>Uso API externa Enfermedades en alemania</h2>
    </div>
  
    {#if errorMsg}
      <p>{errorMsg}</p>
    {:else}
      <div id="chartDiv" />
    {/if}
  </main>
  
  <style>
    #chartDiv {
      width: 100%;
      height: 400px;
    }
  </style>