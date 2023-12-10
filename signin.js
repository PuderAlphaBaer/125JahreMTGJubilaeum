const submitbutton = document.getElementById('submit');
console.log('submitbutton: ' + submitbutton);
let unerror = document.getElementById('unerror');
console.log('unerror:' + unerror);
const tb1 = document.getElementById('tb1');
console.log('tb1: ' + tb1);
const biginputbox = document.getElementById('biginputbox');
console.log('biginputbox: ' + biginputbox);
let nickname = "";
console.log('nickname: ' + nickname);
let angemeldet = false;
spätstart = false;
const spätbox = document.getElementById('spätbox');

async function login() {
    tb1.classList.remove('error');
    nickname = tb1.value;
    if (nickname<1) {
        console.log("nickname zu kurz");
        tb1.classList.add('error');
        unerror.style.color = "red";
        unerror.innerHTML = "Bitte gib einen Benutzernamen ein";
        return;
    }
    if (nickname.length>50) {
        console.log("nickname zu lang");
        tb1.classList.add('error');
        unerror.style.color = "red";
        unerror.innerHTML = "Benutzername darf maximal 20 Zeichen lang sein";
        return;
    }
    let exists = await supabaseExists('spieler', 'eq', 'name', nickname);
    if (exists == true) {
        console.log("nickname bereits vergeben");
        tb1.classList.add('error');
        unerror.style.color = "red";
        unerror.innerHTML = "Benutzername bereits vergeben";
        return;
    }


    //wenn benutzername sonderzeichen enthält, wird er nicht zugelassen

    // profanity list fluch.txt, woerter sind mit nur mit leerzeichen getrennt, wenn nutzername ein wort aus der liste enthaelt, wird er nicht zugelassen, browser javascript, kein node.js oder module
    let fluch = await fetch('fluch.txt');
    let fluchtext = await fluch.text();
    let fluchliste = fluchtext.split(' ');
    console.log(fluchliste);
    for (let i = 0; i < fluchliste.length; i++) {
        if (nickname.toLowerCase().includes(fluchliste[i].toLowerCase())) {
            console.log("nickname enthält fluchwort");
            tb1.classList.add('error');
            unerror.style.color = "red";
            unerror.innerHTML = "Benutzername kann etwas unangemessen sein";
            return;
        }
    }


    console.log("nickname ok");
    supabaseInsert('spieler', ['name', 'punkte'], [nickname, 0])
        if (questions[1].start == true) {
            spätstart = true;
            console.log("zu spät")
        }    
    angemeldet = true;
    startGame();
    }
submitbutton.addEventListener('click', login);



const bigbox = document.getElementById('bigbox');
const unbox = document.getElementById('unbox');


function startGame() {
    biginputbox.style.display = "none";
    bigbox.style.display = "flex";
    unbox.innerHTML = 'Du bist '+nickname;
    if (spätstart==true) {
        spätbox.style.display = "flex";
    } else {
        console.log("püntklich gejoined");
        spätbox.style.display = "none";
}}