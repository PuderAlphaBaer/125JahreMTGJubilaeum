const anzeigefrage1 = document.getElementById('anzeigefrage1');
const anzeigefrage2 = document.getElementById('anzeigefrage2');
const a = document.getElementById('bta');
const b = document.getElementById('btb');
const c = document.getElementById('btc');
const d = document.getElementById('btd');
const y = document.getElementById('y');
const n = document.getElementById('n');
const zwischenbox = document.getElementById('zwischenbox');
const gamebox = document.getElementById('gamebox');
const beforegamebox = document.getElementById('beforegamebox');
const balkenbox = document.getElementById('balkenbox');
const balken = document.getElementById('balken');
const fragenbox = document.getElementById('fragenbox');
const rangliste = document.getElementById('rangliste');
const btbox = document.getElementById('btbox');
const buttonBox = document.getElementById('buttonBox');
const qnumber = document.getElementById('qnumber');
const votebox = document.getElementById('votebox');
const vote = document.getElementById('vote');
let borderColors;
let avotes;
let bvotes;
let cvotes;
let dvotes;
const bt2 = document.getElementById('bt2');
const bt1 = document.getElementById('bt1');
const startgamebt = document.getElementById('startgamebt');
const resettu = document.getElementById('resetUsers');
const imgbox = document.getElementById('imgbox');
const img = document.getElementById('img');
const zweiterContainer = document.getElementById('ersterContainer');
const subbutton = document.getElementById('subButton');
const endbox = document.getElementById('endbox');

let activequestionid = 0;






const beforeUnloadHandler = (event) => {
    // Recommended
    event.preventDefault();
  
    // Included for legacy support, e.g. Chrome/Edge < 119
    event.returnValue = "Wollen Sie die Seite wirklich verlassen? Die kann zu erheblichen Fehlern im laufenden Quiz führen";
  };
  

  window.addEventListener("beforeunload", beforeUnloadHandler);




startgamebt.addEventListener('click', startgame);
bt1.addEventListener('click', interphase1);
bt2.addEventListener('click', weiter);

function startgame() {
    console.log('beginne spiel')
    beforegamebox.style.display = "none";
    interphase1();
}

function toggleInterface(phase) {
    rangliste.style.display = "none";
    fragenbox.style.display = "none";
    zwischenbox.style.display = "none";
    beforegamebox.style.display = "none";
    phase.style.display = "flex";
}

let qnumberinsg;

function interphase1() {
    activequestionid++;
    qnumber.style.display = "block";
    qnumberinsg = questions.length-1;
    qnumber.innerHTML = "Frage "+activequestionid+" von "+qnumberinsg;

    console.log('%c beginne' + activequestionid, 'background: #222; color: #bada55')
    supabaseUpdate('fragen', ['beginn'], [true], 'eq', 'id', activequestionid)
    toggleInterface(zwischenbox);
    prefut = Date.now() + pretime;
    preloop = setInterval(interface1bar, 10);
    anzeigefrage1.innerHTML = questions[activequestionid].frage;

    setTimeout(() => {
        interphase2();
    }, pretime);
    // }, 1000);
};



function interface1bar() {
    prerem = prefut - Date.now();
    preangle = (prerem / pretime);
    balken.style.width = (preangle*100)+"%";
  }



