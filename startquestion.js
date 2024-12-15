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

const punktZahl = document.getElementById('punktZahl');


let setTime;
let timerLoop;
let futureTime;

let begonnen = [];
let gestartet = [];
let beendet = [];
let auswertung = [];
for (let i = 0; i < questions.length; i++) {
  begonnen.push(questions[i].beginn);
  gestartet.push(questions[i].start);
  beendet.push(questions[i].ende);
  auswertung.push(questions[i].auswertung);
}
let currentQuestionCounter = 0;

function checkStarting() {
  if (angemeldet==true) {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].beginn == true &&  begonnen[i] == false) {
        currentQuestionCounter = i;
        begonnen[i] = true;
        phase1(i);
      }
      if (questions[i].start == true && gestartet[i] == false) {
        currentQuestionCounter = i;
        gestartet[i] = true;
        phase2(i);
      }
      if (questions[i].ende == true && beendet[i] == false) {
        currentQuestionCounter = i;
        beendet[i] = true;
        phase3();
      }
      if (questions[i].auswertung == true && auswertung[i] == false) {
        currentQuestionCounter = i;
        auswertung[i] = true;
        if (i==questions.length-1) {
          userend();
          console.log("userend test");
        } else {
          phase4();
          console.log("phase test");
        }
      
      }
    }
  }
}




// 5s vor Fragen beginn
function phase1(qid) {
  console.log("%cPhase 1", "color: red; font-size: 20px; font-weight: bold;");

  // richtige oberflaeche
  toggleInterface(phase1box);

  // html stuff und balken
  frage1.innerHTML = questions[qid].frage;

  prefut = Date.now() + pretime;
  preloop = setInterval(preTimer, 10);

};



function preTimer() {
  prerem = prefut - Date.now();
  preangle = (prerem / pretime);
  bar.style.width = (preangle*100)+"%";
}


// Wird nach pre5s aufgerufen, starte die eigentliche Frage mit votebox
function phase2(id) {
  console.log("%cPhase 2", "color: red; font-size: 20px; font-weight: bold;");

  clearInterval(preloop);
  toggleInterface(phase2box);
  bar.style.width = "0%";
  questionid = id;
  addPoints = 0;

  //Bann Ding
  supabaseFetch("spieler", "blocked", "eq", "name", nickname, "id", true).then((data) => {
    if(data[0].blocked!=null) {
      alert("Du wurdest gesperrt. Grund dafür:\n\n"+data[0].blocked);
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      window.location.href = "index.html";
    }
  })

  // html stuff box
  frage2.innerHTML = questions[questionid].frage;
  a.style.display = "flex";
  b.style.display = "flex";
  c.style.display = "flex";
  d.style.display = "flex";
  a.innerHTML = questions[questionid].a;
  b.innerHTML = questions[questionid].b;
  let topButtonContainer = document.getElementById('topButtonContainer');
  let bottomButtonContainer = document.getElementById('bottomButtonContainer');
  bottomButtonContainer.style.display = "flex";
  topButtonContainer.style.height = "50%";
  if (questions[questionid].c=="") {
    bottomButtonContainer.style.display = "none";
    topButtonContainer.style.height = "100%";
  } else {
    c.innerHTML = questions[questionid].c;
    d.innerHTML = questions[questionid].d;
  }



  questionStart = Date.now();
  ergebnis = "offen";
  puregenius.innerHTML = zwischenworte[Math.floor(Math.random() * zwischenworte.length)];
  startCountdown(questions[questionid].zeit);
}


