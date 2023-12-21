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

let activequestionid = 0;

startgamebt.addEventListener('click', startgame);
bt1.addEventListener('click', interphase1);
bt2.addEventListener('click', weiter);

function startgame() {
    console.log('beginne spiel')
    beforegamebox.style.display = "none";y
    interphase1();
}

function toggleInterface(phase) {
    rangliste.style.display = "none";
    fragenbox.style.display = "none";
    zwischenbox.style.display = "none";

    phase.style.display = "flex";
}



function interphase1() {
    activequestionid++;
    // if operator checkt, ob noch fragen da sind
    if(activequestionid>=questions.length) {
        alert("Quiz fertig, keine fragen mehr da");
        return;
    } else {
    qnumber.style.display = "block";
    qnumber.innerHTML = "Frage "+activequestionid+" von "+questions.length;

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
}};



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
        if (questions[activequestionid].c=="") {
            c.style.display = "none";
            d.style.display = "none";
            a.style.backgroundColor = "#0B52C1";
            b.style.backgroundColor = "#D11031";
        } else {
        c.innerHTML = questions[activequestionid].c;
            if (questions[activequestionid].d==""){
                    d.style.display = "none"
                } else {
                    d.innerHTML = questions[activequestionid].d;
            }
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
    anzeigefrage2.style.display = "flex";
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
    supabaseUpdate('spieler', ['avotes', 'bvotes', 'cvotes', 'dvotes'], [false, false, false, false], 'gt', 'id', '-2');
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
    auswertung();
    bt2.style.display = "block";
}






// Diagramm wer für was gestimmt hat
// Musst du nicht verstehen, hab versucht so gut wie möglich zu kommentieren, damit für Style einfacher ist
// Im Fall der Fälle kannst du unter https://www.chartjs.org/docs/latest/ alles nachlesen
function auswertung() {
    votebox.style.display = "block";
    avotes = 0;
    bvotes = 0;
    cvotes = 0;
    dvotes = 0;
    anzeigefrage2.style.display = "none";
    // Entscheidet, welches Diagramm verwendet werden soll, je nach Fragentyp
    if (questions[activequestionid].c=="") {
        // Zwei Antwortmöglichkeiten
        supabaseFetch('spieler', 'id, name, punkte, streak, avotes, bvotes', '', '', '', 'punkte', false).then((data) => {
            for (let i = 0; i < data.length; i++) {
                userIndex = userlist.findIndex((obj => obj.id == data[i].id));
                if (userIndex==-1) {
                    userlist.push(new User(data[i].id, data[i].name, 0, 0, 0, false, 0));
                    userIndex = userlist.findIndex((obj => obj.id == data[i].id));
                }
                if(data[i].punkte<0) {
                    userlist[userIndex].punkte = -1;
                    userlist[userIndex].banned = true;
                } else {
                    userlist[userIndex].punkte = data[i].punkte;
                    userlist[userIndex].streak = data[i].streak;
                    userlist[userIndex].rank = i+1;
                    supabaseUpdate('spieler', ['rang'], [i+1], 'eq', 'id', data[i].id);
                    if(data[i].avotes==true) {
                        avotes = avotes+1;
                    } else {
                        if(data[i].bvotes==true) {
                            bvotes = bvotes+1;
                        } 
                            }
                        }
                    }
                    if(i==data.length-1) {
                        // Sortiert den Array userlist nach Rang, rang 1 ist userlist[0], rang 2 userlist[1] usw.
                        userlist.sort(function (a, b) {return a.rank - b.rank});
                        xValues = [a.innerHTML, b.innerHTML];
                        yValues = [avotes, bvotes];
                        barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)"];
                        borderColors = [a.style.borderColor, b.style.borderColor];
                        nchart();
                    } 
        });
    } else {
         if(questions[activequestionid].d=="") {
        // Drei Antwortmöglichkeiten
        supabaseFetch('spieler', 'id, name, punkte, streak, avotes, bvotes, cvotes', '', '', '', 'punkte', false).then((data) => {
            for (let i = 0; i < data.length; i++) {
                userIndex = userlist.findIndex((obj => obj.id == data[i].id));
                if (userIndex==-1) {
                    userlist.push(new User(data[i].id, data[i].name, 0, 0, 0, false, 0));
                    userIndex = userlist.findIndex((obj => obj.id == data[i].id));
                }
                if(data[i].punkte<0) {
                    userlist[userIndex].punkte = -1;
                    userlist[userIndex].banned = true;
                } else {
                    userlist[userIndex].punkte = data[i].punkte;
                    userlist[userIndex].streak = data[i].streak;
                    userlist[userIndex].rank = i+1;
                    supabaseUpdate('spieler', ['rang'], [i+1], 'eq', 'id', data[i].id);
                    if(data[i].avotes==true) {
                        avotes = avotes+1;
                    } else {
                        if(data[i].bvotes==true) {
                            bvotes = bvotes+1;
                        } else {
                            if(data[i].cvotes==true) {
                                cvotes = cvotes+1;
                            }
                            }
                        }
                    }
                    if(i==data.length-1) {
                        // Sortiert den Array userlist nach Rang, rang 1 ist userlist[0], rang 2 userlist[1] usw.
                        userlist.sort(function (a, b) {return a.rank - b.rank});
                        xValues = [a.innerHTML, b.innerHTML, c.innerHTML];
                        yValues = [avotes, bvotes, cvotes];
                        barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)", "rgb(9, 85, 164)"];
                        borderColors = [a.style.borderColor, b.style.borderColor, c.style.borderColor];
                        nchart();
                    }
                }
            }
        );
        } else {
            // Vier Antwortmöglichkeiten (Normalfall)
            
            supabaseFetch('spieler', 'id, name, punkte, streak, avotes, bvotes, cvotes, dvotes', '', '', '', 'punkte', false).then((data) => {
                console.log("fetch abstimmung und rest")
                for (let i = 0; i < data.length; i++) {
                    userIndex = userlist.findIndex((obj => obj.id == data[i].id));
                    if (userIndex==-1) {
                        userlist.push(new User(data[i].id, data[i].name, 0, 0, 0, false, 0));
                        userIndex = userlist.findIndex((obj => obj.id == data[i].id));
                    }
                    if(data[i].punkte<0) {
                        userlist[userIndex].punkte = -1;
                        userlist[userIndex].banned = true;
                    } else {
                        userlist[userIndex].punkte = data[i].punkte;
                        userlist[userIndex].streak = data[i].streak;
                        userlist[userIndex].rank = i+1;
                        supabaseUpdate('spieler', ['rang'], [i+1], 'eq', 'id', data[i].id);
                        if(data[i].avotes==true) {
                            avotes = avotes+1;
                        } else {
                            if(data[i].bvotes==true) {
                                bvotes = bvotes+1;
                            } else {
                                if(data[i].cvotes==true) {
                                    cvotes = cvotes+1;
                                } else {
                                    if(data[i].dvotes==true) {
                                        dvotes = dvotes+1;
                                    }
                                }
                            }
                        }
                        if(i==data.length-1) {
                            // Sortiert den Array userlist nach Rang, rang 1 ist userlist[0], rang 2 userlist[1] usw.
                            userlist.sort(function (a, b) {return a.rank - b.rank});
                            xValues = [a.innerHTML, b.innerHTML, c.innerHTML, d.innerHTML];
                            yValues = [avotes, bvotes, cvotes, dvotes];
                            barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)", "rgb(9, 85, 164)", "rgb(169, 90, 229)"];
                            borderColors = [a.style.borderColor, b.style.borderColor, c.style.borderColor, d.style.borderColor];
                            nchart();
                        }
                    }
                }
            });
        }
    }
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
                        // Würde xAchse und Beschriftung der Columns (A, B, C, D) anzeigen lassen
                        display: false
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
}






