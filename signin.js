const pregamebox = document.getElementById('pregamebox');

const phase1box = document.getElementById('phase1box');
  const bar = document.getElementById('bar');
  const frage1 = document.getElementById('frage1');

const phase2box = document.getElementById('phase2box');
  const frage2 = document.getElementById('frage2');
  const a = document.getElementById('bta')
  const b = document.getElementById('btb')
  const c = document.getElementById('btc')
  const d = document.getElementById('btd')

const phase25box = document.getElementById('phase25box');
  const puregenius = document.getElementById('puregenius');

const phase3box = document.getElementById('phase3box');
  const emoji = document.getElementById('emoji')
  const worte = document.getElementById('worte');
  const streaktext = document.getElementById('streak');
  const punkte = document.getElementById('punkte');
  const ims = document.getElementById('ims');
  const imgbox = document.getElementById('imgbox');
  const img = document.getElementById('img');

const phase4box = document.getElementById('phase4box');
  const rang = document.getElementById('rang');
  const brang = document.getElementById('brang');
  const funfact = document.getElementById('funfact');

const endbox = document.getElementById('endbox');
  const endrang = document.getElementById('endrang');

const submitbutton = document.getElementById('submit');
let unerror = document.getElementById('unerror');
const tb1 = document.getElementById('tb1');
const biginputbox = document.getElementById('biginputbox');
let nickname = "";
let angemeldet = false;

function toggleInterface(phase){
    biginputbox.style.display = "none";
    phase1box.style.display = "none";
    phase2box.style.display = "none";
    phase25box.style.display = "none";
    phase3box.style.display = "none";
    phase4box.style.display = "none";
    pregamebox.style.display = "none";
    endbox.style.display = "none";
    phase.style.display = "flex";
}
toggleInterface(biginputbox);

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
    if (nickname.length>20) {
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
        unerror.innerHTML = "Der gewählte Benutzername ist bereits vergeben";
        return;
    }
  
    if (nickname.toLowerCase().includes("tilman") == true) {
        console.log("nickname enthält tilman");
        tb1.classList.add('error');
        unerror.style.color = "red";
        unerror.innerHTML = "Der gewählte Benutzername wurde vom Websiteadministrator gesperrt";
        return;
    }

    // if username contains space 
    if (nickname.includes(' ')) {
        console.log("nickname enthält Leerzeichen");
        tb1.classList.add('error');
        unerror.style.color = "red";
        unerror.innerHTML = "Der gewählte Benutzername darf keine Leerzeichen enthalten";
        return;
    }

    // only letters and numbers allowed and the german umlauts and the hard s
    let letters = /^[A-Za-z0-9äöüÄÖÜß]+$/;
    if (!nickname.match(letters)) {
        tb1.classList.add('error');
        unerror.style.color = "red";
        unerror.innerHTML = "Benutzername darf nur Buchstaben und Zahlen enthalten";
        return;
    }



    // if nickname includes special characters or space, throw error
    // let special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // if (special.test(nickname)) {
    //     console.log("nickname enthält Sonderzeichen");
    //     tb1.classList.add('error');
    //     unerror.style.color = "red";
    //     unerror.innerHTML = "Benutzername darf keine Sonderzeichen enthalten";
    //     return;
    // }
    // if (nickname.includes(' ')) {
    //     console.log("nickname enthält Leerzeichen");
    //     tb1.classList.add('error');
    //     unerror.style.color = "red";
    //     unerror.innerHTML = "Benutzername darf keine Leerzeichen enthalten";
    //     return;
    // }

    let fluch = await fetch('Data/fluch.txt');
    let fluchtext = await fluch.text();
    let fluchliste = fluchtext.split(' ');
    console.log(fluchliste);
    for (let i = 0; i < fluchliste.length; i++) {
        if (nickname.toLowerCase().includes(fluchliste[i].toLowerCase())) {
            tb1.classList.add('error');
            unerror.style.color = "red";
            unerror.innerHTML = "Der gewählte Benutzername kann unangemessen sein";
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


const userBox = document.getElementById('userBox');
userBox.style.display = "none";
const punkteBox = document.getElementById('punkteBox');
punkteBox.style.display = "none";


function startGame() {
  userBox.style.display = "block";
  userBox.innerHTML = 'Du bist '+nickname;
  punkteBox.style.display = "block";

  toggleInterface(pregamebox);
  console.log("püntklich");
  document.title = "5³ Quiz MTG";

console.log("hier vor feier noch entkommentieren");
// const channel = new BroadcastChannel('tab');

// channel.postMessage('sign-in');
// // note that listener is added after posting the message

// channel.addEventListener('message', (msg) => {
//   if (msg.data === 'sign-in') {
//     // message received from 2nd tab
// unsubscribe from the supabase realtime channels

//     window.location.href = "";
//   }
// });

//window.addEventListener("beforeunload", beforeUnloadHandler);
}




tb1.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitbutton.click();
    }
  }); 
