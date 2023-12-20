const anzeigefrage1 = document.getElementById('anzeigefrage1');
const anzeigefrage2 = document.getElementById('anzeigefrage2');
const a = document.getElementById('a');
const b = document.getElementById('b');
const c = document.getElementById('c');
const d = document.getElementById('d');
const y = document.getElementById('y');
const n = document.getElementById('n');
const zwischenbox = document.getElementById('zwischenbox');
const gamebox = document.getElementById('gamebox');
const beforegamebox = document.getElementById('beforegamebox');
const tbox1 = document.getElementById('tbox1');
const tbox2 = document.getElementById('tbox2');
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

let fragennumber = 0;

startgamebt.addEventListener('click', startgame);
bt1.addEventListener('click', startpreQuestion);
bt2.addEventListener('click', weiter);

function startgame() {
    console.log('beginne spiel')
    beforegamebox.style.display = "none";y
    startpreQuestion();
}


//  tbox2.style.transition = "linear " + pretime;  
function startpreQuestion() {
    fragennumber++;
    // if operator checkt, ob noch fragen da sind
    if(fragennumber>=questions.length) {
        alert("Quiz fertig, keine fragen mehr da");
        return;
    } else {
    qnumber.style.display = "block";
    qnumber.innerHTML = "Frage "+fragennumber+" von "+questions.length;

    console.log('%c beginne' + fragennumber, 'background: #222; color: #bada55')
    supabaseUpdate('fragen', ['beginn'], [true], 'eq', 'id', fragennumber)


    rangliste.style.display = "none";
    tbox2.style.width = "80%";
    anzeigefrage1.innerHTML = questions[fragennumber].frage;

    setTimeout(() => {
        tbox2.style.width = "0";
        startQuestion();
    }, pretime);
    // }, 1000);
}};


// wird nach ablaufen der ersten 5s aufgerufen
  function startQuestion() {
    console.log('%c starte frage' + fragennumber, 'background: #222; color: #bada55')
    supabaseUpdate('fragen', ['start'], [true], 'eq', 'id', fragennumber)

    fragenbox.style.display = "flex";
    rangliste.style.display = "none";
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
    a.style.backgroundColor = "#D11031";
    b.style.backgroundColor = "#F99306";
    c.style.backgroundColor = "#1B7A08";
    d.style.backgroundColor = "#0B52C1";
    anzeigefrage2.innerHTML = questions[fragennumber].frage;
    // Multiple Choice Frage
        a.innerHTML = questions[fragennumber].a;
        b.innerHTML = questions[fragennumber].b;
        if (questions[fragennumber].c=="") {
            c.style.display = "none";
            d.style.display = "none";
            a.style.backgroundColor = "#0B52C1";
            b.style.backgroundColor = "#D11031";
        } else {
        c.innerHTML = questions[fragennumber].c;
            if (questions[fragennumber].d==""){
                    d.style.display = "none"
                } else {
                    d.innerHTML = questions[fragennumber].d;
            }
        }
    

        if(questions[fragennumber].img!=false) {
            imgbox.style.display = "block";
            img.src = "../"+questions[fragennumber].img;
        } else {
            imgbox.style.display = "none";
        }

    // Timer starten
    startTimer();


    }


let timestart;