// wird nach ablaufen der ersten 5s aufgerufen
  function interphase2() {
    console.log('%c starte frage' + activequestionid, 'background: #222; color: #bada55')
    supabaseUpdate('fragen', ['start'], [true], 'eq', 'id', activequestionid)

    balken.style.width = "0";
    clearInterval(preloop);

    toggleInterface(fragenbox);
    // reset der letzten Frage
    timerContainer.style.display = "flex";
    c.style.display = "flex";
    d.style.display = "flex";
    a.style.opacity = "1";
    b.style.opacity = "1";
    c.style.opacity = "1";
    d.style.opacity = "1";
    a.style.border = "none";
    b.style.border = "none";
    c.style.border = "none";
    d.style.border = "none";
    anzeigefrage2.innerHTML = questions[activequestionid].frage;
    // Multiple Choice Frage
    a.innerHTML = questions[activequestionid].a;
    b.innerHTML = questions[activequestionid].b;
    let topButtonContainer = document.getElementById('topButtonContainer');
    let bottomButtonContainer = document.getElementById('bottomButtonContainer');
    bottomButtonContainer.style.display = "flex";
    topButtonContainer.style.height = "50%";
    if (questions[activequestionid].c=="") {
      bottomButtonContainer.style.display = "none";
      topButtonContainer.style.height = "100%";
    } else {
      c.innerHTML = questions[activequestionid].c;
      d.innerHTML = questions[activequestionid].d;
    }
    

        if(questions[activequestionid].img!=false) {
            imgbox.style.display = "block";
            img.src = "../"+questions[activequestionid].img;
        } else {
            imgbox.style.display = "none";
        }

    // Timer starten
    startTimer();


    }


let timestart;




function weiter() {
    supabaseUpdate('fragen', ['auswertung'], [true], 'eq', 'id', activequestionid)
    qnumber.style.display = "none";
    toggleInterface(rangliste);
    bt2.style.display = "none";
    votebox.style.display = "none";
    votebox.removeChild(document.getElementById('vote'));
    votebox.innerHTML = '<canvas id="vote" class="vote"></canvas>';
    table.innerHTML = 
    `<table class="table" id="table">
        <tr class=""> 
            <th class="udata">Platz</th>
            <th class="udata">Benutzername</th>
            <th class="udata">Punktzahl</th>
        </tr>
    </table>`;
    fetchRangliste();
    bt1.innerHTML = "Starte Frage "+(activequestionid+1)+" von "+(questions.length-1);
    supabaseUpdate('spieler', ['vote'], [null], 'gt', 'id', '-1');
    if (activequestionid==questions.length-1) {
        theend();
    }
}


function theend() {
    gamebox.style.display = "none";
    endbox.style.display = "flex";


}
  
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');
const timerContainer = document.getElementById('timerContainer');

// Länge der Zeit für Fragen
let setTime;
let timerLoop;
let futureTime;


// startet Timer
function startTimer() { 
  timerLoop = setInterval(countDownTimer, 10);
  setTime = questions[activequestionid].zeit*1000;
  timer.innerHTML = questions[activequestionid].zeit+".00";
  futureTime = Date.now() + setTime;
  s1.style.display = "block";
  s2.style.display = "block";
  s1.style.backgroundColor = "orangered";
  s2.style.backgroundColor = "orangered";
  timer.style.color = "yellow";
  timer.style.fontSize = "5vh";
}


// Lässt Timer ablaufen, hinterfrags nicht, es funtioniert einfach
function countDownTimer() {
    const remainingTime = futureTime - Date.now();
    const angle = (remainingTime / setTime) * 360;

    if(angle > 180) {
        s3.style.display = "none";
        s1.style.transform = "rotate(180deg)";
        s2.style.transform = "rotate("+angle+"deg)";
    } else {
        s3.style.display = "block";
        s1.style.transform = "rotate("+angle+"deg)";
        s2.style.transform = "rotate("+angle+"deg)";
    }

    if(remainingTime > 1000) {
        timer.innerHTML = remainingTime.toString().slice(0, -3)+"."+remainingTime.toString().slice(-3, -1);
    } else {

        timer.innerHTML = "0"+remainingTime.toString().slice(0, -3)+"."+remainingTime.toString().slice(-3, -1);
    }



    // Letzten 5 Sekunden rot
    // if(remainingTime <= 5000) {
    //     s1.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    //     s2.style.backgroundColor = "rgba(0, 255, 0, 0.8)";
    //     timer.style.color = "rgba(55, 0, 255, 0.8)";
    // }

    if(remainingTime <= 0) {
        timerend();
        // Hier Funktion bei Ablauf des Timers callen
    }
} 


