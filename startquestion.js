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

// const timer = document.getElementById('timertext');
// const s1 = document.getElementById('s1');
// const s2 = document.getElementById('s2');
// const s3 = document.getElementById('s3');
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
  // s1.style.display = "none";
  // s2.style.display = "none";
  // s3.style.display = "none";

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





a.addEventListener('click', aClicked);
b.addEventListener('click', bClicked);
c.addEventListener('click', cClicked);
d.addEventListener('click', dClicked);


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
      supabaseUpdate('spieler', ['vote', 'streak', 'punkte'], ["a", streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['vote','streak'], ["a", streak], 'eq', 'name', nickname);
    }
    toggleInterface(phase25box);
    console.log("%cPhase 2,5", "color: red; font-size: 20px; font-weight: bold;");
}

// wird aufgerufen bei vote für b
function bClicked() {

    if(questions[questionid].loesung.includes('b')==true) {
      questiontime = questions[questionid].zeit*1000;
      ergebnis = "richtig";
      addPoints = Date.now()-questionStart;
      addPoints = questiontime-addPoints+20;
      streakrech = streak*0.1;
      streakrech = 1+streakrech;
      addPoints = addPoints*streakrech;
      addPoints = Math.floor(addPoints / questions[questionid].zeit);
      streak = streak+1;
      points = points+addPoints;
      supabaseUpdate('spieler', ['vote', 'streak', 'punkte'], ["b", streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['vote','streak'], ["b", streak], 'eq', 'name', nickname);
    }
    toggleInterface(phase25box);
    console.log("%cPhase 2,5", "color: red; font-size: 20px; font-weight: bold;");
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
      supabaseUpdate('spieler', ['vote', 'streak', 'punkte'], ["c", streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['vote','streak'], ["c", streak], 'eq', 'name', nickname);
    }
    toggleInterface(phase25box);
    console.log("%cPhase 2,5", "color: red; font-size: 20px; font-weight: bold;");
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
      supabaseUpdate('spieler', ['vote', 'streak', 'punkte'], ["d", streak, points], 'eq', 'name', nickname);
    } else {
      ergebnis = "falsch";
      streak = 0;
      supabaseUpdate('spieler', ['vote','streak'], ["d", streak], 'eq', 'name', nickname);
    }
    toggleInterface(phase25box);
    console.log("%cPhase 2,5", "color: red; font-size: 20px; font-weight: bold;");
}

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


  // function startTimer() {
  //   startCountdown(questions[questionid].zeit);
  //   setTime = questions[questionid].zeit*1000;
  //   // timer.innerHTML = questions[questionid].zeit+".00";
  //   timerLoop = setInterval(countDownTimer, 15);
  //   futureTime = Date.now() + setTime;
  //   // s1.style.display = "block";
  //   // s2.style.display = "block";
  //   // s1.style.backgroundColor = "gray";
  //   // s2.style.backgroundColor = "gray";
  //   // timer.style.color = "gray";
  //   // timer.style.fontSize = "5vh";
  // }

// function countDownTimer() {
//   const remainingTime = futureTime - Date.now();
//   // const angle = (remainingTime / setTime) * 360;

//   // if(angle > 180) {
//   //     s3.style.display = "none";
//   //     s1.style.transform = "rotate(180deg)";
//   //     s2.style.transform = "rotate("+angle+"deg)";
//   // } else {
//   //     s3.style.display = "block";
//   //     s1.style.transform = "rotate("+angle+"deg)";
//   //     s2.style.transform = "rotate("+angle+"deg)";
//   // }

//   // if(remainingTime > 1000) {
//   //     timer.innerHTML = remainingTime.toString().slice(0, -3)+"."+remainingTime.toString().slice(-3, -1);
//   // } else {
//   //     timer.innerHTML = "0"+remainingTime.toString().slice(0, -3)+"."+remainingTime.toString().slice(-3, -1);
//   // }

//   // Letzten 5 Sekunden rot
//   // if(remainingTime <= 5000) {
//   //     s1.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
//   //     s2.style.backgroundColor = "rgba(0, 255, 0, 0.8)";
//   //     timer.style.color = "rgba(55, 0, 255, 0.8)";
//   // }

//   if(remainingTime <= 0) {
//       clearInterval(timerLoop);
//   }

// }