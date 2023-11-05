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
        nicknameuebermitteln();
    }
});


function nicknameuebermitteln() {
    if (blocksubmit==true) {
        tb1.classList.add('error');
    } else {
    window.nickname = tb1.value;
    inputBox.style.display = "none";
    supabaseInsert("spieler", ["name", "punktzahl"], [nickname, 0]) ;
}}


// Kriterien für Benutzername
function checkusername() {
    unerror.style.color = "gray";
    blocksubmit = true;
    tb1.classList.remove('error');
    supabaseFetch("spieler", "id", "eq", "name", tb1.value, "id", true);
    setTimeout(() => {
        un = tb1.value;
        if (length==0) {
            unerror.style.color = "green";
            unerror.innerHTML = "Benutzername verfügbar";
            blocksubmit = false;
        } else {
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername beireits vergeben";
            blocksubmit = true;
        }
        if (/\s/.test(un)) {
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername darf keine Leerzeichen enthalten"
            blocksubmit = true;}

        if (un.length==0) {
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername muss mindestens 1 Zeichen lang sein"
            blocksubmit = true;
        } else {
        // Abgleich vulgäre Sprache 
        fetch("test.txt")
        .then((res) => res.text())
        .then((proflist) => {
            let result = proflist.match(new RegExp("\\b" + un.toLocaleLowerCase() + "\\b")) != null; 
            if (result==true) {
                unerror.style.color = "red";
                unerror.innerHTML = "Benutzername kann etwas unangemessen sein";
                blocksubmit = true;
            }
        })}

        if (un.length>20) {
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername darf maximal 20 Zeichen lang sein";
            blocksubmit = true;
        }

    }, 300);


}
;



