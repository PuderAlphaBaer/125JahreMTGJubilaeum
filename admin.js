const bt1 = document.getElementById('bt1');
const admin = document.getElementById('admin');
const surface = document.getElementById('surface');
const ubox = document.getElementById('ubox');
let repbox = "";

bt1.addEventListener('click', swap);


function swap() {
if(surface.style.display=="none") {
    bt1.innerHTML = "Klick für Surface"
    admin.style.display = "none";
    surface.style.display = "flex";
} else {
    bt1.innerHTML = "Klick für Admin"
    surface.style.display = "none";
    admin.style.display = "flex";
}};



let uclass = "udata"
// Hier einfach userupdate() mit supabase verbinden
userupdate(2, "Christian", 999999999999, 2);
userupdate(1, "Tilman", 1000000000000, 1);
userupdate(42, "Banndoll", undefined, undefined, true)
userupdate(1, "Tilman_der_erste", 1000, 3);
userupdate(1, "Tilman_der_zweite", 100, 5);
userupdate(1, "Tilman_der_dritte", 10, 18);

function userupdate(uid, uname, score, rank, banned) {
    
if(banned==true) {
    uclass = "banned"; 
    repbox = "";
} 
else {
    uclass = "udata"
    repbox = `<td class="ureport" onclick="report(${uid}, '${uname}')">REPORT</td>`
}


    ubox.innerHTML += `
    <tr>
        <td class="${uclass}">${uid}</th>
        <td class="${uclass}">${uname}</th>
        <td class="${uclass}">${score}</th>
        <td class="${uclass}">${rank}</th>
        ${repbox}
    </tr>`;
}




 function report(uid, uname) {
    if (confirm(`Sind Sie sich sicher, dass Sie User ${uid} mit dem Namen "${uname}" sperren möchten`)) {
        supabaseUpdate("spieler", ["blocked", "punktzahl"], [true, -1], "eq",  "id",  uid);
        supabaseUpdate("spieler", ["blocked", "punktzahl"], [true, -1], "eq",  "id",  uid);
      } else {
        // Nix
      }
};






















const bt2 = document.getElementById('bt2');
const fragenbox = document.getElementById('fragenbox');
const rangeliste = document.getElementById('rangliste');
bt2.addEventListener('click', toggleSurface);

function toggleSurface() {
        fragenbox.style.display = "flex";
        rangeliste.style.display = "none";
        startTimer();
}


  function startQuestion() {
    
  }




















  // Timer
  
const timer = document.getElementById('timertext');
const s1 = document.getElementById('s1');
const s2 = document.getElementById('s2');
const s3 = document.getElementById('s3');

// Müssen wir schaun wie der Input sein wird

// Länge der Zeit für Fragen
const sec = 10;
const setTime = sec *1000;


let timerLoop;
let futureTime;
timer.innerHTML = sec+".00"


function startTimer(time) { 
  timerLoop = setInterval(countDownTimer, 10);
  futureTime = Date.now() + setTime;
  s1.style.display = "block";
  s2.style.display = "block";
  s1.style.backgroundColor = "orangered";
  s2.style.backgroundColor = "orangered";
  timer.style.color = "yellow";
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
        clearInterval(timerLoop);
        s1.style.display = "none";
        s2.style.display = "none";
        s3.style.display = "none";
        timer.style.fontSize = "3vh";
        timer.innerHTML = "ABGELAUFEN";
        fragenbox.style.display = "none";
        rangeliste.style.display = "block";
        // Hier Funktion bei Ablauf des Timers callen
    }
} 