// Wird bei Ablaufen der Zeit aufgerufen
function timerend() {
    clearInterval(timerLoop);
    // ende auf true setzen
    console.log('%c beende frage' + activequestionid, 'background: #222; color: #bada55')
    supabaseUpdate('fragen', ['ende'], [true], 'eq', 'id', activequestionid)
    timerContainer.style.display = "none";
    // Verwendet "includes()", um mehrere Lösungen zu ermöglichen -- ACHTUNG includes() wird von Internetexplorer 11 oder weniger nicht unterstützt, sollte kein Problem darstellen, da es nur für surface.html verwendet wird
    if(questions[activequestionid].loesung.includes("a")==true) {
        a.style.border = "white solid 5px";
    } else {
        a.style.opacity = "0.5";
        a.style.border = "transparent";
    }
    if(questions[activequestionid].loesung.includes("b")==true) {
        b.style.border = "white solid 5px"
    } else {
        b.style.opacity = "0.5";
        b.style.border = "transparent";
    }
    if(questions[activequestionid].loesung.includes("c")==true) {
        c.style.border = "white solid 5px"
    } else {
        c.style.opacity = "0.5";
        c.style.border = "transparent";
    }
    if(questions[activequestionid].loesung.includes("d")==true) {
        d.style.border = "white solid 5px"
    } else {
        d.style.opacity = "0.5";
        d.style.border = "transparent";
    }
    
    bt2.style.display = "block";
    document.body.classList.add('waiting');
    setTimeout(() => {
        auswertung();
    }, 500);

}



class User {
    constructor(id, name, punkte, streak, rank, vote, podium) {
        this.id = id;
        this.name = name;
        this.punkte = punkte;
        this.streak = streak;
        this.rank = rank;
        this.vote = vote;
        this.podium = podium;
    }
}



userlist = [

];



// Diagramm wer für was gestimmt hat
// Musst du nicht verstehen, hab versucht so gut wie möglich zu kommentieren, damit für Style einfacher ist
// Im Fall der Fälle kannst du unter https://www.chartjs.org/docs/latest/ alles nachlesen
function auswertung() {
    votebox.style.display = "block";
    avotes = 0;
    bvotes = 0;
    cvotes = 0;
    dvotes = 0;
    updateRanking();
    
    supabaseFetch('spieler', 'id, name, punkte, streak, vote, podium', '', '', '', 'punkte', false).then((data) => {
        console.log("Beginne Auswertung")
        for (let i = 0; i < data.length; i++) {
            userIndex = userlist.findIndex((obj => obj.id == data[i].id));
            if (userIndex<0) {
                userlist.push(new User(data[i].id, data[i].name, 0, 0, 0, null, false));
                console.log("%c Neuer User hinzugefügt", "color: red")
                userIndex = userlist.findIndex((obj => obj.id == data[i].id));
            }
            if (data[i].punkte<0) {
                userlist.splice(userIndex, 1);
            } else {
                    userlist[userIndex].punkte = data[i].punkte;
                    userlist[userIndex].streak = data[i].streak;
                    userlist[userIndex].vote = data[i].vote;
                    userlist[userIndex].podium = data[i].podium;
                    userlist[userIndex].rank = i+1;
                    
                    switch (data[i].vote) {
                        case 'a':
                            avotes++;
                            break;
                        case 'b':
                            bvotes++;
                            break;
                        case 'c':
                            cvotes++;
                            break;
                        case 'd':
                            dvotes++;
                            break;
                        default:
                            userlist[userIndex].vote = null;
                            break;
                    }
            }            
        }

        userlist.sort(function (a, b) {return a.rank - b.rank});
        
        apod = [];
        bpod = [];
        cpod = [];
        dpod = [];

        podiumList = userlist.filter(user => user.podium == true);
        for(let i = 0; i < podiumList.length; i++) {
            switch (podiumList[i].vote) {
                case 'a':
                    apod.push(podiumList[i].name);
                    break;
                case 'b':
                    bpod.push(podiumList[i].name);
                    break;
                case 'c':
                    cpod.push(podiumList[i].name);
                    break;
                case 'd':
                    dpod.push(podiumList[i].name);
                    break;
                default:
                    break;
            }
        }

        switch(questions[activequestionid].c) {
            case "":
                yValues = [avotes, bvotes];
                barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)"];
                borderColors = [a.style.borderColor, b.style.borderColor];
                break;
            default:
                xValues = [apod, bpod, cpod, dpod]
                yValues = [avotes, bvotes, cvotes, dvotes];
                barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)", "rgb(9, 85, 164)", "rgb(169, 90, 229)"];
                borderColors = [a.style.borderColor, b.style.borderColor, c.style.borderColor, d.style.borderColor];
                break;
        }
        nchart();
    });
}



