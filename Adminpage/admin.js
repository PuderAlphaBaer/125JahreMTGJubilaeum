const bt1 = document.getElementById('bt1');
const user = document.getElementById('user');
const fragen = document.getElementById('fragen');
let activeside = "fragen";

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




