const submit = document.getElementById('submit');
let un;

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


function nicknameuebermitteln() {;
    window.nickname = tb1.value;
    toggle(inputBox);
    supabaseInsert("spieler", ["name", "punktzahl"], [nickname, 0]) 
}



function checkusername() {
    un = tb1.value;
    console.log(
    supabaseFetch("spieler", ["id"], ["name"], un, "id", true));
    

}