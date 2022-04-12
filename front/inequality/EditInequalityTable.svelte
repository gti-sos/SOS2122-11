<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    export let params = {}
    let inequality_stat = {};
    
    let updatedCountry = "";
    let updatedYear = "";
    let updatedCoefficients = "";
    let updatedEducations = "";
    let updatedLifes = "";
    let erroMsg = "";
    
	onMount(getPais);
async function getPais(){
    console.log("Fetching country....");
    const res = await fetch("/api/v1/inequality-stats/" + params.country + "/" + params.year);
    if(res.ok){
        console.log("Ok:");
        const json = await res.json();
        inequality_stat = json;
        updatedCountry = inequality_stat.country;
        updatedYear = inequality_stat.year;
        updatedCoefficients = inequality_stat.coefficients;
        updatedEducations = unemployment_stat.educations;
        updatedLifes = unemployment_stat.lifes;
        console.log("Received inequality_stat.");
    }else if(res.status==404){      
        erroMsg="No existe un recurso llamado "+params.country+" en la tabla";
        console.log("ERROR" + erroMsg);
    }
}
async function actualizaPais(){
		console.log("Updating country...." + JSON.stringify(params.country));
		const res = await fetch("/api/v1/inequality-stats/" + params.country + "/" + params.year,{
			method: "PUT",
			body: JSON.stringify({
                country : params.country,
                year : params.year,
                coefficients : updatedCoefficients,
                educations : updatedEducations,
                lifes : updatedLifes}),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
            getPais();
            
            if(res.status==200){
                window.alert("El pais se ha modificado correctamente");
            }else if(res.status == 400){
                window.alert("ERROR No se introdujeron bien los datos");
                errorMSG = 400;
            }
		});
	}
</script>

<main>
    <h3>Editar <strong>{params.country}</strong></h3>
		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Coeficiente de desigualdad </th>
					<th>Desigualdad en la educacion</th>
					<th>Desigualdad en la esperanza de vida</th>
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedCoefficients}"></td>
                    <td><input  bind:value="{updatedEducations}"></td>
                    <td><input bind:value="{updatedLifes}"></td>
                    <td> <Button outline  color="primary" on:click={actualizaPais}>Actualizar</Button> </td>
                </tr>
        </tbody>
		</Table>
    {#if erroMsg}
        <p style="color: red">{erroMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>

<style>
h3{
text-align: center;
}
tbody{
	text-align: center;
}
thead{
	text-align: center;
}
main {
font-family: Georgia, "Times New Roman", Times, serif;
color: black;
}
</style>