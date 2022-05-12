<script>
    import {
      Button,
      Icon,
      Card,
      CardBody,
      CardFooter,
      CardHeader,
      CardSubtitle,
      CardText,
      CardTitle,
      Col,
      Container,
      Row,
    } from "sveltestrap";
  </script>
  
  <main>
    <h1>SOS2122-11</h1>
  
    <h2>Equipo</h2>
    <Container>
      <Col>
        <a href="https://github.com/dasougon7">David Sousa Gonzales</a>
      </Col>
      <Col>
        <a href="https://github.com/nachomc01">Ignacio Mauri Caceres</a>
      </Col>
      <Col>
        <a href="https://github.com/Jackman97">Antonio Maiquez</a>
      </Col>

    </Container>
  
    <h2>Descripción</h2>
    <p>
        Nuestras fuentes de información esta orientadas a analizar la relación que existe entre el nivel de desigualdad economica, el PIB y el numero de parados a nivel mundial
     </p>
  
    <Container>
      <Col>
        <a href="http://github.com/gti-sos/SOS2122-11 "
          ><b>Repository: </b>http://github.com/gti-sos/SOS2122-11</a
        >
      </Col>
      <Col>
        <a href="http://sos2122-11.herokuapp.com"
          ><b>URL: </b>http://sos2122-11.herokuapp.com</a
        >
      </Col>
    </Container>
  <Button  id ="analyticsbtn" color = primary href="https://sos2122-11.herokuapp.com/#/analytics">Gráfica Grupal</Button>
  <Button  id ="integrationsbtn" color = primary href="https://sos2122-11.herokuapp.com/#/integrations">Integraciones</Button>
 

  
    <h2>APIs</h2>
    <Container>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h3>Estadísticas de desigualdad</h3></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText>Recogidas por la UNDP</CardText>
            <a href="https://sos2122-11.herokuapp.com/api/v2/inequality-stats">
              <Button color="primary">API</Button></a>
            <a href="/#/inequality-stats">
              <Button color="primary">Interfaz</Button>
            </a>
            <a href="/#/inequality-stats/inequalityHighCharts">
              <Button color="primary">Grafica Highchart</Button>
            </a>
            <a href="/#/inequality-stats/inequalityPlotlyCharts">
              <Button color="primary">Grafica Awesome</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14951179/UyxdMVXv"
              ><Button color="info">Documentación Backend en Postman</Button></a>
            
          </CardBody>
          <CardFooter
            >desarrollado por 
            <a href="https://github.com/Jackman97">Antonio Maiquez</a>
            </CardFooter>
        </Card>

        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h3>Estadísticas de educación</h3></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText>Recogidas por la Unesco</CardText>
            <a href="https://sos2122-11.herokuapp.com/api/v2/education-stats">
              <Button color="primary">API</Button></a>
            <a href="/#/education-stats">
              <Button color="primary">Interfaz</Button>
            </a>
            <a href="/#/education-stats/analytics">
              <Button color="primary">Grafica Doughnut</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/19481545/UyrBhvbJ"
              ><Button color="info">Documentación Backend en Postman</Button></a>
            
          </CardBody>
          <CardFooter
            >desarrollado por 
            <a href="https://github.com/dasougon7">David Sousa</a>
            </CardFooter>
        </Card>
      </Col>
    </Container>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      max-width: 240px;
      margin: 0 auto;
    }
    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
    b {
      color: #00c1ff;
    }
    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
  </style>