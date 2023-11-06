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
        // Bann
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
    if(rangeliste.style.display=="none") {
        fragenbox.style.display = "none";
        rangeliste.style.display = "flex";
    } else {
        fragenbox.style.display = "flex";
        rangeliste.style.display = "none";
    }
}

class Frage {
    constructor(type, frage, a, b, c, d, loesung) {
      this.type = type;
      this.frage = frage;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.loesung = loesung;
    }
  }


  const f1 = new Frage("mcoice", "Wer passt nicht", "Herr Waschbüsch", "Frau Leeb", "Frau Till", "Frau Fendt", "b");
  console.log(f1);