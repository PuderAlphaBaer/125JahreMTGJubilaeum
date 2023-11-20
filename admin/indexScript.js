const rangliste = document.getElementById('rangliste');
const ubox = document.getElementById('ubox');
let repbox = "";



let uclass = "udata"
// Hier einfach userupdate() mit supabase verbinden


function userupdate(uid, rank, uname, score, blocked) {
    
if(blocked > 0) {
    uclass = "banned"; 
    repbox = "";
} 
else {
    uclass = "udata"
    repbox = `<td class="ureport" onclick="report(${uid}, '${uname}')">REPORT</td>`
}


    ubox.innerHTML += `
    <tr>
        <td class="${uclass}">${uid}</th>
        <td class="${uclass}">${uname}</th>
        <td class="${uclass}">${score}</th>
        <td class="${uclass}">${rank}</th>
        ${repbox}
    </tr>`;
}


let ban;

 function report(uid, uname) {
    // if (confirm(`Sind Sie sich sicher, dass Sie User ${uid} mit dem Namen "${uname}" sperren möchten`)) {
    //     supabaseUpdate("spieler", ["blocked", "punkte"], [true, -1], "eq",  "id",  uid).then(() => {
    //         fetchUserlist();
    //     });
    // }
    
    

    ban = prompt(`Wofür wollen Sie User ${uid} mit dem Namen "${uname}" sperren`);
    if (person == null || person == "") {
      console.log("bann abgebrochen");
    } else {
        supabaseUpdate("spieler", ["blocked", "punkte"], [person, -1], "eq",  "id",  uid).then(() => {
            fetchUserlist();
        });
    }

    };

function fetchUserlist() {
    ubox.innerHTML =`<tr> 
    <th class="udata">UID</th>
    <th class="udata">User Name</th>
    <th class="udata">Score</th>
    <th class="udata">Rank</th>
  </tr>`;
    supabaseFetch('spieler', 'id, name, punkte, rang, blocked', '', '', "", 'rang', false).then((data) => {
                console.log(data)
         for (let i = 0; i < data.length; i++) {
            userupdate(data[i].id, i + 1, data[i].name, data[i].punkte, data[i].blocked)
         }
        });
    }

    fetchUserlist();