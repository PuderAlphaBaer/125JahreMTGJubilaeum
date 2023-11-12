// Konstruktor für Fragen
class Frage {
    constructor(type, frage, a, b, c, d, loesung) {
      this.type = type;
      this.frage = frage;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.loesung = loesung;
    }
  }

  let questions = [
    // Hier alle Fragen in richtiger Reinfolge auflisten
    new Frage("mchoice", "Paul", "Meister", "Hindenburg", "Paul der Bär", "Ich", "b"),
    new Frage("mchoice", "Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", "d"),
    new Frage("mchoice", "Sonne", "rot", "gelb", "grün", "blau", "b"),
    new Frage("mchoice", "Wie war das kack Ding mit dem Diagramm", "alles nachfolgende", "anstrengend", "kompliziert", "nervenaufreibend", "a"),
  ];


  


  const anzeigefrage = document.getElementById('anzeigefrage');
  const a = document.getElementById('a');
  const b = document.getElementById('b');
  const c = document.getElementById('c');
  const d = document.getElementById('d');
  const buttonContainer = document.getElementById('buttonContainer');
  const bt3 = document.getElementById('bt3');

  const bt2 = document.getElementById('bt2');
  const fragenbox = document.getElementById('fragenbox');
  const rangliste = document.getElementById('rangliste');
  bt2.addEventListener('click', startQuestion);
  



let actualquestionid= 0;
let timestart;


function startQuestion() {
    if(actualquestionid==questions.length) {
        // Wird noch schöner :P
        alert("Quiz fertig, keine fragen mehr da");
    } else {
    actualquestionid = actualquestionid+1;
    // Wolltest du noch machen mit UTC !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    timestart = Date.now();
    supabaseUpdate("fragen", ["start"], [timestart], "eq",  "id",  actualquestionid);
    fragenbox.style.display = "flex";
    rangliste.style.display = "none";
    anzeigefrage.innerHTML = questions[actualquestionid-1].frage;
    a.innerHTML = questions[actualquestionid-1].a;
    b.innerHTML = questions[actualquestionid-1].b;
    c.innerHTML = questions[actualquestionid-1].c;
    d.innerHTML = questions[actualquestionid-1].d;
    startTimer();
    }
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
    if(questions[actualquestionid-1].loesung=="a") {
        a.style.opacity = "1";
    } else {
        a.style.opacity = "0.5";
    }
    if(questions[actualquestionid-1].loesung=="b") {
        b.style.opacity = "1";
    } else {
        b.style.opacity = "0.5";
    }
    if(questions[actualquestionid-1].loesung=="c") {
        c.style.opacity = "1";
    } else {
        c.style.opacity = "0.5";
    }
    if(questions[actualquestionid-1].loesung=="d") {
        d.style.opacity = "1";
    } else {
        d.style.opacity = "0.5";
    }
    bt3.style.display = "block";
    auswertung();
}



const votebox = document.getElementById('votebox');
const vote = document.getElementById('vote');


// Diagramm wer für was gestimmt hat
// Musst du nicht verstehen, hab versucht so gut wie möglich zu kommentieren, damit für Style einfacher ist
function auswertung() {
    votebox.style.display = "block"
    supabaseFetch('fragen', 'avotes, bvotes, cvotes, dvotes', 'eq', 'id', actualquestionid, 'id', false).then((data) => {
        // Lies nach alles unter https://www.chartjs.org/docs/latest/
        const xValues = ["A", "B", "C", "D"];
        const yValues = [data[0].avotes, data[0].bvotes, data[0].cvotes, data[0].dvotes];
        const barColors = ["#D11031", "#F99306","#1B7A08","#0B52C1"];
        
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
    });

};



bt3.addEventListener('click', weiter);


// wird bei click auf den Knopf "Weiter" nach beenden des Timers aufgerufen
function weiter() {
    // setzt alles auf Anfang zurück
    rangliste.style.display = "flex";
    fragenbox.style.display = "none";
    bt3.style.display = "none";
    votebox.style.display = "none";
    timerContainer.style.display = "flex";
    a.style.opacity = "1";
    b.style.opacity = "1";
    c.style.opacity = "1";
    d.style.opacity = "1";
    // entfernt das alte Diagramm und erstellt ein neues leeres, was dann mit beenden des nächsten Timers befüllt wird
    votebox.removeChild(document.getElementById('vote'));
    votebox.innerHTML = '<canvas id="vote" class="vote"></canvas>';
    // entfert letzte Rangliste und erstellt neue leere, die mit fetchRangliste(); gefüllt wird
    tablebox.removeChild(document.getElementById('table'));
    tablebox.innerHTML = 
    `<table class="table" id="table">
        <tr> 
            <th class="udata">Platz</th>
            <th class="udata">Benutzername</th>
            <th class="udata">Punktzahl</th>
        </tr>
    </table>`;
    fetchRangliste();
}








const table = document.getElementById('table');
const tablebox = document.getElementById('tablebox');


// Erzeugt eine neue Spalte in Rangliste mit eingegebenen Daten
function userupdate(uid, uname, score) {
    document.getElementById('table').innerHTML += `
    <tr>
        <td class="row">${uid}</th>
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






fetchRangliste();