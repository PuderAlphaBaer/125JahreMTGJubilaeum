const sqbt = document.getElementById('sQbt');
const a = document.getElementById('bta')
const b = document.getElementById('btb')
const c = document.getElementById('btc')
const d = document.getElementById('btd') 
const quizbox = document.getElementById('quizbox');
const tbox2 = document.getElementById('tbox2');
const zwischenbox4 = document.getElementById('zwischenbox4');
const frage1 = document.getElementById('frage1');
const frage2 = document.getElementById('frage2');
const zwischenbox3 = document.getElementById('zwischenbox3');
const skip2 = document.getElementById('skip2');
const zwischenbox1 = document.getElementById('zwischenbox1');

skip2.addEventListener('click', questionEnd);
sqbt.addEventListener('click', questionStarted); // ist dann ein realtimelistener für fragentabelle !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let timestartquestion;
let questionid = 0;
let addPoints = 0;
let questionStart = 0;
let interval;
let points = 0;
let streak = 0;
let streakrech;
let allpoints = 0;
let rank;
let waituntilquestion;
let ergebnis;

// Wird aufgerufen bei Update in Tabelle
function questionStarted() {
  timestartquestion = Date.now() + 100; // timestartquestion später das was in die datenbank geschrieben wird (utc umgewandelt dann musst du eif machen)
  // questionstarted starten sobald timestartquestion ereicht ist
   waituntilquestion = timestartquestion-Date.now();
    setTimeout(() => {
      startPreQuestion();
    }, waituntilquestion);
  };


// 5s vor Fragen beginn
function startPreQuestion() {
  supabaseFetch("spieler", "blocked", "eq", "name", nickname, "id", true).then((data) => {
    if(data[0].blocked!=null) {
      alert("Du wurdest gesperrt. Grund dafür: "+data[0].blocked);
      window.location.href = "index.html";
    }
  })
  questionid = questionid+1;
  zwischenbox1.style.display = "none";
  zwischenbox4.style.display = "none";
  frage1.innerHTML = questions[questionid-1].frage;
  sqbt.style.display = "none";
  tbox2.style.width = "80%";
  setTimeout(() => {
    tbox2.style.width = "0%";
    startQuestion();
  }, 2000);
};




// Wird nach pre5s aufgerufen, starte die eigentliche Frage mit votebox
function startQuestion() {
  frage2.innerHTML = questions[questionid-1].frage;
    quizbox.style.display = "flex";
    questionStart = Date.now();
    sqbt.style.display = "none";
    a.style.display = "flex";
    b.style.display = "flex";
    c.style.display = "flex";
    d.style.display = "flex";
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
    ergebnis = "offen";
    startTimer();
}




const worte = document.getElementById('worte');


console.log(rworte);
console.log(fworte);






const img = document.getElementById('img');
const imgr = document.getElementById('imgr');
const imgf = document.getElementById('imgf');
const streaktext = document.getElementById('streak');
const ims = document.getElementById('ims');

// Wird nach Ende einer Frage aufgerufen
function questionEnd() {
  clearInterval(timerLoop);
  s1.style.display = "none";
  s2.style.display = "none";
  s3.style.display = "none";
  quizbox.style.display = "none";
  if(ergebnis=="offen") {
    ergebnis = "falsch";
    streak = 0;
    supabaseUpdate('spieler', ['streak'], [0], 'eq', 'name', nickname);
  }
  zwischenbox4.style.display = "flex";
  zwischenbox3.style.display = "none";
  sqbt.style.display = "block";


if(ergebnis=="richtig") {
  imgr.style.display = "flex";
  imgf.style.display = "none";
  worte.innerHTML = rworte[Math.floor(Math.random() * rworte.length)];
} else {
  imgf.style.display = "flex";
  imgr.style.display = "none";
  worte.innerHTML = fworte[Math.floor(Math.random() * fworte.length)];
}

if(streak==0) {
  ims.style.display = "none";
  streaktext.innerHTML = "Streak verloren";
} else {
  ims.style.display = "flex";
  streaktext.innerHTML = streak;
}
  //text1.innerHTML = "Deine Streak: "+streak;
  supabaseFetch('spieler', 'punkte, rang', 'eq', 'name', nickname, 'punkte', true).then((data) => {
  //text2.innerHTML = "Deine Punktzahl: "+data[0].punkte;
  if(data[0].rang<11) {
    //text3.innerHTML = "Du bist unter den top 10";
  } else {
  //text4.innerHTML = "Dein Rang: "+data[0].rang;
}});
}

a.addEventListener('click', aClicked);
b.addEventListener('click', bClicked);
c.addEventListener('click', cClicked);
d.addEventListener('click', dClicked);


