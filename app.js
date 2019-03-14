const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const fetch = require("node-fetch");


const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

setInterval(function () {
    const req = {
        url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: {
            "query": `{
    stop(id: \"HSL:4150201\") {
      name
      stoptimesWithoutPatterns {
      trip {
        route {
          shortName
          longName
        }
      }
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      }
      
      wheelchairBoarding  }
  }`
        },
        json: true
    };

    request(req, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(JSON.stringify(body, null, 4));

        }
        app.use('/l', (req, res) => {
            res.send(JSON.stringify(body, null, 4))});
        console.log(JSON.stringify(body, null, 4));

    });
}, 1000);


fetch('https://www.sodexo.fi/ruokalistat/output/daily_json/16365/2019/03/15/fi')
    .then(res => res.json())
    .then(json => app.use('/i', (req, res) => {
            res.send(json);
            console.log(json)
        })
    );

fetch('https://api.openaq.org/v1/measurements?location=FI00564&parameter[]=co&parameter[]=pm25&parameter[]=pm10&parameter[]=no2&limit=10')
    .then(res => res.json())
    .then(json => app.use('/2', (req, res) => {
            res.send(json);
            console.log(json)
        })
    );


app.listen(8002, () => {
    console.log('Listening on port 8002');
});