function weiter() {
    supabaseUpdate('fragen', ['auswertung'], [true], 'eq', 'id', fragennumber)
    qnumber.style.display = "none";
    rangliste.style.display = "flex";
    fragenbox.style.display = "none";
    bt2.style.display = "none";
    anzeigefrage2.style.display = "flex";
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
    bt1.innerHTML = "Starte Frage "+(fragennumber+1)+" von "+(questions.length-1);
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
  setTime = questions[fragennumber].zeit*1000;
  timer.innerHTML = questions[fragennumber].zeit+".00";
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
    console.log('%c beende frage' + fragennumber, 'background: #222; color: #bada55')
    supabaseUpdate('fragen', ['ende'], [true], 'eq', 'id', fragennumber)
    timerContainer.style.display = "none";
    // Verwendet "includes()", um mehrere Lösungen zu ermöglichen -- ACHTUNG includes() wird von Internetexplorer 11 oder weniger nicht unterstützt, sollte kein Problem darstellen, da es nur für surface.html verwendet wird
    if(questions[fragennumber].loesung.includes("a")==true) {
        a.style.border = "white solid 5px";
    } else {
        a.style.opacity = "0.5";
        a.style.border = "transparent";
    }
    if(questions[fragennumber].loesung.includes("b")==true) {
        b.style.border = "white solid 5px"
    } else {
        b.style.opacity = "0.5";
        b.style.border = "transparent";
    }
    if(questions[fragennumber].loesung.includes("c")==true) {
        c.style.border = "white solid 5px"
    } else {
        c.style.opacity = "0.5";
        c.style.border = "transparent";
    }
    if(questions[fragennumber].loesung.includes("d")==true) {
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
    if (questions[fragennumber].c=="") {
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
                        // userlist[userIndex].afk = 0;
                    } else {
                        if(data[i].bvotes==true) {
                            bvotes = bvotes+1;
                            // userlist[userIndex].afk = 0;
                        } 
                                }// else {
                                    // Wird aufgerufen, wenn user nicht abgestimmt hat
                                 //   userlist[userIndex].afk = 1;
                                 //   if (userlist[userIndex].afk>=2) {
                                 //       supabaseUpdate('spieler', ['punkte', 'blocked'], [-1, ], 'eq', 'id', data[i].id);
                                 //       userlist[userIndex].banned = true;
                                 //   }
                                // }
                        }
                    }
                    if(i==data.length-1) {
                        userlist.sort(function (a, b) {return a.rank - b.rank});
                        xValues = [a.innerHTML, b.innerHTML];
                        yValues = [avotes, bvotes];
                        barColors = [a.style.backgroundColor, b.style.backgroundColor];
                        borderColors = [a.style.borderColor, b.style.borderColor];
                        nchart();
                    } 
        });
    } else {
         if(questions[fragennumber].d=="") {
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
                        // userlist[userIndex].afk = 0;
                    } else {
                        if(data[i].bvotes==true) {
                            bvotes = bvotes+1;
                            // userlist[userIndex].afk = 0;
                        } else {
                            if(data[i].cvotes==true) {
                                cvotes = cvotes+1;
                                // userlist[userIndex].afk = 0;
                            } // else {
                                        // Wird aufgerufen, wenn user nicht abgestimmt hat
                                 //   userlist[userIndex].afk = 1;
                                 //   if (userlist[userIndex].afk>=2) {
                                 //       supabaseUpdate('spieler', ['punkte', 'blocked'], [-1, ], 'eq', 'id', data[i].id);
                                 //       userlist[userIndex].banned = true;
                                 //   }
                                // }
                            }
                        }
                    }
                    if(i==data.length-1) {
                        userlist.sort(function (a, b) {return a.rank - b.rank});
                        xValues = [a.innerHTML, b.innerHTML, c.innerHTML];
                        yValues = [avotes, bvotes, cvotes];
                        barColors = [a.style.backgroundColor, b.style.backgroundColor, c.style.backgroundColor];
                        borderColors = [a.style.borderColor, b.style.borderColor, c.style.borderColor];
                        nchart();
                    }
                }
            }
        );
        } else {
            // Vier Antwortmöglichkeiten (Normalfall)
            
            supabaseFetch('spieler', 'id, name, punkte, streak, avotes, bvotes, cvotes, dvotes', '', '', '', 'punkte', false).then((data) => {
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
                            // userlist[userIndex].afk = 0;
                        } else {
                            if(data[i].bvotes==true) {
                                bvotes = bvotes+1;
                                // userlist[userIndex].afk = 0;
                            } else {
                                if(data[i].cvotes==true) {
                                    cvotes = cvotes+1;
                                    // userlist[userIndex].afk = 0;
                                } else {
                                    if(data[i].dvotes==true) {
                                        dvotes = dvotes+1;
                                        // userlist[userIndex].afk = 0;
                                    }// else {
                                        // Wird aufgerufen, wenn user nicht abgestimmt hat
                                     //   userlist[userIndex].afk = 1;
                                     //   if (userlist[userIndex].afk>=2) {
                                     //       supabaseUpdate('spieler', ['punkte', 'blocked'], [-1, ], 'eq', 'id', data[i].id);
                                     //       userlist[userIndex].banned = true;
                                     //   }
                                    // }
                                }
                            }
                        }
                        if(i==data.length-1) {
                            userlist.sort(function (a, b) {return a.rank - b.rank});
                            xValues = [a.innerHTML, b.innerHTML, c.innerHTML, d.innerHTML];
                            yValues = [avotes, bvotes, cvotes, dvotes];
                            barColors = [a.style.backgroundColor, b.style.backgroundColor, c.style.backgroundColor, d.style.backgroundColor];
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
            tooltips: {
                mode: 'single',
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
                        weight: 'bold'
                    },
                    // Positionierung
                    anchor: 'end',
                    align: 'top',
                    clamp: true     
            }},
            scales: {
                x: [{
                    // Würde xAchse und Beschriftung der Columns (A, B, C, D) anzeigen lassen
                    display: false
                }],
                y: [{
                    // Würde yAchse mit Beschriftung (also 100, 150, 200, 250, etc) anzeigen Lassen
                    display: false,
                    ticks: {
                        beginAtZero: true
                      }
                }],
            }
            }
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






// Muss ich noch machen, is damit abhängig von Bereich entsprechender btn bei Enter gedrückt wird
// document.addEventListener("keypress", function(event) {
//     if (event.key === 'Enter') {
//         event.preventDefault()

//             if(bt2.style.display === 'block'){
//                 bt2.click();
//                 console.log("bt2c")
//             } else {
//                 if(bt1.style.display === 'block'){
//                     bt1.click();
//                     console.log("bt1c")
//                 } else {
//                     console.log("notbt1")
//                 }
//             }
//     }
// });


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