const table = document.getElementById('table');
const tablebox = document.getElementById('tablebox');

// Erzeugt eine neue Spalte in Rangliste mit eingegebenen Daten
// row hat als class "rank1", "rank2", "rank4", "rakn5" usw.
// einzelnes feld hat als class "row", ist noch änderbar

function fetchRangliste() {
    for (let i = 0; i < userlist.length; i++) {
        if (userlist[i].blocked==false) {
        userupdate(userlist[i].rank, userlist[i].name, userlist[i].punkte, userlist[i].streak);
        }
    }
}



function userupdate(rank, uname, score, streak) {
    console.log('userupdate')
    if (streak==0) {
        sbox = "";
    } else {
        sbox = `        <div class="simg img"></div>
        <div>${streak}</div>`
    }
    document.getElementById('table').innerHTML += `
    <tr class="rank${rank}">
        <td class="row">${rank}</th>
        <td class="row">${uname}</th>
        <td class="row">${score}</th>
        <td class="rowstreak">${sbox}</th>
    </tr>`;
}


// const reseto = document.getElementById('resetFragen');
// reseto.addEventListener('click', function() {
//     for (let i = 0; i < questions.length; i++) {
//         console.log('%c resete frage' + i, 'background: #222; color: #bada55')
//         supabaseUpdate('fragen', ['beginn', 'start', 'ende'], [false, false, false], 'eq', 'id', i)
//     }
// })
// resettu.addEventListener('click', function() {
//     supabaseDeleteAll('spieler');
// })


function checkStarting () {
    console.log('nix')
}

for (let i = 0; i <= questions.length; i++) {
    console.log('%c resete frage' + i, 'background: #222; color: #bada55')
    supabaseUpdate('fragen', ['beginn', 'start', 'ende', 'auswertung'], [false, false, false, false], 'eq', 'id', i)
}

supabaseDeleteAll('spieler');
