'use strict';
const sodexo = document.querySelector('#sodexo');
const node = document.querySelector('#hsl');
const body = document.querySelector("body");


fetch('/l').then(function (response) {
    return response.json();
}).then(function (json) {
    hslFu(json);
});

function hslFu(hslLista) {
    console.log(hslLista);
    for (let y = 0; y < 5;) {
        const pysakki = hslLista.data.stop.name;
        const saapuminen = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeArrival;
        const lahto = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeDeparture;
        const reitti = hslLista.data.stop.stoptimesWithoutPatterns[y].trip.route.longName;
        const lyhytNimi = hslLista.data.stop.stoptimesWithoutPatterns[y].trip.route.shortName;
        const oikeaAika = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeState;
        const d = document.createElement('div');
        d.classList.add("HSL");
        d.innerHTML = pysakki + " " + reitti + " " + lyhytNimi + " " + saapuminen + " " + lahto + " " + oikeaAika;

        hsl.appendChild(d);
        y++;
    }
}

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
        d.innerHTML = hinta + nimi + prop;

        sodexo.appendChild(d);
        x++;
    }
}

fetch('/2').then(function (response) {
    return response.json();
}).then(function (json) {
    console.log(json);
    naytaIlma(json);
});

let timer1 = setInterval(() =>
    fetch('/l').then(function (response) {
        return response.json();
    }).then(function (json) {
        hslFu1(json);

function hslFu1(hslLista) {
    try {
        node.innerHTML = "";
        console.log("clear");
    } catch (err) {
        console.log(err);
    }
    console.log(hslLista);
    for (let y = 0; y < 5;) {
        const pysakki = hslLista.data.stop.name;
        const saapuminen = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeArrival;
        const lahto = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeDeparture;
        const reitti = hslLista.data.stop.stoptimesWithoutPatterns[y].trip.route.longName;
        const lyhytNimi = hslLista.data.stop.stoptimesWithoutPatterns[y].trip.route.shortName;
        const oikeaAika = hslLista.data.stop.stoptimesWithoutPatterns[y].realtimeState;

        const d = document.createElement('div');
        d.classList.add("HSL");
        d.innerHTML = pysakki + " " + reitti + " " + lyhytNimi + " " + saapuminen + " " + lahto + " " + oikeaAika;

        hsl.appendChild(d);
        y++;
    }
}
}), 10000);


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
            console.log(sode);
            for (let x = 0; x < 8;) {
                const hinta = sode.courses[x].price;
                const nimi = sode.courses[x].title_fi;
                const prop = sode.courses[x].properties;

                const d = document.createElement('div');
                d.classList.add("sodexo");
                d.innerHTML = hinta + nimi + prop;

                sodexo.appendChild(d);
                x++;
            }
        }
    }), 600000);
