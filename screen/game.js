function startCountdown(time) {
    let i = 0;
    let finalOffset = 565; // New circumference
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
const anzeigefrage1 = document.getElementById('anzeigefrage1');
const anzeigefrage2 = document.getElementById('anzeigefrage2');
const a = document.getElementById('bta');
const b = document.getElementById('btb');
const c = document.getElementById('btc');
const d = document.getElementById('btd');
const y = document.getElementById('y');
const n = document.getElementById('n');
const boxPhase1 = document.getElementById('boxPhase1');
const boxWelcome = document.getElementById('boxWelcome');
const balkenbox = document.getElementById('balkenbox');
const balken = document.getElementById('balken');
const boxPhase2 = document.getElementById('boxPhase2');
const boxPhase4 = document.getElementById('boxPhase4');
const btbox = document.getElementById('btbox');
const buttonBox = document.getElementById('buttonBox');
const votebox = document.getElementById('votebox');
const vote = document.getElementById('vote');
let borderColors;
let avotes;
let bvotes;
let cvotes;
let dvotes;
const bt2 = document.getElementById('bt2');
const bt1 = document.getElementById('bt1');
const startgamebt = document.getElementById('startgamebt');
const resettu = document.getElementById('resetUsers');
const zweiterContainer = document.getElementById('ersterContainer');
const subbutton = document.getElementById('subButton');
const boxPhase5 = document.getElementById('boxPhase5');
const boxPhase3 = document.getElementById('boxPhase3');
let activequestionid = 0;


function togglePhase(phase) {
    function nonePhase() {
        boxWelcome.style.display = "none";
        boxPhase1.style.display = "none";
        boxPhase2.style.display = "none";
        boxPhase3.style.display = "none";
        boxPhase4.style.display = "none";
        boxPhase5.style.display = "none";
    }
    switch (phase) {
        case boxPhase2:
            nonePhase();
            boxPhase2.style.display = "flex";
            console.log('timer')
            anzeigefrage2.style.display = "flex";
            // timerContainer.style.display = "flex";
            break;
        case boxPhase3:
            nonePhase();
            anzeigefrage2.style.display = "none";
            boxPhase2.style.display = "flex";
            boxPhase3.style.display = "flex";
            break;
        default:
            boxWelcome.style.display = "none";
            boxPhase1.style.display = "none";
            boxPhase2.style.display = "none";
            boxPhase3.style.display = "none";
            boxPhase4.style.display = "none";
            boxPhase5.style.display = "none";
            phase.style.display = "flex";
    }
}
togglePhase(boxWelcome);

const beforeUnloadHandler = (event) => {
    event.preventDefault();
    event.returnValue = "Wollen Sie die Seite wirklich verlassen? Dies kann zu erheblichen Fehlern im laufenden Quiz führen";
};

window.addEventListener("beforeunload", beforeUnloadHandler);

let isCooldown = false;

function startCooldown() {
    isCooldown = true;
    setTimeout(() => {
        isCooldown = false;
    }, 5000);
}

startgamebt.addEventListener('click', () => {
    if (!isCooldown) {
        startCooldown();
        startgame();
    } else {
        console.log('cooldown')
        alert('Cooldown')
    }
});

bt1.addEventListener('click', () => {
    if (!isCooldown) {
        startCooldown();
        phase1();
    } else {
        console.log('cooldown')
        alert('Cooldown')
    }
});

bt2.addEventListener('click', () => {
    if (!isCooldown) {
        startCooldown();
        phase4();
    } else {
        console.log('cooldown')
        alert('Cooldown')
    }
});



function startgame() {
    console.log('%c starte spiel', 'background: #222; color: #bada55')
    phase1();
}

let qnumberinsg;

async function phase1() {
    try {
        activequestionid++;
        document.body.classList.add('waiting');
        await supabaseUpdate('fragen', ['beginn'], [true], 'eq', 'id', activequestionid);
    } catch (error) {
        activequestionid--;
        alert(error.message);
        return;
    }
    document.body.classList.remove('waiting');
    togglePhase(boxPhase1);
    qnumberinsg = questions.length-1;
    prefut = Date.now() + pretime;
    preloop = setInterval(interface1bar, 10);
    anzeigefrage1.innerHTML = questions[activequestionid].frage;
    console.log('%c beginne frage' + activequestionid, 'background: #222; color: #bada55')
    setTimeout(() => {
        phase2();
    }, pretime);
};


function interface1bar() {
    prerem = prefut - Date.now();
    preangle = (prerem / pretime);
    balken.style.width = (preangle*100)+"%";
  }


// wird nach ablaufen der ersten 5s aufgerufen
async function phase2() {
    try {
        document.body.classList.add('waiting');
        await supabaseUpdate('fragen', ['start'], [true], 'eq', 'id', activequestionid)
    } catch (error) {
        alert(error.message);
        return;
    }
    document.body.classList.remove('waiting');
    togglePhase(boxPhase2);
    clearInterval(preloop);
    console.log('%c starte frage' + activequestionid, 'background: #222; color: #bada55')

    // clear effects from all buttons using a function with parameter
    function clearEffects(element) {
        element.style.opacity = "1";
        element.style.boxShadow = "none";
        element.style.border = "transparent";
    }
    clearEffects(a);
    clearEffects(b);
    clearEffects(c);
    clearEffects(d);


    anzeigefrage2.innerHTML = questions[activequestionid].frage;
    bt2.style.display = "none";

    // Multiple Choice Frage
    a.innerHTML = questions[activequestionid].a;
    b.innerHTML = questions[activequestionid].b;
    let topButtonContainer = document.getElementById('topButtonContainer');
    let bottomButtonContainer = document.getElementById('bottomButtonContainer');
    bottomButtonContainer.style.display = "flex";
    topButtonContainer.style.height = "50%";
    if (questions[activequestionid].c=="") {
      bottomButtonContainer.style.display = "none";
      topButtonContainer.style.height = "100%";
    } else {
      c.innerHTML = questions[activequestionid].c;
      d.innerHTML = questions[activequestionid].d;
    }
    

    if(questions[activequestionid].img!=false) {

    } else {

    }
    
    // Timer starten
    startTimer();

}


let timestart;


async function phase4() {
    if (activequestionid==questions.length-1) {
        theend();
        return;
    }
    try {
        await supabaseUpdate('fragen', ['auswertung'], [true], 'eq', 'id', activequestionid);
        await supabaseUpdate('spieler', ['vote'], [null], 'gt', 'id', '-1');
    } catch (error) {
        alert(error.message);
        return;
    }
    togglePhase(boxPhase4);
    votebox.removeChild(document.getElementById('vote'));
    votebox.innerHTML = '<canvas id="vote" class="vote"></canvas>';
    fetchRangliste();
    bt1.innerHTML = "Starte Frage "+(activequestionid+1)+" von "+(questions.length-1);
    console.log('%c beende frage' + activequestionid, 'background: #222; color: #bada55')
}


// Länge der Zeit für Fragen
let setTime;
let timerLoop;
let futureTime;


// startet Timer
function startTimer() { 
  timerLoop = setInterval(countDownTimer, 10);
  setTime = questions[activequestionid].zeit*1000;
  futureTime = Date.now() + setTime;
  startCountdown(questions[activequestionid].zeit);

}


// Lässt Timer ablaufen, hinterfrags nicht, es funtioniert einfach
function countDownTimer() {
    const remainingTime = futureTime - Date.now();

    if(remainingTime <= 0) {
        timerEnd();
        // Hier Funktion bei Ablauf des Timers callen
    }
} 


// Wird bei Ablaufen der Zeit aufgerufen
async function timerEnd() {
    // timerContainer.style.display = "none";
    try {
        clearInterval(timerLoop);
        await supabaseUpdate('fragen', ['ende'], [true], 'eq', 'id', activequestionid)
    } catch (error) {
        alert(error.message);
        return;
    }
    function updateStyle(element, letter) {
        if (questions[activequestionid].loesung.includes(letter)) {
            let color;
            switch (letter) {
                case "a":
                    color = "rgb(255, 183, 10)";
                    break;
                case "b":
                    color = "rgb(125, 241, 38)";
                    break;
                case "c":
                    color = "rgb(13, 124, 240)";
                    break;
                case "d":
                    color = "rgb(209, 100, 255)";
                    break;
            }
            element.style.opacity = "1";
            element.style.boxShadow = `0 0 10px 5px ${color}`;
            element.style.border = `${color} solid 5px`;

        } else {

            element.style.opacity = "0.3";
            element.style.boxShadow = "none";
            element.style.border = "transparent";
        }
    }

    updateStyle(a, "a");
    updateStyle(b, "b");
    updateStyle(c, "c");
    updateStyle(d, "d");
    document.body.classList.add('waiting');

        console.log('%c beende frage' + activequestionid, 'background: #222; color: #bada55')
        setTimeout(() => {
            phase3();
        }, 500);

}


class User {
    constructor(id, name, punkte, streak, rank, lastrank, vote, podium) {
        this.id = id;
        this.name = name;
        this.punkte = punkte;
        this.streak = streak;
        this.rank = rank;
        this.lastrank = lastrank;
        this.vote = vote;
        this.podium = podium;
    }
}


userlist = [

];


// Diagramm wer für was gestimmt hat
// Musst du nicht verstehen, hab versucht so gut wie möglich zu kommentieren, damit für Style einfacher ist
// Im Fall der Fälle kannst du unter https://www.chartjs.org/docs/latest/ alles nachlesen
async function phase3() {
    let datenStrom;
    try {
        await updateRanking();
        datenStrom = await supabaseFetch('spieler', 'id, name, punkte, streak, vote, podium', '', '', '', 'punkte', false)
    } catch (error) {
        alert(error.message);
        return;
    }
        togglePhase(boxPhase3);
        avotes = 0;
        bvotes = 0;
        cvotes = 0;
        dvotes = 0;    
        console.log("Beginne Auswertung")
        for (let i = 0; i < datenStrom.length; i++) {
            userIndex = userlist.findIndex((obj => obj.id == datenStrom[i].id));
            if (userIndex<0) {
                userlist.push(new User(datenStrom[i].id, datenStrom[i].name, null, null, null, null, null, false));
                console.log("%c Neuer User hinzugefügt", "color: red")
                userIndex = userlist.findIndex((obj => obj.id == datenStrom[i].id));
            }
            if (datenStrom[i].punkte<0) {
                userlist.splice(userIndex, 1);
            } else {
                    userlist[userIndex].lastrank = userlist[userIndex].rank;
                    userlist[userIndex].punkte = datenStrom[i].punkte;
                    userlist[userIndex].streak = datenStrom[i].streak;
                    userlist[userIndex].vote = datenStrom[i].vote;
                    userlist[userIndex].podium = datenStrom[i].podium;
                    userlist[userIndex].rank = i+1;
                    
                    switch (datenStrom[i].vote) {
                        case 'a':
                            avotes++;
                            break;
                        case 'b':
                            bvotes++;
                            break;
                        case 'c':
                            cvotes++;
                            break;
                        case 'd':
                            dvotes++;
                            break;
                        default:
                            userlist[userIndex].vote = null;
                            break;
                    }
            }            
        }

        userlist.sort(function (a, b) {return a.rank - b.rank});
        
        apod = [];
        bpod = [];
        cpod = [];
        dpod = [];

        podiumList = userlist.filter(user => user.podium == true);
        podiumList.sort(function (a, b) {return a.rank - b.rank});
        for(let i = 0; i < podiumList.length; i++) {
            switch (podiumList[i].vote) {
                case 'a':
                    apod.push(podiumList[i].name);
                    break;
                case 'b':
                    bpod.push(podiumList[i].name);
                    break;
                case 'c':
                    cpod.push(podiumList[i].name);
                    break;
                case 'd':
                    dpod.push(podiumList[i].name);
                    break;
                default:
                    break;
            }
        }

        switch(questions[activequestionid].c) {
            case "":
                xValues = [apod, bpod];
                yValues = [avotes, bvotes];
                barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)"];
                borderColors = [a.style.borderColor, b.style.borderColor];
                break;
            default:
                xValues = [apod, bpod, cpod, dpod]
                yValues = [avotes, bvotes, cvotes, dvotes];
                barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)", "rgb(9, 85, 164)", "rgb(169, 90, 229)"];
                borderColors = [a.style.borderColor, b.style.borderColor, c.style.borderColor, d.style.borderColor];
                break;
        }
        bt2.style.display = "flex";
        nchart();
}



