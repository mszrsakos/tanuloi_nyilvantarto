let tanulok=[
    {
    nev: "Szabó Anna",
    osztaly: "13.B",
    atlag: 4.2
    },
    {
    nev: "Nagy Bence",
    osztaly: "12.A",
    atlag: 3.8
    },
    {
    nev: "Kovács Péter",
    osztaly: "11.C",
    atlag: 4.5
    },
    {
    nev: "Tóth Eszter",
    osztaly: "13.A",
    atlag: 4.7
    },
    {
    nev: "Varga Máté",
    osztaly: "10.B",
    atlag: 3.6
    },
    {
    nev: "Szabó Máté",
    osztaly: "13.D",
    atlag: 1.9
    }
    ,
    {
    nev: "Varga Eszter",
    osztaly: "11.B",
    atlag: 2.3
    }
]
 
let modDiv=document.querySelector(".modDiv")
modDiv.style.visibility="hidden"

let kijeloltTanulo = null

tablaFrissites()

function mentes() {
    const kiIras = document.getElementById("kiIras");

    let nevIn = document.getElementById("nevIn").value.trim();
    let osztIn = document.getElementById("osztIn").value.trim();
    let tanAvgIn = document.getElementById("tanAvgIn").value.trim();

    // Regexek
    const nevRegex = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+ [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$/;
    const osztRegex = /^(1[0-3]|[1-9])\.[A-E]$/;
    const atlagRegex = /^(?:[1-4](?:[.,]\d+)?|5(?:[.,]0+)?)$/;

    try {
        if (nevIn === "") {
            kiIras.innerHTML = "A név mező nem lehet üres!";
        }
        else if (!nevRegex.test(nevIn)) {
            kiIras.innerHTML = "A név formátuma hibás! Pl.: Szabó Anna";
        }
        else if (osztIn === "") {
            kiIras.innerHTML = "Az osztály mező nem lehet üres!";
        }
        else if (!osztRegex.test(osztIn)) {
            kiIras.innerHTML = "Az osztály formátuma hibás! Pl.: 11.B";
        }
        else if (tanAvgIn === "") {
            kiIras.innerHTML = "Az átlag mező nem lehet üres!";
        }
        else if (!atlagRegex.test(tanAvgIn)) {
            kiIras.innerHTML = "Az átlag 1 és 5 közötti szám lehet! Pl.: 4.25";
        }
        else {
            kiIras.innerHTML = "";

            tanulok.push({
                nev: nevIn,
                osztaly: osztIn,
                atlag: tanAvgIn.replace(",", ".")
            });

            tablaFrissites();
        }
    }
    catch (error) {
        kiIras.innerHTML = `Hiba: ${error.message}`;
    }
}


 
function tablaFrissites() {
    const thead = document.querySelector("#data-table thead tr");
    const tbody = document.querySelector("#data-table tbody");
 
    thead.innerHTML = `
        <th>Név</th>
        <th>Osztály</th>
        <th>Tanulmányi átlag</th>
        <th>Művelet</th>
        <th>Törlés</th>
    `;
 
    tbody.innerHTML = "";
 
    tanulok.forEach(function(tanulo, i) {
        const sor = document.createElement("tr");
 
        sor.innerHTML = `
            <td>${tanulo.nev}</td>
            <td>${tanulo.osztaly}</td>
            <td>${tanulo.atlag}</td>
            <td>
                <button class="modositas-gomb">Módosítás</button>
            </td>
            <td>
                <button class="torles-gomb">Törlés</button>
            </td>
        `;
        const gomb2 = sor.querySelector(".torles-gomb");
 
 
        gomb2.addEventListener("click", function() {
            torles(i);
        });
 
        const gomb = sor.querySelector(".modositas-gomb");
 
 
        gomb.addEventListener("click", function() {
            modositas(i);
        });
 
        tbody.appendChild(sor);
    });
    statisztikak();
}

function torles(i){
    tanulok.splice(i, 1)
    tablaFrissites()
}
 
function modositas(i) {
    kijeloltTanulo = i;
    modDiv.style.visibility="visible"
    const tanulo = tanulok[i];

    document.getElementById("ujnevIn").value = tanulo.nev;
    document.getElementById("ujosztIn").value = tanulo.osztaly;
    document.getElementById("ujtanAvgIn").value = tanulo.atlag;
    modDiv.style.display = "flex";
}

function modositasMentes() {
    if (kijeloltTanulo === null) return;

    const modkiIras = document.getElementById("modkiIras");

    let nevIn = document.getElementById("ujnevIn").value.trim();
    let osztIn = document.getElementById("ujosztIn").value.trim();
    let tanAvgIn = document.getElementById("ujtanAvgIn").value.trim();

    // Regexek
    const nevRegex = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+ [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$/;
    const osztRegex = /^(1[0-3]|[1-9])\.[A-E]$/;
    const atlagRegex = /^(?:[1-4](?:[.,]\d+)?|5(?:[.,]0+)?)$/;

    try {
        if (nevIn === "") {
            modkiIras.innerHTML = "A név mező nem lehet üres!";
        }
        else if (!nevRegex.test(nevIn)) {
            modkiIras.innerHTML = "A név formátuma hibás! Pl.: Szabó Anna";
        }
        else if (osztIn === "") {
            modkiIras.innerHTML = "Az osztály mező nem lehet üres!";
        }
        else if (!osztRegex.test(osztIn)) {
            modkiIras.innerHTML = "Az osztály formátuma hibás! Pl.: 11.B";
        }
        else if (tanAvgIn === "") {
            modkiIras.innerHTML = "Az átlag mező nem lehet üres!";
        }
        else if (!atlagRegex.test(tanAvgIn)) {
            modkiIras.innerHTML = "Az átlag 1 és 5 közötti szám lehet! Pl.: 4.25";
        }
        else {
            modkiIras.innerHTML = "";

            tanulok[kijeloltTanulo] = {
                nev: nevIn,
                osztaly: osztIn,
                atlag: tanAvgIn.replace(",", ".")
            };

            kijeloltTanulo = null;
            modDiv.style.display = "none";
            tablaFrissites();
        }
    }
    catch (error) {
        modkiIras.innerHTML = `Hiba: ${error.message}`;
    }
}


const keresoMezo = document.getElementById("keresoMezo");
const tabla = document.getElementById("data-table");


keresoMezo.addEventListener('input', function() {
    const keresettSzo = keresoMezo.value.trim().toLowerCase();

    if (keresettSzo === "") {
        tabla.style.display = "none";
        return;
    }

    tabla.style.display = "table";

    const tbody = document.querySelector("#data-table tbody");
    const elemek = tbody.querySelectorAll("tr");

    elemek.forEach(function(elem) {
        const nev = elem.querySelector("td:first-child")?.textContent.toLowerCase() ?? "";

        elem.style.display = nev.includes(keresettSzo) ? "" : "none";
    });
});

function jegyStat(){
    let jeles=0;
    let jo=0;
    let kozepes=0;
    let elegseges=0;
    let elegtelen=0;

    tanulok.forEach(function(tanulo){
        let atlag=Number(tanulo.atlag);
        if(atlag>=4.5 && atlag<=5)
        {
            jeles++;
        }
        else if(atlag>=3.5 && atlag<=4.49)
        {
            jo++;
        }
        else if(atlag>=2.5 && atlag<=3.49)
        {
            kozepes++;
        }
        else if(atlag>=2 && atlag<=2.49)
        {
            elegseges++;
        }
        else{
            elegtelen++;
        }
    });
    document.getElementById("jegyStatEredmeny").innerHTML=`
        <p>Jeles: ${jeles} fő</p>
        <p>Jó: ${jo} fő</p>
        <p>Közepes: ${kozepes} fő</p>
        <p>Elégséges: ${elegseges} fő</p>
        <p>Elégtelen: ${elegtelen} fő</p>
    `
}
function statisztikak() {

    let osztalyok = {};

    tanulok.forEach(function(tanulo) {

        let osztaly = tanulo.osztaly;

        if (!osztalyok[osztaly]) {
            osztalyok[osztaly] = {
                osszeg: 0,
                darab: 0,
                legjobb: tanulo
            };
        }

        osztalyok[osztaly].osszeg += Number(tanulo.atlag);
        osztalyok[osztaly].darab++;

        if (Number(tanulo.atlag) > Number(osztalyok[osztaly].legjobb.atlag)) {
            osztalyok[osztaly].legjobb = tanulo;
        }
    });

    let kiiras = "";

    for (let osztaly in osztalyok) {

        let adat = osztalyok[osztaly];

        let atlag = adat.osszeg / adat.darab;

        kiiras += "<p>";
        kiiras += "<b>" + osztaly + "</b><br>";
        kiiras += "Osztályátlag: " + atlag.toFixed(2) + "<br>";
        kiiras += "Legjobb tanuló: " + adat.legjobb.nev;
        kiiras += " (" + adat.legjobb.atlag + ")";
        kiiras += "</p>";
    }

    document.getElementById("Statisztikak").innerHTML = kiiras;
}

tablaFrissites();


function rendezesAtlagSzerint(){
    tanulok.sort(function(a, b) {

        let osztalySorrend = a.osztaly.localeCompare(b.osztaly, "hu");

        if (osztalySorrend !== 0) {
            return osztalySorrend;
        }

        return Number(b.atlag) - Number(a.atlag);
    });

    tablaFrissites();
}
statisztikak();