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

let sec = 20;

const setTime = sec * 1000;
let timerLoop;
let startTime;
let futureTime;


toggleTimer.addEventListener('click', function() { 
    timerLoop = setInterval(countDownTimer, 1);
    startTime = Date.now();
    futureTime = startTime + setTime;
    semicircles[0].style.display = "block";
    semicircles[1].style.display = "block";
    semicircles[0].style.backgroundColor = "rgb(63, 63, 63)";
    semicircles[1].style.backgroundColor = "rgb(63, 63, 63)";
    timer.style.color = "rgb(63, 63, 63)";
    countDownTimer();
});


// Visuelles und technisches Zeug, bei Ablauf von Zeit siehe unterer Kommentar
function countDownTimer() {
    const remainingTime = futureTime - Date.now();
    const angle = (remainingTime / setTime) * 360;

    if(angle > 180) {
        semicircles[2].style.display = "none";
        semicircles[0].style.transform = "rotate(180deg)";
        semicircles[1].style.transform = "rotate("+angle+"deg)";
    } else if(angle <= 180){
        semicircles[2].style.display = "block";
        semicircles[0].style.transform = "rotate("+angle+"deg)";
        semicircles[1].style.transform = "rotate("+angle+"deg)";
    }

    timer.innerHTML = remainingTime.toString().slice(0, -3)+"."+remainingTime.toString().slice(-3);

    // Letzten 5 Sekunden rot
    if(remainingTime <= 5000) {
        semicircles[0].style.backgroundColor = "purple";
        semicircles[1].style.backgroundColor = "purple";
        timer.style.color = "purple";
    }

    if(remainingTime <= 0) {
        clearInterval(timerLoop);
        semicircles[0].style.display = "none";
        semicircles[1].style.display = "none";
        semicircles[2].style.display = "none";
        timer.style.fontSize = "4vh";
        timer.innerHTML = "ABGELAUFEN";
        // Hier Funktion bei Ablauf des Timers callen
    }
} 





// Abgleich vulgäre Sprache


// let checkstring = tb1.value;
// let result = data.includes(checkstring); 

// if (result==true) {
//     // Böser Benutzername
// } else {
//     // Guter Benutzername
// }