// Erstellt Diagramm, greift zurück auf "auswertung();"
function nchart() {
    new Chart("vote", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            borderColor: borderColors,
            borderWidth: 3,
            data: yValues,
            }]
        },
            options: {
                
                // Größe muss so, damit der Wert der größten Column nicht abgeschnitten wird
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 50,
                        bottom: 50
                    }},
                title: {
                    // Würde Titel des Diagramms Antzeigen
                display: false,
                },
                plugins: { // Lies alles nach unter https://v0_7_0--chartjs-plugin-datalabels.netlify.app/guide/positioning.html#anchoring
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        // Würde oben noch mal zu jeder Column den Wert anzeigen, wird aber weiter unten im Code schon mit Plugin "Datalabels" geregelt
                    display: false,
                    },
                    datalabels: {
                        // Style von den Werten der Columns
                        color: "white",
                        font: {
                            size: 30,
                        },
                        // Positionierung
                        anchor: 'end',
                        align: 'top',
                        clamp: true     
                }},
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: "white",
                            font: {
                                size: 20,
                            },
                        }
                    },
                    y: {
                        // Würde yAchse mit Beschriftung (also 100, 150, 200, 250, etc) anzeigen Lassen
                        display: false,
                        ticks: {
                            beginAtZero: true,
                            display: false
                        }
                    },
                }
            },
            plugins: [ChartDataLabels]
        });
    document.body.classList.remove('waiting');
}






const table = document.getElementById('table');
const tablebox = document.getElementById('tablebox');

// Erzeugt eine neue Spalte in Rangliste mit eingegebenen Daten
// row hat als class "rank1", "rank2", "rank4", "rakn5" usw.
// einzelnes feld hat als class "row", ist noch änderbar

function fetchRangliste() {
    trennung = 0;
    for (let i = 0; i < userlist.length; i++) {

        if (userlist[i].podium==true) {
            utype = "podium";
        } else {
            utype = "normaluser";
        }

        if(i<ranglistenlimit) {
            userupdate(userlist[i].id, userlist[i].rank, userlist[i].name, userlist[i].punkte, userlist[i].streak, utype);
        } else {
            if (utype=="podium") {
                if(trennung==0) {
                    // Roter trennstrich nach top 10 oder 15 
                    document.getElementById('table').innerHTML += `
                    <tr class="emptycolumn">
                        <td class="spacecol"</td>
                        <td class="spacecol"></td>
                        <td class="spacecol"></td>
                        <td class="spacecol"></td>
                    </tr>`;
                    trennung = 1;
                }
                if(i-1>ranglistenlimit && userlist[i-1].podium==false) {
                    emptycolumn();
                }
                userupdate(userlist[i].id, userlist[i].rank, userlist[i].name, userlist[i].punkte, userlist[i].streak, utype);
            }
        }

    }
}



function userupdate(id, rank, uname, score, streak, type) {
    console.log('userupdate')
    if (streak==0) {
        sbox = "";
    } else {
        sbox = `        <div class="simg img"></div>
        <div>${streak}</div>`
    }
    if(type == "podium") {
        checked = "checked"
    } else {
        checked = ""
    }
    if (activequestionid==nextPodium) {
        cb = `     
    <td>
        <label class="switch">
            <input class="switchinput" type="checkbox" onchange="toggle('${id}', this)" ${checked}>
            <area class="switch slider"></area>
        </label>
    </td>`
    } else {
        cb = "";
    }
    // Hier gerne bearbeiten, der type ist "podium" oder "normaluser", er wird in zeile 507-511 festgelegt
    document.getElementById('table').innerHTML += `
    <tr class="${type} row" id="${id}row">
        <td class="rank">${rank}</th>
        <td class="uname">${uname}</th>
        <td class="score">${score}</th>
        <td class="streak">${sbox}</th>
        ${cb}
    </tr>`;
}


