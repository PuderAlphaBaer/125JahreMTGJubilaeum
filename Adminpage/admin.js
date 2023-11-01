const bt1 = document.getElementById('bt1');
const user = document.getElementById('user');
const fragen = document.getElementById('fragen');
const ubox = document.getElementById('ubox');
let activeside = "user";

bt1.addEventListener('click', swap);


function swap() {
if(activeside=="user") {
    activeside = "fragen";
    bt1.innerHTML = "Klick für Rangliste"
    user.style.display = "none";
    fragen.style.display = "flex";
} else {
    activeside = "user";
    bt1.innerHTML = "Klick für Fragen"
    fragen.style.display = "none";
    user.style.display = "flex";
}};




// Hier einfach userupdate() mit supabase verbinden
userupdate(2, "Christian", 999999999999, 2);
userupdate(1, "Tilman", 1000000000000, 1);








function userupdate(uid, uname, score, rank) {
    
    ubox.innerHTML += `
    <tr>
        <td class="udata">${uid}</th>
        <td class="udata">${uname}</th>
        <td class="udata">${score}</th>
        <td class="udata">${rank}</th>
        <td class="ureport" onclick="report(${uid}, '${uname}')">REPORT</td>
    </tr>`;
}




 function report(uid, uname) {
    if (confirm(`Sind Sie sich sicher, dass Sie User ${uid} mit dem Namen "${uname}" sperren möchten`)) {
        // Bann
        console.log(`User ${uid} mit dem Namen "${uname}" wurde gesperrt.`);
      } else {
        // Nix
      }
};