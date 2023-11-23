const submit = document.getElementById('submit');
let un;
let unerror = document.getElementById('unerror');
blocksubmit = true;
let nickname;
const biginputbox = document.getElementById('biginputbox');




document.getElementById('skip').addEventListener('click', skip);

function skip() {
  nickname = "Tilman";
  startGame();
}




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
    checkusername();
    if (blocksubmit==true) {
        tb1.classList.add('error');
    } else {
    nickname = tb1.value;
    supabaseInsert("spieler", ["name", "punkte"], [nickname, 0]) ;
    startGame();
}}


// Kriterien für Benutzername
function checkusername() {
    unerror.style.color = "gray";
    blocksubmit = true;
    tb1.classList.remove('error');
    setTimeout(() => {
        un = tb1.value;
        async function checking() {
            const exists = await supabaseExists('spieler', 'eq', 'name', un)
            if (exists == false){
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
            // fetch("data/test.txt")
            // .then((res) => res.text())
            // .then((proflist) => {
            //     let result = proflist.match(new RegExp("\\b" + un.toLocaleLowerCase() + "\\b")) != null; 
            //     if (result==true) {
            //         unerror.style.color = "red";
            //         unerror.innerHTML = "Benutzername kann etwas unangemessen sein";
            //         blocksubmit = true;
            //     }
            // })
        }

            if (un.length>20) {
                unerror.style.color = "red";
                unerror.innerHTML = "Benutzername darf maximal 20 Zeichen lang sein";
                blocksubmit = true;
            }
        }
        checking();
    }, 100)
    }









    const bigbox = document.getElementById('bigbox');
    const unbox = document.getElementById('unbox');




    function startGame() {
        biginputbox.style.display = "none";
        bigbox.style.display = "flex";
        unbox.innerHTML = nickname;
    }
    
    