// Erstellt Diagramm, greift zurück auf "phase3();"
function nchart() {
    new Chart("vote", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            borderColor: borderColors,
            borderWidth: 3,
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
                title: {
                    // Würde Titel des Diagramms Antzeigen
                display: false,
                },
                plugins: { // Lies alles nach unter https://v0_7_0--chartjs-plugin-datalabels.netlify.app/guide/positioning.html#anchoring
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        // Würde oben noch mal zu jeder Column den Wert anzeigen, wird aber weiter unten im Code schon mit Plugin "Datalabels" geregelt
                    display: false,
                    },
                    datalabels: {
                        // Style von den Werten der Columns
                        color: "black",
                        font: {
                            size: 30,
                        },
                        // Positionierung
                        anchor: 'end',
                        align: 'top',
                        clamp: true     
                }},
                scales: {
                    x: {

                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: "black",
                            font: {
                                size: 25
                            }   
                        }
                    },
                    y: {
                        // Würde yAchse mit Beschriftung (also 100, 150, 200, 250, etc) anzeigen Lassen
                        display: false,
                    },
                }
            },
            plugins: [ChartDataLabels]
        });
    document.body.classList.remove('waiting');
}






const table = document.getElementById('table');
const tablebox = document.getElementById('tablebox');

// Erzeugt eine neue Spalte in Rangliste mit eingegebenen Daten
// row hat als class "rank1", "rank2", "rank4", "rakn5" usw.
// einzelnes feld hat als class "row", ist noch änderbar

