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

  const anzeigefrage = document.getElementById('anzeigefrage');
  const bta = document.getElementById('bta');
  const btb = document.getElementById('btb');
  const btc = document.getElementById('btc');
  const btd = document.getElementById('btd');



  const bt2 = document.getElementById('bt2');
  const fragenbox = document.getElementById('fragenbox');
  const rangeliste = document.getElementById('rangliste');
  bt2.addEventListener('click', startQuestion);
  
  function toggleSurface() {
          fragenbox.style.display = "flex";
          rangeliste.style.display = "none";
  }
  


let actualquestionid= 0;
let timestart;

const f1 = new Frage("mchoice", "Paul", "Meister", "Hindenburg", "Paul der Bär", "Ich", "b");
const f2 = new Frage("mchoice", "Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", "d");
const f3 = new Frage("mchoice", "Sonne", "rot", "gelb", "grün", "blau", "b");




function startQuestion() {
    toggleSurface;
    actualquestionid = actualquestionid+1;
    // Wolltest du noch machen mit UTC
    timestart = Date.now();
    supabaseUpdate("fragen", ["start"], [timestart], "eq",  "id",  actualquestionid);
    console.log("f"+actualquestionid.loesung)
    }




















































    // Timer
  
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');

// Müssen wir schaun wie der Input sein wird

// Länge der Zeit für Fragen
const sec = 10;
const setTime = sec *1000;


let timerLoop;
let futureTime;
timer.innerHTML = sec+".00"


function startTimer(time) { 
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
        clearInterval(timerLoop);
        s1.style.display = "none";
        s2.style.display = "none";
        s3.style.display = "none";
        timer.style.fontSize = "3vh";
        timer.innerHTML = "ABGELAUFEN";
        fragenbox.style.display = "none";
        rangeliste.style.display = "block";
        // Hier Funktion bei Ablauf des Timers callen
    }
} 

