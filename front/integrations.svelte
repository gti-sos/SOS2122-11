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

        <li style="font-size: 22px;"><strong>inequality-Stats</strong></li>
        <ul style="font-size: 22px;"><strong>Externas</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/inequality-stats/Apiexterna1tony">Api Externa 1</a></li>
            <li><a href="#/inequality-stats/Apiexterna2tony">Api Externa 2</a></li>

            <ul style="font-size: 22px;"><strong>Integraciones</strong></ul>

            <ul style="list-style-type:circle; font-size: 20px;">
                <li><a href="#/inequality-stats/ApiIntegracion27Expenditure">ACon API Gasto</a></li>
                <li><a href="#/inequality-stats/ApiIntegracion27Debt">Con API Deuda</a></li>


        <ul style="font-size: 22px;"><strong>Personal</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/inequality-stats/inequalityHighCharts">Gráfica Inequality(HighChart)</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/inequality-stats/inequalityPlotlyCharts">Gráfica Inequality(Awesome)</a></li>
        </ul>

       


</div>
</body>

</html>