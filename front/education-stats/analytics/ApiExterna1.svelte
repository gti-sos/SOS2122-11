<script>
    import { onMount } from "svelte";
    import{Nav, NavItem, NavLink } from "sveltestrap";

    let bookName = [];
    let rating = [];

    let error = "Tiene que cargar los datos para visualizar las analíticas";
    let cargados = false;

    async function loadData(){

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
                'X-RapidAPI-Key': '179406fe39msh4cfb36e7ae817b2p185222jsn3736c66ee157'
            }
        };

        const loadA = await fetch('https://hapi-books.p.rapidapi.com/month/2022/3', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        if(JSON.stringify(loadA) != 0){
            loadA.forEach((a) => {delete a.book_id, a.positio, a.cover, a.url})
            console.log(loadA)

        }
    }        


    onMount(loadData);
</script>

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