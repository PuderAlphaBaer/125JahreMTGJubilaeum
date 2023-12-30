const rangliste = document.getElementById('rangliste');
const podiumbox = document.getElementById('podiumbox');
const ubox = document.getElementById('ubox');
const togglebt = document.getElementById('togglebtn')
let repbox = "";




class User {
    constructor(name, punkte, rank, blocked) {
        this.name = name;
        this.punkte = punkte;
        this.rank = rank;
        this.blocked = blocked;
    }
}


userlistad = [

];


function addUser(id, name) {
    userlistad.push(new User(id, name, 0, 0, 0, null, false));
    console.log("%c Neuer User hinzugefügt", "color: red")
}



function fetchUserlist() {
    ubox.innerHTML =`<tr> 
    <th class="udata">User Name</th>
    <th class="udata">Score</th>
    <th class="udata">Rank</th>
    </tr>`;
    supabaseFetch('spieler', 'name, punkte, blocked', '', '', '', 'punkte', false).then((data) => {
        console.log("Aktualisiere User")
        for (let i = 0; i < data.length; i++) {
            userIndex = userlistad.findIndex((obj => obj.name == data[i].name));
            if (userIndex==-1) {
                addUser(data[i].id, data[i].name);
                userIndex = userlistad.findIndex((obj => obj.name == data[i].name));
            }
                userlistad[userIndex].punkte = data[i].punkte;
                userlistad[userIndex].rank = i+1;
                userlistad[userIndex].blocked = data[i].blocked;
                // Ja und nu?
        }
    });
    userlistad.sort(function (a, b) {return a.rank - b.rank});
}




// let uclass = "udata"

// function addUserToList(uname, score, rank, blocked) {
//     if(blocked != null) {
//         uclass = "banned"; 
//         repbox = "";
//     } 
//     else {
//         uclass = "udata"
//         repbox = `<td class="ureport" onclick="report('${uname}')">REPORT</td>`
//     }
//     ubox.innerHTML += `
//     <tr>
//         <td class="${uclass}">${uname}</th>
//         <td class="${uclass}">${score}</th>
//         <td class="${uclass}">${rank}</th>
//         ${repbox}
//     </tr>`;
// }


fetchUserlist();




let ban;

function report(uname) {
   ban = prompt(`Wofür wollen Sie den User "${uname}" sperren?`,  "Anstößiger Benutzername");
   if ((ban )== null || ban == "") {
    console.log("bann abgebrochen");
   } else {
      supabaseUpdate("spieler", ["blocked", "punkte", "streak"], [ban, -1, 0], "eq",  "name", uname)
   }
};

podiumbox.style.display = "flex";
function toggle() {
    if(podiumbox.style.display=="none") {
        podiumbox.style.display = "flex";
        rangliste.style.display = "none";
        togglebt.innerHTML = "Zur Spielerliste wechseln"
    } else {
        podiumbox.style.display = "none";
        rangliste.style.display = "flex";
        togglebt.innerHTML = "Zum Podium wechseln"
    }
}

togglebt.addEventListener('click', toggle)



const search = document.getElementById("search");

search.addEventListener('input', listpodium)

function listpodium() {
    check = search.value;
    console.log(check)
}