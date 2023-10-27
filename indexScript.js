

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
var nickname;


bt1.addEventListener('click', nicknameuebermitteln());
bta.addEventListener('click', function () {console.log('a')})
btb.addEventListener('click', function () {console.log('b')})
btc.addEventListener('click', function () {console.log('c')})
btd.addEventListener('click', function () {console.log('d')})

function nicknameuebermitteln() {
    nickname = tb1.value;
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
let timestart = "12:00:00";
let winstreak = 0;

let frage1 = new Frage('a', started, timestart, winstreak);
let frage2 = new Frage('c', started, timestart, winstreak); 
let frage3 = new Frage('c', started, timestart, winstreak);
