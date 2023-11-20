const sqbt = document.getElementById('sQbt');
const a = document.getElementById('bta')
const b = document.getElementById('btb')
const c = document.getElementById('btc')
const d = document.getElementById('btd') 
const quizbox = document.getElementById('quizbox');
const tbox2 = document.getElementById('tbox2');
const zwischenbox = document.getElementById('zwischenbox');
const frage1 = document.getElementById('frage1');
const frage2 = document.getElementById('frage2');
const zwischenbox3 = document.getElementById('zwischenbox3');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');
const text4 = document.getElementById('text4');
const skip2 = document.getElementById('skip2');

skip2.addEventListener('click', questionEnd);
sqbt.addEventListener('click', questionStarted); // ist dann ein update in der fragendatenbank !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let timestartquestion = Date.now() + 10000;
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

function questionStarted() {
  // questionstarted starten sobald timestartquestion ereicht ist
   waituntilquestion = timestartquestion-Date.now();
    setTimeout(() => {
      startPreQuestion();
    }, waituntilquestion);
  };



function startPreQuestion() {
  supabaseFetch("spieler", "blocked", "eq", "name", nickname, "id", true).then((data) => {
    if(data[0].blocked!=null) {
      alert("Du wurdest gesperrt. Grund dafür: "+data[0].blocked);
      window.location.href = "index.html";
    }
  })
  questionid = questionid+1;
  zwischenbox.style.display = "none";
  frage1.innerHTML = questions[questionid-1].frage;
  sqbt.style.display = "none";
  tbox2.style.width = "80%";
  setTimeout(() => {
    tbox2.style.width = "0%";
    startQuestion();
  }, 2000);
};


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
    a.addEventListener('click', aClicked);
    b.addEventListener('click', bClicked);
    c.addEventListener('click', cClicked);
    d.addEventListener('click', dClicked);
    startTimer();
}




function questionEnd() {
  clearInterval(timerLoop);
  s1.style.display = "none";
  s2.style.display = "none";
  s3.style.display = "none";
  quizbox.style.display = "none";
  zwischenbox.style.display = "flex";
  zwischenbox3.style.display = "none";
  sqbt.style.display = "block";  
  text1.innerHTML = "Dein Nickname: "+nickname;
  text3.innerHTML = "Deine Streak: "+streak;
  supabaseFetch('spieler', 'punkte, rang', 'eq', 'name', nickname, 'punkte', true).then((data) => {
  text2.innerHTML = "Deine Punktzahl: "+data[0].punkte;
  if(data[0].rang<11) {
    text4.innerHTML = "Du bist unter den top 10";
  } else {
  text4.innerHTML = "Dein Rang: "+data[0].rang;
}});
}


function aClicked() {
    supabaseUpdate('spieler', ['avotes'], [true], 'eq', 'name', nickname);
    if(questions[questionid-1].loesung.includes('a')==true) {
      console.log("richtig");
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
      streak = 0;
    }
    supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
    quizbox.style.display = "none";
    zwischenbox3.style.display = "flex";
}


function bClicked() {
  supabaseUpdate('spieler', ['bvotes'], [true], 'eq', 'name', nickname);
  if(questions[questionid-1].loesung.includes('b')==true) {
    console.log("richtig");
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
    streak = 0;
  }
  supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
  quizbox.style.display = "none";
  zwischenbox3.style.display = "flex";
}

function cClicked() {
  supabaseUpdate('spieler', ['cvotes'], [true], 'eq', 'name', nickname);
  if(questions[questionid-1].loesung.includes('c')==true) {
    console.log("richtig");
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
    streak = 0;
  }
  supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
  quizbox.style.display = "none";
  zwischenbox3.style.display = "flex";
}

function dClicked() {
  supabaseUpdate('spieler', ['dvotes'], [true], 'eq', 'name', nickname);
  if(questions[questionid-1].loesung.includes('d')==true) {
    console.log("richtig");
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
    streak = 0;
  }
  supabaseUpdate('spieler', ['streak'], [streak], 'eq', 'name', nickname);
  quizbox.style.display = "none";
  zwischenbox3.style.display = "flex";
}













function startGame() {
  biginputbox.style.display = "none";
  zwischenbox.style.display = "flex";
  text1.innerHTML = "Dein Nickname: "+nickname;
  text2.innerHTML = "Deine Punktzahl: 0";
  text3.innerHTML = "Deine Streak: 0";
  text4.innerHTML = "Dein Rang: -";
}























const toggleTimer = document.getElementById('toggleTimer');
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');

// Müssen wir schaun wie der Input sein wird

// Länge der Zeit für Fragen
const sec = 20;
const setTime = sec *1000;


let timerLoop;
let futureTime;
timer.innerHTML = sec+".00"


function startTimer() { 
  timerLoop = setInterval(countDownTimer, 10);
  futureTime = Date.now() + setTime;
  s1.style.display = "block";
  s2.style.display = "block";
  s1.style.backgroundColor = "gray";
  s2.style.backgroundColor = "gray";
  timer.style.color = "gray";
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
        questionEnd();
    }
} 