function fetchRangliste() {
    table.innerHTML = 
    `<tr class="headRow">
        <td class="udata updown"></td>
        <td class="udata rank">Rang</td>
        <td class="udata uname">Name</td>
        <td class="udata uscore">Punkte</td>
        <td class="udata streak"></td>
        <td class="udata podiumSwitch"></td>
    </tr>`;
    trennung = 0;
    for (let i = 0; i < userlist.length; i++) {

        if (userlist[i].podium) {
            utype = "podium";
        } else {
            utype = "userRecord";
        }

        console.log(utype)

        if(i<ranglistenlimit) {
            userupdate(userlist[i].id, utype);
        } else {
            if (utype=="podium") {
                if(trennung==0) {
                    // Roter trennstrich nach top 10 oder 15 
                    table.innerHTML += `
                    <tr class="emptyRow">
                        <td class="spacecol"</td>
                        <td class="spacecol"></td>
                        <td class="spacecol"></td>
                        <td class="spacecol"></td>
                    </tr>`;
                    trennung = 1;
                }
                if(i-1>ranglistenlimit && userlist[i-1].podium==false) {
                    //emptycolumn();
                }
                userupdate(userlist[i].id, utype);
            }
        }

    }
}



function userupdate(uid, type) {
    id = userlist.findIndex((obj => obj.id == uid));
    // Bei streak 0 wird keine flamme angezeigt
    if (userlist[id].streak==0) {
        sbox = "";
    } else {
        sbox = `
        <div class="streakRecord">${userlist[id].streak}</div>`
    }

    if (nextPodium.includes(activequestionid)) {

    // Wenn der User sich auf dem Podium befindet ist der Schalter schon auf checked
    if(type == "podium") {
        checked = "checked"
    } else {
        checked = ""
    }

        cb = `
        <div class="switchContainer">
        <label class="switch">
            <input class="switchinput" type="checkbox" onchange="toggle('${userlist[id].id}', this)" ${checked}>
            <area class="switch slider"></area>
        </label>
        </div>`
    } else {
        cb = "";
    }
    // Hier gerne bearbeiten, der type ist "podium" oder "normaluser", er wird in zeile 507-511 festgelegt
    document.getElementById('table').innerHTML += `
    <tr class="${type}" id="${userlist[id].id}row">
        <td class="udata updown dataCell"><div id="updown${userlist[id].id}"></div></td>
        <td class="rank dataCell">${userlist[id].rank}</td>
        <td class="uname dataCell">${userlist[id].name}</td>
        <td class="score dataCell">${userlist[id].punkte}</td>
        <td class="dataCell streak">${sbox}</td>
        <td class="podiumSwitch dataCell">${cb}<td>
    </tr>`;


        // Ob User abgestiegen oder aufgestiegen ist
    if(userlist[id].lastrank != null) {
        if(userlist[id].lastrank != userlist[id].rank) {
            if (userlist[id].lastrank < userlist[id].rank) {
                document.getElementById("updown"+userlist[id].id).classList.add('down');
            } 
            if (userlist[id].lastrank > userlist[id].rank) {
                document.getElementById("updown"+userlist[id].id).classList.add('up');
            }
        }
    }
}


