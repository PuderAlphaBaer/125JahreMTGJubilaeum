  


  const anzeigefrage1 = document.getElementById('anzeigefrage1');
  const anzeigefrage2 = document.getElementById('anzeigefrage2');
  const a = document.getElementById('a');
  const b = document.getElementById('b');
  const c = document.getElementById('c');
  const d = document.getElementById('d');
  const y = document.getElementById('y');
  const n = document.getElementById('n');
  const mcbtbox = document.getElementById('mcbtbox');
  const ynbtbox = document.getElementById('ynbtbox');
  const buttonBox = document.getElementById('buttonBox');
  const bt2 = document.getElementById('bt2');

  const bt1 = document.getElementById('bt1');
  const fragenbox = document.getElementById('fragenbox');
  const rangliste = document.getElementById('rangliste');
  bt1.addEventListener('click', startpreQuestion);
  


  const tbox1 = document.getElementById('tbox1');
  const tbox2 = document.getElementById('tbox2');
  const zwischenbox = document.getElementById('zwischenbox');





// Konstruktor für Multiple Choice Fragen
class MCFrage {
    constructor(frage, a, b, c, d, loesung) {
      this.frage = frage;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.loesung = loesung;
    }
  }

  // Konstruktor für Ja Nein Fragen
  class YNFrage {
    constructor(frage, y, n, loesung) {
        this.frage = frage;
        this.y = y;
        this.n = n;
        this.loesung = loesung;
    }
  }

  let questions = [
    // Hier alle Fragen in richtiger Reinfolge auflisten
    new MCFrage("Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", "d"),
    new MCFrage("Tilman", "gut", "besser", "am besten", "", "c"),
    new YNFrage("Christian ist ein Profi", "Ja", "Nein", "y"),
    new MCFrage("Paul", "Meister", "Hindenburg", "Paul der Bär", "Ich", "b"),
    new MCFrage("Sonne", "rot", "gelb", "grün", "blau", "b"),
  ];


  let pretime = 1000;
//  tbox2.style.transition = "linear " + pretime;  
  function startpreQuestion() {
    if(questionid==questions.length) {
        // Wird noch schöner :P
        alert("Quiz fertig, keine fragen mehr da");
    } else {
            questionid = questionid+1;
    // Wolltest du noch machen mit UTC !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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



  function startQuestion() {
    fragenbox.style.display = "flex";
    rangliste.style.display = "none";
    anzeigefrage2.innerHTML = questions[questionid-1].frage;
    if(questions[questionid-1].constructor.name=="MCFrage") {
        ynbtbox.style.display = "none";
        a.innerHTML = questions[questionid-1].a;
        b.innerHTML = questions[questionid-1].b;
        c.innerHTML = questions[questionid-1].c;
        // Ermöglicht Fragen mit nur drei Antwortmöglichkeiten
        if (questions[questionid-1].d==""){
                d.style.display = "none"
            } else {
                d.innerHTML = questions[questionid-1].d;
        }
    }
    if(questions[questionid-1].constructor.name=="YNFrage") {
        mcbtbox.style.display = "none";
        y.innerHTML = questions[questionid-1].y;
        n.innerHTML = questions[questionid-1].n;
    }    








    startTimer();
    }


let questionid= 0;
let timestart;



bt2.addEventListener('click', weiter);


// wird bei click auf den Knopf "Weiter" nach beenden des Timers aufgerufen
function weiter() {
    // setzt alles auf Anfang zurück
    rangliste.style.display = "flex";
    fragenbox.style.display = "none";
    bt2.style.display = "none";
    votebox.style.display = "none";
    timerContainer.style.display = "flex";
    mcbtbox.style.display = "flex";
    ynbtbox.style.display = "flex";
    d.style.display = "flex";
    a.style.opacity = "1";
    b.style.opacity = "1";
    c.style.opacity = "1";
    d.style.opacity = "1";
    a.style.border = "none";
    b.style.border = "none";
    c.style.border = "none";
    d.style.border = "none";
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
    fetchRangliste();
}




    // Timer
  
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');
const timerContainer = document.getElementById('timerContainer');

// Timerlaufzeit, wird später warscheinlich kein const sein, sondern veränderbar, weil wir ja noch 5 Sekunden Vorlaufzeit vor Fragen haben wollen oder so, müssen wir noch besprechen

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


// Timer technik
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
    timerContainer.style.display = "none";
    if(questions[questionid-1].loesung=="a") {
        a.style.border = "white solid 5px";
    } else {
        a.style.opacity = "0.5";
    }
    if(questions[questionid-1].loesung=="b") {
        b.style.border = "white solid 5px"
    } else {
        b.style.opacity = "0.5";
    }
    if(questions[questionid-1].loesung=="c") {
        c.style.border = "white solid 5px"
    } else {
        c.style.opacity = "0.5";
    }
    if(questions[questionid-1].loesung=="d") {
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
function auswertung() {
    votebox.style.display = "block";

    if (questions[questionid-1].constructor.name=="MCFrage") {
        if(questions[questionid-1].d=="") {
        supabaseFetch('fragen', 'avotes, bvotes, cvotes', 'eq', 'id', questionid, 'id', false).then((data) => {
            xValues = ["A", "B", "C"];
            yValues = [data[0].avotes, data[0].bvotes, data[0].cvotes];
            barColors = ["#D11031", "#F99306","#1B7A08"];
            nchart();
        });
        } else {
        supabaseFetch('fragen', 'avotes, bvotes, cvotes, dvotes', 'eq', 'id', questionid, 'id', false).then((data) => {
            xValues = ["A", "B", "C", "D"];
            yValues = [data[0].avotes, data[0].bvotes, data[0].cvotes, data[0].dvotes];
            barColors = ["#D11031", "#F99306","#1B7A08","#0B52C1"];
            nchart();
        });
    }
    }

    
    if(questions[questionid-1].constructor.name=="YNFrage") {
        supabaseFetch('fragen', 'yvotes, nvotes', 'eq', 'id', questionid, 'id', false).then((data) => {
            // Lies nach alles unter https://www.chartjs.org/docs/latest/
            xValues = ["Y", "N"];
            yValues = [data[0].yvotes, data[0].nvotes];
            barColors = ["#0B52C1", "#D11031"];
            nchart();
        });
    }

}


function nchart() {
    new Chart("vote", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
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
    document.getElementById('table').innerHTML += `
    <tr class="rank${rank}">
        <td class="row">${rank}</th>
        <td class="row">${uname}</th>
        <td class="row">${score}</th>
    </tr>`;
}



// Ruft Userupdate mehrfach auf und fetcht Userdaten aus supabase
function fetchRangliste() {
supabaseFetch('spieler', 'id, name, punktzahl', 'gt', 'punktzahl', -1, 'punktzahl', false).then((data) => {
            console.log(data)
     for (let i = 0; i < data.length; i++) {
        userupdate(i + 1, data[i].name, data[i].punktzahl)
     }
    });
}



document.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()

            if(bt2.style.display === 'block'){
                bt2.click();
                console.log("bt2c")
            } else {
                if(bt1.style.display === 'block'){
                    bt1.click();
                    console.log("bt1c")
                } else {
                    console.log("notbt1")
                }
            }
    }
});







fetchRangliste();
