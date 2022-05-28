const bodyParser = require("body-parser");

const BASE_API = "/api/tony/apiext1";


const _ = require('lodash');
const axios = require('axios').default;
let datavacunas;
/*
*/
//

module.exports.register = (app) => {
    const options = {
        method: 'GET',
        url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/',
        headers: {
          'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
          'X-RapidAPI-Key': '16f42caf8bmshf174e2ad95fd101p1b1493jsn14e5d7cfa425'
        }
      };



  axios.request(options).then(function (response) {
    datavacunas = response.data.data;
  }).catch(function (error) {
    console.error(error);
  });

  app.get(BASE_API, (req, res) => {
    res.send(JSON.stringify(datavacunas));
  });
}