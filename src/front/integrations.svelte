<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<html lang="ES">

<head>
    <title>
        Integrations
    </title>
</head>

<body>
    <div>
        <h1>Integrations</h1>

        <div style="text-align:left;padding-bottom: 1%">
            <Button outline color="primary" onclick="location.href='#/Home'">Inicio</Button>
        </div>

        <div>
        <li style="font-size: 22px;"><strong>inequality-Stats</strong></li>
        <ul style="font-size: 22px;"><strong>Externas</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/inequality-stats/Apiexterna1tony">Api Externa 1</a></li>
            <li><a href="#/inequality-stats/Apiexterna2tony">Api Externa 2</a></li>

            <ul style="font-size: 22px;"><strong>Integraciones</strong></ul>

            <ul style="list-style-type:circle; font-size: 20px;">
                <li><a href="#/inequality-stats/ApiIntegracion27Expenditure">Con API Gasto</a></li>
                <li><a href="#/inequality-stats/ApiIntegracion27Debt">Con API Deuda</a></li>
                <li><a href="#/inequality-stats/ApiIntegracion20Fertilizer">Con API Abono</a></li>
                

        <ul style="font-size: 22px;"><strong>Personal</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/inequality-stats/inequalityHighCharts">Gráfica Inequality(HighChart)</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/inequality-stats/inequalityPlotlyCharts">Gráfica Inequality(Awesome)</a></li>
        </ul>
        </div>

       <div>
        <li style="font-size: 22px;"><strong>Education-Stats</strong></li>
        <ul style="font-size: 20px;"><strong>Externas</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/education-stats/ApiExterna1">Api Externa 1</a></li>
            <li><a href="#/inequality-stats/Apiexterna2tony">Api Externa 2</a></li>

            <ul style="font-size: 20px;"><strong>Integraciones</strong></ul>

            <ul style="list-style-type:circle; font-size: 20px;">
                <li><a href="#/education-stats/ApiG10Population"> Grupo 10: API Población</a></li>
                <li><a href="#/education-stats/ApiG27SMI">Grupo 27: API Salario Mínimo Interprofesional</a></li>


        <ul style="font-size: 20px;"><strong>Personal</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/education-stats/educationHighcharts">Gráfica HighChart</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/education-stats/educationEcharts">Gráfica Echart</a></li>
        </ul>
       </div>


</div>
</body>

</html>