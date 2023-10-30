

const bt1 = document.getElementById('bt1');
const tb1 = document.getElementById('tb1');
const buttonBox = document.getElementById('buttonBox');
const nicknameBox = document.getElementById('nicknameBox');
const toggleButtonBox = document.getElementById('toggleButtonBox');
const toggleInputBox = document.getElementById('toggleInputBox');
const inputBox = document.getElementById('inputBox');

const bta = document.getElementById('bta')
const btb = document.getElementById('btb')
const btc = document.getElementById('btc')
const btd = document.getElementById('btd') 
let nickname;


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
    nickname = tb1.value;
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
    toggle(buttonBox);
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

const semicircles = document.querySelectorAll('.semicircle');
const timer = document.getElementById('timertext');

// Müssen wir schaun wie der Input sein wird
let hr = 0;
let min = 0;
let sec = 20;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
let timerLoop;
let startTime;
let futureTime;


toggleTimer.addEventListener('click', function stimer() { 
timerLoop = setInterval(countDownTimer);
startTime = Date.now();
futureTime = startTime + setTime;
semicircles[0].style.display = "block";
semicircles[1].style.display = "block";
semicircles[0].style.backgroundColor = "blue";
semicircles[1].style.backgroundColor = "blue";
timer.style.color = "white";
countDownTimer();
});


// Visuelles und technisches Zeug, bei Ablauf von Zeit siehe unterer Kommentar
function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    if(angle > 180) {
        semicircles[2].style.display = "none";
        semicircles[0].style.transform = "rotate(180deg)";
        semicircles[1].style.transform = "rotate("+angle+"deg)";
    } else {
        semicircles[2].style.display = "block";
        semicircles[0].style.transform = "rotate("+angle+"deg)";
        semicircles[1].style.transform = "rotate("+angle+"deg)";
    }

    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const secs = Math.floor((remainingTime / (1000)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    timer.innerHTML = hrs+":"+mins+":"+secs

    // Letzten 5 Sekunden rot
    if(remainingTime <= 6000) {
        semicircles[0].style.backgroundColor = "red";
        semicircles[1].style.backgroundColor = "red";
        timer.style.color = "red";
    }

    if(remainingTime < 0) {
        clearInterval(timerLoop);
        semicircles[0].style.display = "none";
        semicircles[1].style.display = "none";
        semicircles[2].style.display = "none";
        timer.style.fontSize = "4vh";
        timer.innerHTML = "ABGELAUFEN";
        // Hier Funktion bei Ablauf des Timers callen
    }
} 