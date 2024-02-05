const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginArea = document.getElementById('loginArea');
const loginError = document.getElementById('loginError');
const bigLoginBox = document.getElementById('bigLoginBox');


loginBtn.addEventListener('click', tryLogin);
password.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        tryLogin();
    }
});


function tryLogin() {
    un = username.value;
    pw = password.value;
    loginBtn.classList.remove("error");
    supabaseFetch("hosts", "id", "eq", "username", un.toLowerCase(), "id", true).then((data) => {
        if(data.length == 0){
            console.log("Account existiert nicht");
            loginError.style.color = "#ce2029";
            loginBtn.classList.add("error");
        } else {
            supabaseFetch("hosts", "id", "eq", "password", pw, "id", true).then((data) => {
                if(data.length == 0){
                    console.log("Passwort falsch");
                    loginError.style.color = "#ce2029";
                    loginBtn.classList.add("error");
                } else {
                    console.log("Erfolgreich eingeloggt");
                    loginError.style.color = "transparent";
                    // localStorage.setItem("hostID", data[0].id);
                    bigLoginBox.style.display = "none";
                }
            });
        }
    }
    )
};
