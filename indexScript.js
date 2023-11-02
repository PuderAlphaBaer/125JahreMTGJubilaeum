const bt1 = document.getElementById('bt1');
const tb1 = document.getElementById('tb1');
const buttonBox = document.getElementById('buttonBox');
const nicknameBox = document.getElementById('nicknameBox');
const toggleButtonBox = document.getElementById('toggleButtonBox');
const toggleInputBox = document.getElementById('toggleInputBox');
const inputBox = document.getElementById('inputBox');
const quizBox = document.getElementById('quizbox')

const bta = document.getElementById('bta')
const btb = document.getElementById('btb')
const btc = document.getElementById('btc')
const btd = document.getElementById('btd') 


bt1.addEventListener('click', function () {
    nicknameuebermitteln();
    toggle(inputBox);
} 
);

bta.addEventListener('click', function () {console.log('a')})
btb.addEventListener('click', function () {console.log('b')})
btc.addEventListener('click', function () {console.log('c')})
btd.addEventListener('click', function () {console.log('d')})
tb1.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        bt1.click;
    }
});



function nicknameuebermitteln() {
    console.log('testss');
    window.nickname = tb1.value;
    toggle(inputBox);
    console.log(nickname+"test");
}


function toggle(obj) {
    if (obj.style.display == 'none') {
        obj.style.display = 'block';
    } else {    
        obj.style.display = 'none';
    }
}

toggleButtonBox.addEventListener('click', function () {
    toggle(quizBox);
});
toggleInputBox.addEventListener('click', function () {
    toggle(inputBox);
});


function Frage(loesung, beantwortet, start, streak) {
  this.loesung = loesung;
  this.beantwortet = beantwortet;
  this.start = start;
  this.streak = streak;
};

let started = false;
let winstreak = 0;
let timestart;


let frage1 = new Frage('a', started, timestart, winstreak);
let frage2 = new Frage('c', started, timestart, winstreak); 
let frage3 = new Frage('c', started, timestart, winstreak);



// Timerfunktion ------------------------------------------------------------------------
const toggleTimer = document.getElementById('toggleTimer');

const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');

// Müssen wir schaun wie der Input sein wird

let sec = 7;

const setTime = sec * 1000;
let timerLoop;
let startTime;
let futureTime;

timer.innerHTML = sec+".00"

toggleTimer.addEventListener('click', function() { 
    timerLoop = setInterval(countDownTimer, 10);
    startTime = Date.now();
    futureTime = startTime + setTime;
    s1.style.display = "block";
    s2.style.display = "block";
    s1.style.backgroundColor = "rgb(63, 63, 63)";
    s2.style.backgroundColor = "rgb(63, 63, 63)";
    timer.style.color = "rgb(63, 63, 63)";
    countDownTimer();
});


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
        // Hier Funktion bei Ablauf des Timers callen
    }
} 





// Abgleich vulgäre Sprache

// if (!message.replace(/\s/g, '').length) {
//     alert("Bitte keine leeren Nachrichten versenden")
//     tb.value = '';
//     tb.focus();
// }
// else {
// let checkstring = tb1.value;
// let result = data.includes(checkstring); 

// if (result==true) {
//     // Boeser Benutzername
// } else {
//     // Guter Benutzername
// }
