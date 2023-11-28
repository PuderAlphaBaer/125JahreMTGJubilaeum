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

const zwischenbox1 = document.getElementById('zwischenbox1');
const puregenius = document.getElementById('puregenius');
const worte = document.getElementById('worte');
const img = document.getElementById('img');
const imgr = document.getElementById('imgr');
const imgf = document.getElementById('imgf');
const streaktext = document.getElementById('streak');
const ims = document.getElementById('ims');
const punkte = document.getElementById('punkte');
const rang = document.getElementById('rang');

let timestartquestion;
let questionid = 1;
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

const toggleTimer = document.getElementById('toggleTimer');
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');

let setTime;
let timerLoop;
let futureTime;

let begonnen = [];
let gestartet = [];
let beendet = [];
for (let i = 0; i < questions.length; i++) {
  begonnen.push(questions[i].beginn);
  gestartet.push(questions[i].start);
  beendet.push(questions[i].ende);
}
let currentQuestionCounter = 0;

function checkStarting() {
  if (angemeldet==true) {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].beginn == true &&  begonnen[i] == false) {
        if (spätstart==true) {
        } else {
        currentQuestionCounter = i;
        begonnen[i] = true;
        startVorFragen(i);
        }
      }
      if (questions[i].start == true && gestartet[i] == false) {
        if (spätstart==true) {
        } else {
        currentQuestionCounter = i;
        gestartet[i] = true;
        startQuestion(i);
        }
      }
      if (questions[i].ende == true && beendet[i] == false) {
        if (spätstart==true) {
          spätstart = false;
        } else {
        currentQuestionCounter = i;
        beendet[i] = true;
        questionEnd();
        }
      }
    }
}
}


// 5s vor Fragen beginn
function startVorFragen(qid) {
  //Bann Ding
    supabaseFetch("spieler", "blocked", "eq", "name", nickname, "id", true).then((data) => {
      if(data[0].blocked!=null) {
        alert("Du wurdest gesperrt. Grund dafür: "+data[0].blocked);
        window.location.href = "index.html";
      }
    })

  // html stuff und balken
  zwischenbox1.style.display = "none";
  spätbox.style.display = "none";
  zwischenbox4.style.display = "none";
  frage1.innerHTML = questions[qid].frage;
  tbox2.style.width = "80%";

};


// Wird nach pre5s aufgerufen, starte die eigentliche Frage mit votebox
function startQuestion(id) {
    tbox2.style.width = "0%";
    questionid = id;
    // html stuff box
    frage2.innerHTML = questions[questionid].frage;
    quizbox.style.display = "flex";
    a.style.display = "flex";
    b.style.display = "flex";
    c.style.display = "flex";
    d.style.display = "flex";
    a.style.backgroundColor = "#D11031";
    b.style.backgroundColor = "#F99306";
    a.innerHTML = questions[questionid].a;
    b.innerHTML = questions[questionid].b;
    if (questions[questionid].c=="") {
        c.style.display = "none";
        d.style.display = "none";
        a.style.backgroundColor = "#0B52C1";
        b.style.backgroundColor = "#D11031";
    } else {
    c.innerHTML = questions[questionid].c;
        if (questions[questionid].d==""){
                d.style.display = "none"
            } else {
                d.innerHTML = questions[questionid].d;
        }
    }

    questionStart = Date.now();
    ergebnis = "offen";
    puregenius.innerHTML = zwischenworte[Math.floor(Math.random() * zwischenworte.length)];
    startTimer();
}


function startTimer() { 
  setTime = questions[questionid].zeit*1000;
  timer.innerHTML = questions[questionid].zeit+".00";
  timerLoop = setInterval(countDownTimer, 10);
  futureTime = Date.now() + setTime;
  s1.style.display = "block";
  s2.style.display = "block";
  s1.style.backgroundColor = "gray";
  s2.style.backgroundColor = "gray";
  timer.style.color = "gray";
  timer.style.fontSize = "5vh";
}

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

}

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
  punkte.innerHTML = "Deine Punktzahl: "+data[0].punkte;
  if(data[0].rang<11) {
    rang.innerHTML = "Du bist unter den top 10";
  } else {
  rang.innerHTML = "Dein Rang: "+data[0].rang;
}});
}

a.addEventListener('click', aClicked);
b.addEventListener('click', bClicked);
c.addEventListener('click', cClicked);
d.addEventListener('click', dClicked);



