<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    export let params = {}
    let education_stat = {};
    
    let updatedCountry = "";
    let updatedYear = "";
    let updatedDropCoefficients = "";
    let updatedCompletionCoefficients = "";
    let updatedGobermentExpenditure = "";
    let erroMsg = "";
    
	onMount(getPais);
async function getPais(){
    console.log("Fetching country....");
    const res = await fetch("/api/v1/education-stats/" + req.params.country + "/" + req.params.year);
    if(res.ok){
        console.log("Ok:");
        const json = await res.json();
        education_stat = json;
        updatedCountry = education_stat.country;
        updatedYear = education_stat.year;
        updatedDropCoefficients = education_stat.dropCoefficients;
        updatedCompletionCoefficients = education_stat.completionCoefficients;
        updatedGobermentExpenditure = education_stat.gobermentExpenditure;
        console.log("Received education_stat.");
    }else if(res.status==404){      
        erroMsg="No existe un recurso llamado "+ req.params.country+" en la tabla";
        console.log("ERROR" + erroMsg);
    }
}
async function actualizaPais(){
		console.log("Updating country...." + JSON.stringify(params.country));
		const res = await fetch("/api/v1/education-stats/" + params.country + "/" + params.year,{
			method: "PUT",
			body: JSON.stringify({
                country : params.country,
                year : params.year,
                dropCoefficients : updatedDropCoefficients,
                completionCoefficients : updatedCompletionCoefficients,
                gobermentExpenditure : updatedGobermentExpenditure}),
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
					<th>Coeficiente de abandono </th>
					<th>Tasa de completación de estudios</th>
					<th>Inversión del gobierno en educación</th>
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedDropCoefficients}"></td>
                    <td><input  bind:value="{updatedCompletionCoefficients}"></td>
                    <td><input bind:value="{updatedGobermentExpenditure}"></td>
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