function emptycolumn() {
    // Die "..." Row, änder was du willst
    document.getElementById('table').innerHTML += `
    <tr class="emptycolumn">
        <td class="normaluser">...</td>
        <td class="normaluser"></td>
        <td class="normaluser"></td>
        <td class="normaluser"></td>
    </tr>`;
}


function checkStarting () {
    console.log('nix')
}






async function toggle(id, cb) {
    userIndex = userlist.findIndex((obj => obj.id == id));
    if(cb.checked == true) {
        try {
            supabaseUpdate('spieler', ['podium'], [true], 'eq', 'id', id);
        } catch (error) {
            alert(error.message);
            return;
        }
        userlist[userIndex].podium = true;
        document.getElementById(id+"row").classList.remove('userRecord');
        document.getElementById(id+"row").classList.add('podium');
    } else {
        try {
            supabaseUpdate('spieler', ['podium'], [false], 'eq', 'id', id);
        } catch (error) {
            alert(error.message);
            return;
        }
        userlist[userIndex].podium = false;
        document.getElementById(id+"row").classList.remove('podium');
        document.getElementById(id+"row").classList.add('userRecord');
    }
}



// Entwicklertools




function showCharts(avotes, bvotes, cvotes, dvotes, richtigeanwort) {
    togglePhase(boxPhase2);



    if (avotes==null) {
        avotes = 6;
    }
    if (bvotes==null) {
        bvotes = 42;
    }
    if (cvotes==null) {
        cvotes = 53;
    }
    if (dvotes==null) {
        dvotes = 23;
    }
    if (richtigeanwort==null) {
        richtigeanwort = "c";
    }


    
    if(richtigeanwort=="a") {
        a.style.border = "red solid 5px";
    } else {
        a.style.opacity = "0.5";
        a.style.border = "transparent";
    }
    if(richtigeanwort=="b") {
        b.style.border = "red solid 5px"
    } else {
        b.style.opacity = "0.5";
        b.style.border = "transparent";
    }
    if(richtigeanwort=="c") {
        c.style.border = "red solid 5px"
    } else {
        c.style.opacity = "0.5";
        c.style.border = "transparent";
    }
    if(richtigeanwort=="d") {
        d.style.border = "red solid 5px"
    } else {
        d.style.opacity = "0.5";
        d.style.border = "transparent";
    }
    xValues = ["", "jürgen", ["walter", "tilman", "manfred", "lorentz", "bernd"], ["mario", "luigi"]];
    yValues = [avotes, bvotes, cvotes, dvotes];
    barColors = ["rgb(239, 141, 10)", "rgb(86, 165, 26)", "rgb(9, 85, 164)", "rgb(169, 90, 229)"];
    borderColors = [a.style.borderColor, b.style.borderColor, c.style.borderColor, d.style.borderColor];

    nchart();
}