const richtig = document.getElementById('r');
const falsch = document.getElementById('f');
// Wird nach Ende einer Frage aufgerufen
function phase3() {
  console.log("%cPhase 3", "color: red; font-size: 20px; font-weight: bold;");

  toggleInterface(phase3box);
  clearInterval(timerLoop);

  if(ergebnis=="offen") {
    ergebnis = "falsch";
    streak = 0;
    supabaseUpdate('spieler', ['streak'], [0], 'eq', 'name', nickname);
  }

  if(ergebnis=="richtig") {
    richtig.style.display = 'block';
    falsch.style.display = 'none';
    worte.innerHTML = rworte[Math.floor(Math.random() * rworte.length)];
  } else {
    richtig.style.display = 'none';
    falsch.style.display = 'block';
    worte.innerHTML = fworte[Math.floor(Math.random() * fworte.length)];
  }
  const streakLine = document.getElementById('streakLine');
  if(streak==0) {
    streakLine.innerHTML = "Antwortserie verloren";
    streaktext.innerHTML = "";
    streaktext.style.backgroundImage = "none";
  } else {
    streakLine.innerHTML = "Antwortserie: "
    streaktext.innerHTML = streak;
    streaktext.style.backgroundImage = "url(../Data/streak.svg)";
    streaktext.style.backgroundRepeat = "no-repeat";
    streaktext.style.backgroundPosition = "center";
  }
  if (addPoints!=0) {
    punkte.innerHTML = "Du hast "+addPoints+" Punkte erhalten";
  } else {
    punkte.innerHTML = "Du hast keine Punkte erhalten";
  }
  punktZahl.innerHTML = points;

}



let vorrang;

function phase4() {
  console.log("%cPhase 4", "color: red; font-size: 20px; font-weight: bold;");

  toggleInterface(phase4box);
  supabaseFetch('spieler', 'punkte, rang', 'eq', 'name', nickname, 'punkte', true).then((data) => {
    rang.innerHTML = "Dein Rang: "+data[0].rang;
    brang.innerHTML = "";
    if(data[0].rang!=1) {
      vorrang = data[0].rang-1;
      if (data[0].rang>1) {
        supabaseFetch('spieler', 'name, punkte', 'eq', 'rang', vorrang, 'punkte', true).then((data2) => {
          diff = data2[0].punkte-data[0].punkte;
          brang.innerHTML = diff+" Punkte vor dir auf Rang "+vorrang+" befindet sich "+data2[0].name;
        })
      }
    }
  });
  funfact.innerHTML = questions[questionid].funfact;
}



function userend() {
  console.log("hier userend");
  toggleInterface(endbox);
  endrang.innerHTML = "Dein Rang: "+rank;
  if(rank==1) {
    endrang.innerHTML = "Du bist der Gewinner!\nBitte komme auf die Bühne.";
  }
}


function handleVote(option) {
    if(questions[questionid].loesung.includes(option)) {
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
        supabaseUpdate('spieler', ['vote', 'streak', 'punkte'], [option, streak, points], 'eq', 'name', nickname);
    } else {
        ergebnis = "falsch";
        streak = 0;
        supabaseUpdate('spieler', ['vote','streak'], [option, streak], 'eq', 'name', nickname);
    }
    toggleInterface(phase25box);
    console.log("%cPhase 2,5", "color: red; font-size: 20px; font-weight: bold;");
}

// Replace individual click handlers with unified approach
a.addEventListener('click', () => handleVote('a'));
b.addEventListener('click', () => handleVote('b'));
c.addEventListener('click', () => handleVote('c'));
d.addEventListener('click', () => handleVote('d'));

function startCountdown(time) {
    let i = 0;
    let finalOffset = 282.7; // New circumference
    let step = finalOffset / time;
    let timeCaption = document.querySelector('h2');
    let circle = document.querySelector('.circle_animation').style;
    let newTimer = document.querySelector('.newTimer').style;

    newTimer.display = 'flex';
    newTimer.zIndex = '0';
    timeCaption.innerText = time;
    let CountdownInterval = setInterval(countdown, 1000);

    function countdown() {
      timeCaption.innerText = time - i;
      if (i++ >= time) {
        clearInterval(CountdownInterval);
        circle.strokeDashoffset = 0;
        newTimer.display = 'none';
      } else {
        circle.strokeDashoffset = step * i;
      }
    }

    setTimeout(() => {
      circle.strokeDashoffset = 0;
      countdown(); // Call the function once to start the countdown immediately
    }, 10);
}

const beforeUnloadHandler = (event) => {
  // Recommended
  event.preventDefault();

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = "Wollen Sie das Quiz wirklich verlassen? Ihr Account wird nicht gespeichert.";
};
