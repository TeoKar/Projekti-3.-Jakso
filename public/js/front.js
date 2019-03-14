'use strict';
const sodexo = document.querySelector('#sodexo');
const hsl = document.querySelector('#hsl');
const air = document.querySelector("#air");
const otsikko = document.querySelector("#otsikko");
const body = document.querySelector("body");


//********************HSL TIETOJEN HAKU**********************************

fetch('/l')
.then(function (response) {
    return response.json();
}).then(function (json) {
    hslFu1(json);
});

function hslFu1(hslLista1) {
    console.log(hslLista1);
    for (let y = 0; y < 5;) {
        const pysakki = hslLista1.data.stop.name;
        const saapuminen = hslLista1.data.stop.stoptimesWithoutPatterns[y].realtimeArrival;
        const lahto = hslLista1.data.stop.stoptimesWithoutPatterns[y].realtimeDeparture;
        const reitti = hslLista1.data.stop.stoptimesWithoutPatterns[y].trip.route.longName;
        const lyhytNimi = hslLista1.data.stop.stoptimesWithoutPatterns[y].trip.route.shortName;
        const oikeaAika = hslLista1.data.stop.stoptimesWithoutPatterns[y].realtimeState;

        let arrivalTime = new Date();
        let arrivalTimeInMs = saapuminen * 1000;
        arrivalTime.setTime(arrivalTimeInMs);
        console.log(arrivalTime);
        let saapumisaika = arrivalTime.getHours() - 2 + ":" + arrivalTime.getMinutes();
        console.log(saapumisaika);

        let departureTime = new Date();
        let departureTimeInMs = lahto * 1000;
        departureTime.setTime(departureTimeInMs);
        let lahtoaika = departureTime.getHours() - 2 + ":" + departureTime.getMinutes();
        console.log(lahtoaika);

        const d = document.createElement('div');
        const h = document.createElement('header');

        h.classList.add("pieniotsikko");
        d.classList.add("HSL");

        h.innerHTML = lyhytNimi + " " + reitti;
        d.innerHTML = "SAAPUU: " + saapumisaika + " LÄHTEE: " + lahtoaika + "  REALTIME: " + oikeaAika;

        h.appendChild(d);
        hsl.appendChild(h);
        y++;
    }
}


//*************************RUOKALISTAN HAKU****************************

fetch('/i').then(function (response) {
    return response.json();
}).then(function (json) {
    naytaLista(json);
});

function naytaLista(sode) {
    JSON.stringify(sode);
    console.log(sode);
    for (let x = 0; x < 8;) {
        const hinta = sode.courses[x].price;
        const nimi = sode.courses[x].title_fi;
        const prop = sode.courses[x].properties;

        const d = document.createElement('div');
        d.classList.add("sodexo");
        d.innerHTML = hinta + " " + nimi + " " + prop;

        sodexo.appendChild(d);
        x++;
    }
}

//************************ILMA HAKU***********************************

fetch('/2').then(function (response) {
    return response.json();
}).then(function (json) {
    naytaIlma(json);

    function naytaIlma(ilma) {
        JSON.stringify(ilma);
        try {
            air.innerHTML = "";
        } catch (err) {
            console.log(err);
        }
        console.log(ilma);
        for (let z = 0; z < 3;) {
            const alue = ilma.results[z].city;
            const latitude = ilma.results[z].coordinates.latitude;
            const longitude = ilma.results[z].coordinates.longitude;
            const parameter = ilma.results[z].parameter;
            const yksikko = ilma.results[z].unit;
            const maara = ilma.results[z].value;

            const d = document.createElement('div');
            d.classList.add("air");
            d.innerHTML =" LATITUDE: " + latitude + " LONGITUDE: " + longitude + " PARAMETRIT: " + parameter + " " + yksikko + " " + maara;

            air.appendChild(d);
            z++;
        }
    }
});


//*********************HSL TIETOJEN PÄIVITYS*******************************************