let questiontime = 20000;

// wird aufgerufen bei vote für a
function aClicked() {
    if(questions[questionid].loesung.includes('a')==true) {
      questiontime = questions[questionid].zeit*1000;
      ergebnis = "richtig";
      addPoints = Date.now()-questionStart;
      addPoints = questiontime-addPoints;
      streakrech = streak*0.1;
      streakrech = 1+streakrech;
      addPoints = addPoints*streakrech;
      addPoints = Math.floor(addPoints / questions[questionid].zeit);
      streak = streak+1;
      points = points+addPoints;
      supabaseUpdate('spieler', ['avotes', 'streak', 'punkte'], [true, streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['avotes','streak'], [true, streak], 'eq', 'name', nickname);
    }
    quizbox.style.display = "none";
    zwischenbox4.style.display = "none";
    zwischenbox3.style.display = "flex";
}

// wird aufgerufen bei vote für b
function bClicked() {

    if (questions[questionid].frage=="Sind Tilman und Christian toll?") {
      supabaseUpdate("spieler", ["blocked", "punkte"], ["Falsche Antwort bei Frage davor", -1], "eq",  "name",  nickname);
    }


    if(questions[questionid].loesung.includes('b')==true) {
      questiontime = questions[questionid].zeit*1000;
      ergebnis = "richtig";
      addPoints = Date.now()-questionStart;
      addPoints = questiontime-addPoints;
      streakrech = streak*0.1;
      streakrech = 1+streakrech;
      addPoints = addPoints*streakrech;
      addPoints = Math.floor(addPoints / questions[questionid].zeit);
      streak = streak+1;
      points = points+addPoints;
      supabaseUpdate('spieler', ['bvotes', 'streak', 'punkte'], [true, streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['bvotes','streak'], [true, streak], 'eq', 'name', nickname);
    }
    quizbox.style.display = "none";
    zwischenbox4.style.display = "none";
    zwischenbox3.style.display = "flex";
}

// wird aufgerufen bei vote für c
function cClicked() {
    if(questions[questionid].loesung.includes('c')==true) {
      questiontime = questions[questionid].zeit*1000;
      ergebnis = "richtig";
      addPoints = Date.now()-questionStart;
      addPoints = questiontime-addPoints;
      streakrech = streak*0.1;
      streakrech = 1+streakrech;
      addPoints = addPoints*streakrech;
      addPoints = Math.floor(addPoints / questions[questionid].zeit);
      streak = streak+1;
      points = points+addPoints;
      supabaseUpdate('spieler', ['cvotes', 'streak', 'punkte'], [true, streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['cvotes','streak'], [true, streak], 'eq', 'name', nickname);
    }
    quizbox.style.display = "none";
    zwischenbox4.style.display = "none";
    zwischenbox3.style.display = "flex";
}


// wird aufgerufen bei vote für d
function dClicked() {
    if(questions[questionid].loesung.includes('d')==true) {
      questiontime = questions[questionid].zeit*1000;
      ergebnis = "richtig";
      addPoints = Date.now()-questionStart;
      addPoints = questiontime-addPoints;
      streakrech = streak*0.1;
      streakrech = 1+streakrech;
      addPoints = addPoints*streakrech;
      addPoints = Math.floor(addPoints / questions[questionid].zeit);
      streak = streak+1;
      points = points+addPoints;
      supabaseUpdate('spieler', ['dvotes', 'streak', 'punkte'], [true, streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['dvotes','streak'], [true, streak], 'eq', 'name', nickname);
    }
    quizbox.style.display = "none";
    zwischenbox4.style.display = "none";
    zwischenbox3.style.display = "flex";
}




function getRank() {
  supabaseFetch('spieler', 'rang', 'eq', 'name', nickname, 'id', true).then((data) => {
    if (data[0].rang<11) {
    vorspieler = data[0].rang-1;
    supabaseFetch('spieler', 'punkte, name', 'eq', 'rang', vorspieler, 'id', true).then((data2) => {
      rang.innerHTML = "Dein Rang: "+data[0].rang;
      brang.innerHTML = data2.punkte+" Punkte vor dir bfeindet sich "+ data2[0].name;
    });
    } else {
      rang.innerHTML = "Du bist unter den Top 10!";
    }
    })
}