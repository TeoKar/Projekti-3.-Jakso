'use strict';
const sodexo = document.querySelector('#sodexo');
const hsl = document.querySelector('#hsl');
const air = document.querySelector("#air");
const body = document.querySelector("body");



//********************HSL TIETOJEN HAKU**********************************

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
        d.innerHTML = hinta + nimi + prop;

        sodexo.appendChild(d);
        x++;
    }
}

//************************ILMA HAKU***********************************

fetch('/2').then(function (response) {
    return response.json();
}).then(function (json) {
});

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
        air.innerText = "ILMAN LAATU";
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
});


//*********************HSL TIETOJEN PÄIVITYS*******************************************

let timer1 = setInterval(() =>
    fetch('/l').then(function (response) {
        return response.json();
    }).then(function (json) {
        hslFu1(json);

function hslFu1(hslLista) {
    try {
        hsl.innerHTML = "";
        console.log("clear");
    } catch (err) {
        console.log(err);
    }
    hsl.innerText = "HSL AIKATAULU PYSÄKILLÄ LEIRITIE V1501";
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
}), 20000);


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
            sodexo.innerText = "MYYRMÄEN RUOKALISTA";
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