function emptycolumn() {
    // Die "..." Row, änder was du willst
    document.getElementById('table').innerHTML += `
    <tr class="emptycolumn">
        <td class="normaluser">...</td>
        <td class="normaluser"></td>
        <td class="normaluser"></td>
        <td class="normaluser"></td>
    </tr>`;
}


function checkStarting () {
    console.log('nix')
}






function toggle(id, cb) {
    userIndex = userlist.findIndex((obj => obj.id == id));
    if(cb.checked == true) {
        userlist[userIndex].podium = true;
        supabaseUpdate('spieler', ['podium'], [true], 'eq', 'id', id);
        document.getElementById(id+"row").classList.remove('normaluser');
        document.getElementById(id+"row").classList.add('podium');
    } else {
        userlist[userIndex].podium = false;
        supabaseUpdate('spieler', ['podium'], [false], 'eq', 'id', id);
        document.getElementById(id+"row").classList.remove('podium');
        document.getElementById(id+"row").classList.add('normaluser');
    }
}



// Entwicklertools




function showCharts(avotes, bvotes, cvotes, dvotes, richtigeanwort) {
    beforegamebox.style.display = "none";
    toggleInterface(fragenbox);
    votebox.style.display = "block";
    timerContainer.style.display = "none";


    if (avotes==null) {
        avotes = 6;
    }
    if (bvotes==null) {
        bvotes = 42;
    }
    if (cvotes==null) {
        cvotes = 53;
    }
    if (dvotes==null) {
        dvotes = 23;
    }
    if (richtigeanwort==null) {
        richtigeanwort = "c";
    }


    
    if(richtigeanwort=="a") {
        a.style.border = "white solid 5px";
    } else {
        a.style.opacity = "0.5";
        a.style.border = "transparent";
    }
    if(richtigeanwort=="b") {
        b.style.border = "white solid 5px"
    } else {
        b.style.opacity = "0.5";
        b.style.border = "transparent";
    }
    if(richtigeanwort=="c") {
        c.style.border = "white solid 5px"
    } else {
        c.style.opacity = "0.5";
        c.style.border = "transparent";
    }
    if(richtigeanwort=="d") {
        d.style.border = "white solid 5px"
    } else {
        d.style.opacity = "0.5";
        d.style.border = "transparent";
    }
    xValues = ["", "jürgen", ["walter", "tilman", "manfred", "lorentz", "bernd"], ["mario", "luigi"]];
    yValues = [avotes, bvotes, cvotes, dvotes];
    barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)", "rgb(9, 85, 164)", "rgb(169, 90, 229)"];
    borderColors = [a.style.borderColor, b.style.borderColor, c.style.borderColor, d.style.borderColor];

    nchart();
}

//showCharts();

function addDummies(number) {
    for (let i = 0; i < number; i++) {
        supabaseInsert("spieler", ["name"], ["Dummy"+[i+1]])
        console.log("Insert Dummy")
    }
}











async function reset() {
    await supabaseDeleteAll('spieler');
    await supabaseDeleteAll('fragen');
    for (let i = 0; i < questions.length; i++) {
        supabaseInsert("fragen", ["id"], [i])
    }
    addDummies(10);
}

function noReset() {
    supabaseFetch('fragen', 'beginn, id', '', '', '', 'id', true).then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].beginn==true) {
                activequestionid = data[i].id;
                console.log(activequestionid)
            }
        }
        // Wenn letzte Frage schon gespiel wurde
        if(activequestionid==questions.length-1) {
            ende();
        }
    })
}

async function ende() {
    await auswertung();
    weiter();
}


confirm("Die Spieler werden nun zurückgesetzt, es wird bei Frage 1 gestartet.\n\nWenn sie Abbrechen drücken, wird das letzte gespielte Quiz forgesetzt.") ? reset() : noReset();
