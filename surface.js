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
    new Frage("mchoice", "Paul", "Meister", "Hindenburg", "Paul der Bär", "Ich", "b"),
    new Frage("mchoice", "Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", "d"),
    new Frage("mchoice", "Sonne", "rot", "gelb", "grün", "blau", "b"),
      
    // Add more questions as needed
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
    // Wolltest du noch machen mit UTC
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
// Müssen wir schaun wie der Input sein wird

// Länge der Zeit für Fragen
const sec = 5;
const setTime = sec *1000;


let timerLoop;
let futureTime;
timer.innerHTML = sec+".00"


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


// Visuelles und technisches Zeug, bei Ablauf von Zeit siehe unterer Kommentar
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




function auswertung() {
    votebox.style.display = "block"




    supabaseFetch('fragen', 'avotes, bvotes, cvotes, dvotes', 'eq', 'id', actualquestionid, 'id', false).then((data) => {
        // Siehe alles https://www.w3schools.com/js/js_graphics_chartjs.asp
        const xValues = ["A", "B", "C", "D"];
        const yValues = [data[0].avotes, data[0].bvotes, data[0].cvotes, data[0].dvotes];
        const barColors = ["red", "yellow","green","blue"];
        
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
            legend: {display: false},
            title: {
              display: false,
              text: "Verteilung"
            }
          }
        });
    });

};



bt3.addEventListener('click', weiter);

function weiter() {
    rangliste.style.display = "flex";
    fragenbox.style.display = "none";
    bt3.style.display = "none";
    votebox.style.display = "none";
    timerContainer.style.display = "flex";
    a.style.opacity = "1";
    b.style.opacity = "1";
    c.style.opacity = "1";
    d.style.opacity = "1";
    // refresht das alte diagramm
    votebox.removeChild(document.getElementById('vote'));
    votebox.innerHTML = '<canvas id="vote" class="vote"></canvas>';
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


function userupdate(uid, uname, score) {

    document.getElementById('table').innerHTML += `
    <tr>
        <td class="row">${uid}</th>
        <td class="row">${uname}</th>
        <td class="row">${score}</th>
    </tr>`;
}


function fetchRangliste() {
supabaseFetch('spieler', 'id, name, punktzahl', 'gt', 'punktzahl', -1, 'punktzahl', false).then((data) => {
            console.log(data)
     for (let i = 0; i < data.length; i++) {
        userupdate(i + 1, data[i].name, data[i].punktzahl)
     }
    });
}






fetchRangliste();