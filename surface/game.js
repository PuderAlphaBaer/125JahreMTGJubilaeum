  


  const anzeigefrage1 = document.getElementById('anzeigefrage1');
  const anzeigefrage2 = document.getElementById('anzeigefrage2');
  const a = document.getElementById('a');
  const b = document.getElementById('b');
  const c = document.getElementById('c');
  const d = document.getElementById('d');
  const y = document.getElementById('y');
  const n = document.getElementById('n');
  const btbox = document.getElementById('btbox');
  const buttonBox = document.getElementById('buttonBox');
  const bt2 = document.getElementById('bt2');

  const bt1 = document.getElementById('bt1');
  const fragenbox = document.getElementById('fragenbox');
  const rangliste = document.getElementById('rangliste');
  bt1.addEventListener('click', startpreQuestion);
  


  const tbox1 = document.getElementById('tbox1');
  const tbox2 = document.getElementById('tbox2');
  const zwischenbox = document.getElementById('zwischenbox');
  const gamebox = document.getElementById('gamebox');
  const beforegamebox = document.getElementById('beforegamebox');
  const startgamebt = document.getElementById('startgamebt');


  startgamebt.addEventListener('click', startgame);

  function startgame() {
    beforegamebox.style.display = "none";
    startpreQuestion();
  }















  let pretime = 1000;
//  tbox2.style.transition = "linear " + pretime;  
  function startpreQuestion() {
    // if operator checkt, ob noch fragen da sind
    if(questionid==questions.length) {
        // Wird noch schöner :P
        alert("Quiz fertig, keine fragen mehr da");
    } else {
            questionid = questionid+1;
    // Hier einfach des Snippetsding für UTC einfügen !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    timestart = Date.now();
    supabaseUpdate("fragen", ["start"], [timestart], "eq",  "id",  questionid);
    rangliste.style.display = "none";
    tbox2.style.width = "80%";
    anzeigefrage1.innerHTML = questions[questionid-1].frage;
    setTimeout(() => {
        tbox2.style.width = "0";
        startQuestion();
    }, pretime);
  }};


// wird nach ablaufen der ersten 5s aufgerufen
  function startQuestion() {
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
    anzeigefrage2.innerHTML = questions[questionid-1].frage;
    // Multiple Choice Frage
        a.innerHTML = questions[questionid-1].a;
        b.innerHTML = questions[questionid-1].b;
        if (questions[questionid-1].c=="") {
            c.style.display = "none";
            d.style.display = "none";
            a.style.backgroundColor = "#0B52C1";
            b.style.backgroundColor = "#D11031";
        } else {
        c.innerHTML = questions[questionid-1].c;
            if (questions[questionid-1].d==""){
                    d.style.display = "none"
                } else {
                    d.innerHTML = questions[questionid-1].d;
            }
        }
    





    startTimer();
    }


let questionid = 0;
let timestart;



bt2.addEventListener('click', weiter);


// wird bei click auf den Knopf "Weiter" nach Beenden der Frage aufgerufen
function weiter() {
    // setzt alles auf Anfang zurück
    rangliste.style.display = "flex";
    fragenbox.style.display = "none";
    bt2.style.display = "none";
    votebox.style.display = "none";
    // entfernt das alte Diagramm und erstellt ein neues leeres, was dann mit beenden des nächsten Timers befüllt wird
    votebox.removeChild(document.getElementById('vote'));
    votebox.innerHTML = '<canvas id="vote" class="vote"></canvas>';
    // entfert letzte Rangliste und erstellt neue leere, die mit fetchRangliste(); gefüllt wird
    tablebox.removeChild(document.getElementById('table'));
    tablebox.innerHTML = 
    `<table class="table" id="table">
        <tr class=""> 
            <th class="udata">Platz</th>
            <th class="udata">Benutzername</th>
            <th class="udata">Punktzahl</th>
        </tr>
    </table>`;
    supabaseUpdate('spieler', ["avotes", "bvotes", "cvotes", "dvotes"], [false, false, false, false], "gt", "id", 0)
    fetchRangliste();
}




    // Timer
  
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');
const timerContainer = document.getElementById('timerContainer');

// Länge der Zeit für Fragen
const sec = 2;
const setTime = sec *1000;


let timerLoop;
let futureTime;
timer.innerHTML = sec+".00"

