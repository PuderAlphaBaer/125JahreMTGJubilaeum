const submit = document.getElementById('submit');
let un;
let unerror = document.getElementById('unerror');
blocksubmit = true;

submit.addEventListener('click', function () {
    nicknameuebermitteln();
} 
);
tb1.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('ALARM');
        nicknameuebermitteln();
    }
});


function nicknameuebermitteln() {
    if (blocksubmit==true) {
        tb1.classList.add('error');
    } else {
    window.nickname = tb1.value;
    toggle(inputBox);
    supabaseInsert("spieler", ["name", "punktzahl"], [nickname, 0]) 
}}

let data;
function checkusername() {
    unerror.style.color = "gray";
    blocksubmit = true;
    tb1.classList.remove('error');
    supabaseFetch("spieler", "id", "name", tb1.value, "id", true);
    setTimeout(() => {
        if(length==0) {
            unerror.style.color = "green";
            unerror.innerHTML = "Benutzername verfügbar";
            blocksubmit = false;
        } else {
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername beireits vergeben";
            blocksubmit = true;
        }
        if (/\s/.test(tb1.value)) {
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername darf keine Leerzeichen enthalten"
            blocksubmit = true;}
        if (!tb1.value.replace(/\s/g, '').length) {
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername muss mindestens 1 Zeichen lang sein"
            blocksubmit = true;
        }
    }, 100);



}
;



// Abgleich vulgäre Sprache

// if (!message.replace(/\s/g, '').length) {
//     tb1.focus();
// }
// else {
// let checkstring = tb1.value;
// let result = data.includes(checkstring); 

// if (result==true) {
//     // Böser Benutzername
// } else {
//     // Guter Benutzername
// }
