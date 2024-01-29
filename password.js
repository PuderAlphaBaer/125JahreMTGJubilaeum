
function pwd() {
    pw = prompt("Passwort eingeben:",  "Tilman ist toll");
    if (pw == "Jesus!") {
        console.log("pw richtig");
    } else {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
}

pwd();