// startet Timer
function startTimer() { 
  timerLoop = setInterval(countDownTimer, 10);
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
    supabaseUpdate("fragen", ["beendet"], ["true"], "eq", "id", questionid);
    timerContainer.style.display = "none";
    // Verwendet "includes()", um mehrere Lösungen zu ermöglichen -- ACHTUNG includes() wird von Internetexplorer 11 oder weniger nicht unterstützt, sollte kein Problem darstellen, da es nur für surface.html verwendet wird
    if(questions[questionid-1].loesung.includes("a")==true) {
        a.style.border = "white solid 5px";
    } else {
        a.style.opacity = "0.5";
    }
    if(questions[questionid-1].loesung.includes("b")==true) {
        b.style.border = "white solid 5px"
    } else {
        b.style.opacity = "0.5";
    }
    if(questions[questionid-1].loesung.includes("c")==true) {
        c.style.border = "white solid 5px"
    } else {
        c.style.opacity = "0.5";
    }
    if(questions[questionid-1].loesung.includes("d")==true) {
        d.style.border = "white solid 5px"
    } else {
        d.style.opacity = "0.5";
    }
    bt2.style.display = "block";
    auswertung();
}



const votebox = document.getElementById('votebox');
const vote = document.getElementById('vote');


// Diagramm wer für was gestimmt hat
// Musst du nicht verstehen, hab versucht so gut wie möglich zu kommentieren, damit für Style einfacher ist
// Im Fall der Fälle kannst du unter https://www.chartjs.org/docs/latest/ alles nachlesen
function auswertung() {
    votebox.style.display = "block";
    // Entscheidet, welches Diagramm verwendet werden soll, je nach Fragentyp
    if (questions[questionid-1].c=="") {

        // Zwei Antwortmöglichkeiten
        supabaseFetch('spieler', 'avotes', 'eq', 'avotes', true, 'avotes', false).then((data) => {
            supabaseFetch('spieler', 'bvotes', 'eq', 'bvotes', true, 'bvotes', false).then((data2) => {
                xValues = [a.innerHTML, b.innerHTML];
                yValues = [data.length, data2.length];
                barColors = [a.style.backgroundColor, b.style.backgroundColor];
                nchart();
            });
        });

    } else {
        if(questions[questionid-1].d=="") {

            // Drei Antwortmöglichkeiten
            supabaseFetch('spieler', 'avotes', 'eq', 'avotes', true, 'avotes', false).then((data) => {
                supabaseFetch('spieler', 'bvotes', 'eq', 'bvotes', true, 'bvotes', false).then((data2) => {
                    supabaseFetch('spieler', 'cvotes', 'eq', 'cvotes', true, 'cvotes', false).then((data3) => {
                        xValues = [a.innerHTML, b.innerHTML, c.innerHTML];
                        yValues = [data.length, data2.length, data3.length];
                        barColors = [a.style.backgroundColor, b.style.backgroundColor, c.style.backgroundColor];
                        nchart();
                    });
                });
            });

        } else {

            // Vier Antwortmöglichkeiten (Normalfall)
            supabaseFetch('spieler', 'avotes', 'eq', 'avotes', true, 'avotes', false).then((data) => {
                supabaseFetch('spieler', 'bvotes', 'eq', 'bvotes', true, 'bvotes', false).then((data2) => {
                    supabaseFetch('spieler', 'cvotes', 'eq', 'cvotes', true, 'cvotes', false).then((data3) => {
                        supabaseFetch('spieler', 'dvotes', 'eq', 'dvotes', true, 'dvotes', false).then((data4) => {
                            xValues = [a.innerHTML, b.innerHTML, c.innerHTML, d.innerHTML];
                            yValues = [data.length, data2.length, data3.length, data4.length];
                            barColors = [a.style.backgroundColor, b.style.backgroundColor, c.style.backgroundColor, d.style.backgroundColor];
                            nchart();
                        });
                    });
                });
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
                legend: {
                    // Würde oben noch mal zu jeder Column den Wert anzeigen, wird aber weiter unten im Code schon mit Plugin "Datalabels" geregelt
                display: false,
                },
                title: {
                    // Würde Titel des Diagramms Antzeigen
                display: false,
                },
            tooltips: {
                mode: 'single',
            },
            plugins: { // Lies alles nach unter https://v0_7_0--chartjs-plugin-datalabels.netlify.app/guide/positioning.html#anchoring
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
                xAxes: [{
                    // Würde xAchse und Beschriftung der Columns (A, B, C, D) anzeigen lassen
                    display: false
                }],
                yAxes: [{
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
function userupdate(rank, uname, score) {
    supabaseUpdate("spieler", ["rang"], [rank], "eq", "name", uname);
    document.getElementById('table').innerHTML += `
    <tr class="rank${rank}">
        <td class="row">${rank}</th>
        <td class="row">${uname}</th>
        <td class="row">${score}</th>
    </tr>`;
}



// Ruft "userupdate()" für jeden User auf und füllt so Ranglistentabelle
function fetchRangliste() {
supabaseFetch('spieler', 'id, name, punktzahl', 'gt', 'punktzahl', -1, 'punktzahl', false).then((data) => {
            console.log(data)
     for (let i = 0; i < data.length; i++) {
        userupdate(i + 1, data[i].name, data[i].punktzahl)
     }
    });
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


