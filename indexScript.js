

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


const semicircles = document.querySelectorAll('.semicircle');

// Müssen wir schaun wie der Input sein wird
let hr = 0;
let min = 0;
let sec = 10;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
let startTime = Date.now();
const futureTime = startTime + setTime;


const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    if(angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = 'rotate(${angle}deg)';
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = 'rotate(${angel}deg)';
        semicircles[1].style.transform = 'rotate(${angle}deg)';
    }
}