// wird aufgerufen bei vote für a
function aClicked() {
    supabaseUpdate('spieler', ['avotes'], [true], 'eq', 'name', nickname);
    if(questions[questionid-1].loesung.includes('a')==true) {
      ergebnis = "richtig";
      addPoints = Date.now()-questionStart;
      addPoints = 20000-addPoints;
      streakrech = streak*0.1;
      streakrech = 1+streakrech;
      addPoints = addPoints*streakrech;
      addPoints = Math.floor(addPoints / 20);
      streak = streak+1;
      console.log(addPoints);
      supabaseFetch('spieler', 'punkte', 'eq', 'name', nickname, 'punkte', true).then((data) => {
        supabaseUpdate('spieler', ['punkte'], [addPoints+data[0].punkte], 'eq', 'name', nickname);
      });
    }
    else {
      ergebnis = "falsch";
      streak = 0;
    }
    supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
    quizbox.style.display = "none";
    zwischenbox3.style.display = "flex";
}
// wird aufgerufen bei vote für b
function bClicked() {
  supabaseUpdate('spieler', ['bvotes'], [true], 'eq', 'name', nickname);
  if(questions[questionid-1].loesung.includes('b')==true) {
    ergebnis = "richtig";
    addPoints = Date.now()-questionStart;
    addPoints = 20000-addPoints;
    streakrech = streak*0.1;
    streakrech = 1+streakrech;
    addPoints = addPoints*streakrech;
    addPoints = Math.floor(addPoints / 20);
    streak = streak+1;
    console.log(addPoints);
    supabaseFetch('spieler', 'punkte', 'eq', 'name', nickname, 'punkte', true).then((data) => {
      supabaseUpdate('spieler', ['punkte'], [addPoints+data[0].punkte], 'eq', 'name', nickname);
    });
  }
  else {
    ergebnis = "falsch";
    streak = 0;
  }
  supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
  quizbox.style.display = "none";
  zwischenbox3.style.display = "flex";
}

// wird aufgerufen bei vote für c
function cClicked() {
  supabaseUpdate('spieler', ['cvotes'], [true], 'eq', 'name', nickname);
  if(questions[questionid-1].loesung.includes('c')==true) {
    ergebnis = "richtig";
    addPoints = Date.now()-questionStart;
    addPoints = 20000-addPoints;
    streakrech = streak*0.1;
    streakrech = 1+streakrech;
    addPoints = addPoints*streakrech;
    addPoints = Math.floor(addPoints / 20);
    streak = streak+1;
    console.log(addPoints);
    supabaseFetch('spieler', 'punkte', 'eq', 'name', nickname, 'punkte', true).then((data) => {
      supabaseUpdate('spieler', ['punkte'], [addPoints+data[0].punkte], 'eq', 'name', nickname);
    });
  }
  else {
    ergebnis = "falsch";
    streak = 0;
  }
  supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
  quizbox.style.display = "none";
  zwischenbox3.style.display = "flex";
}

// wird aufgerufen bei vote für d
function dClicked() {
  supabaseUpdate('spieler', ['dvotes'], [true], 'eq', 'name', nickname);
  if(questions[questionid-1].loesung.includes('d')==true) {
    ergebnis = "richtig";
    addPoints = Date.now()-questionStart;
    addPoints = 20000-addPoints;
    streakrech = streak*0.1;
    streakrech = 1+streakrech;
    addPoints = addPoints*streakrech;
    addPoints = Math.floor(addPoints / 20);
    streak = streak+1;
    console.log(addPoints);
    supabaseFetch('spieler', 'punkte', 'eq', 'name', nickname, 'punkte', true).then((data) => {
      supabaseUpdate('spieler', ['punkte'], [addPoints+data[0].punkte], 'eq', 'name', nickname);
    });
  }
  else {
    ergebnis = "falsch";
    streak = 0;
  }
  supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
  quizbox.style.display = "none";
  zwischenbox3.style.display = "flex";
}



const toggleTimer = document.getElementById('toggleTimer');
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');

// Zeit für  Fragen
let  sec = 20;
let setTime;


let timerLoop;
let futureTime;
timer.innerHTML = sec+".00"

// Timerfunktion unwichtig
function startTimer() { 
  sec = questions[questionid-1].zeit;
  setTime = sec *1000;
  timerLoop = setInterval(countDownTimer, 10);
  futureTime = Date.now() + setTime;
  s1.style.display = "block";
  s2.style.display = "block";
  s1.style.backgroundColor = "gray";
  s2.style.backgroundColor = "gray";
  timer.style.color = "gray";
  timer.style.fontSize = "5vh";
}


// Timerfunktion unwichtig
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
        questionEnd();
    }
} 



