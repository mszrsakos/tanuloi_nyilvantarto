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
    }
]
 
let modDiv=document.querySelector(".modDiv")
modDiv.style.visibility="hidden"

function mentes(){
    const kiIras = document.getElementById("kiIras");
    let nevIn=document.getElementById("nevIn").value
    let osztIn=document.getElementById("osztIn").value
    let tanAvgIn=document.getElementById("tanAvgIn").value
    tanulok.push({
    nev: document.getElementById("nevIn").value,
    osztaly: document.getElementById("osztIn").value,
    atlag: document.getElementById("tanAvgIn").value
});
    console.log(tanulok)


    tablaFrissites();
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
}
function torles(i){
    tanulok.splice(i, 1)
    tablaFrissites()
}
 
function modositas(i) {
    let tanulo = tanulok[i];
    modDiv.style.visibility="visible"

    let ujNev = document.getElementById("ujnevIn").value
    let ujOsztaly = document.getElementById("ujosztIn").value
    let ujAtlag = document.getElementById("ujtanAvgIn").value

    tanulo.nev = ujNev;
    tanulo.osztaly = ujOsztaly;
    tanulo.atlag = ujAtlag;

    tablaFrissites();
}
 
const keresoMezo = document.getElementById("keresoMezo");
const Elemek = document.querySelectorAll("#data-table tbody tr");
 keresoMezo.addEventListener('input', function(){
    const keresettSzo = keresoMezo.value.toLowerCase();
    Elemek.forEach(function(elem) {
                const nev = elem.querySelector("th:first-child").textContent.toLowerCase();
               
               
                if (nev.includes(keresettSzo)) {
                    elem.style.display = "";
                } else {
                    elem.style.display = "none";
                }
               
        const nevRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ ]+$/;
 
        const osztalyRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9.]+$/;
 
        const atlagRegex = /^\d+(,\d+)?$/;
 
    })
});