let timer1 = setInterval(() =>
    fetch('/l').then(function (response) {
        return response.json();
    }).then(function (json1) {
        hslFu1(json1);

        function hslFu1(hslLista) {
            console.log(hslLista);
            try {
                hsl.innerHTML = "";
                console.log("clear");
            } catch (err) {
                console.log(err);
            }
            const d = document.createElement('div');
            d.id = "otsikko";
            d.innerText = "HSL AIKATAULU PYSÄKILLÄ LEIRITIE V1501";
            hsl.appendChild(d);
            for (let y = 0; y < 5;) {
                const pysakki1 = hslLista.data.stop.name;
                const saapuminen1 = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeArrival;
                const lahto1 = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeDeparture;
                const reitti1 = hslLista.data.stop.stoptimesWithoutPatterns[y].trip.route.longName;
                const lyhytNimi1 = hslLista.data.stop.stoptimesWithoutPatterns[y].trip.route.shortName;
                const oikeaAika1 = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeState;

                let arrivalTime = new Date();
                let arrivalTimeInMs = saapuminen1 * 1000;
                arrivalTime.setTime(arrivalTimeInMs);
                let saapumisaika = arrivalTime.getHours() - 2 + ":" + arrivalTime.getMinutes();


                let departureTime = new Date();
                let departureTimeInMs = lahto1 * 1000;
                departureTime.setTime(departureTimeInMs);
                let lahtoaika = departureTime.getHours() - 2 + ":" + departureTime.getMinutes();


                const d = document.createElement('div');
                const h = document.createElement('header');

                h.classList.add("pieniotsikko");
                d.classList.add("HSL");

                h.innerHTML = lyhytNimi1 + " " + reitti1;
                d.innerHTML = "SAAPUU: " + saapumisaika + " LÄHTEE: " + lahtoaika + "  REALTIME: " + oikeaAika1;

                h.appendChild(d);
                hsl.appendChild(h);
                y++;
            }
        }
    }), 2000);


//**********************RUOKALISTAN PÄIVITYS*************************************

let timer2 = setInterval(() =>
    fetch('/i').then(function (response) {
        return response.json();
    }).then(function (json) {
        naytaLista1(json);

        function naytaLista1(sode) {
            JSON.stringify(sode);
            try {
                sodexo.innerHTML = "";
            } catch (err) {
                console.log(err);
            }
            const d = document.createElement('div');
            d.id = "otsikkoSod";
            d.innerText = "MYYRMÄEN RUOKALISTA";
            hsl.appendChild(d);
            sodexo.innerText = "MYYRMÄEN RUOKALISTA";
            console.log(sode);
            for (let x = 0; x < 8;) {
                const hinta = sode.courses[x].price;
                const nimi = sode.courses[x].title_fi;
                const prop = sode.courses[x].properties;

                const d = document.createElement('div');
                d.classList.add("sodexo");
                d.innerHTML = hinta + " " + nimi + " " + prop;

                sodexo.appendChild(d);
                x++;
            }
        }
    }), 600000);

//***********************ILMAN PÄIVITYS**********************************************

let timer3 = setInterval(() =>
    fetch('/2').then(function (response) {
        return response.json();
    }).then(function (json) {
        naytaIlma(json);

        function naytaIlma(ilma) {
            JSON.stringify(ilma);
            try {
                air.innerHTML = "";
            } catch (err) {
                console.log(err);
            }
            console.log(ilma);
            for (let z = 0; z < 3;) {
                const alue = ilma.results[z].city;
                const latitude = ilma.results[z].coordinates.latitude;
                const longitude = ilma.results[z].coordinates.longitude;
                const parameter = ilma.results[z].parameter;
                const yksikko = ilma.results[z].unit;
                const maara = ilma.results[z].value;

                const d = document.createElement('div');
                d.classList.add("air");
                d.innerHTML = alue + " " + latitude + " " + longitude + " " + parameter + " " + yksikko + " " + maara;

                air.appendChild(d);
                z++;
            }
        }
    }), 600000);
