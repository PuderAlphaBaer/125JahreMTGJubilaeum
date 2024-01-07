const rangliste = document.getElementById('rangliste');
const podiumbox = document.getElementById('podiumbox');
const ubox = document.getElementById('ubox');
const togglebt = document.getElementById('togglebtn');
const pbox = document.getElementById('pbox');
const body = document.getElementById('body');
let repbox = "";




class Userad {
    constructor(id, name, blocked, podium) {
        this.id = id;
        this.name = name;
        this.blocked = blocked;
        this.podium = podium;
    }
}


userlistad = [

];



// addUser() ist die Funktion die mit data als value gecallt werden muss bei changes, der Rest klappt
function addUser(data) {
    console.log(data)
   
        userlistad.push(new Userad(data.id, data.name, data.blocked, data.podium));
        console.log("%c Neuer User hinzugefügt", "color: red")

    refreshPodiumbox();
}




let ban;

function report(id, uname) {
    userIndex = userlistad.findIndex((obj => obj.id == id));
    if(userlistad[userIndex].podium == true) {
        podban = confirm(`Der User "${uname}" befindet sich auf dem Podium, wollen Sie ihn trotzdem sperren und vom Podium entfernen?`);
        if (podban == true) {
            ban = prompt(`Wofür wollen Sie den User "${uname}" sperren?`,  "Anstößiger Benutzername");
            if ((ban )== null || ban == "") {
                console.log("bann abgebrochen");
            } else {
                userlistad[userIndex].blocked = ban;
                userlistad[userIndex].podium = false;
                supabaseUpdate("spieler", ["blocked", "punkte", "streak", "podium"], [ban, -1, 0, false], "eq",  "id", id).then((data) => {
                    if(data.length == 0) {
                        alert("Bei der Sperrung des Users ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu.\n\nSollte das Problem weiterhin bestehen, kontaktieren Sie bitte den Support (DER TOLLE TILMAN).");
                        userlistad[userIndex].blocked = null;
                        userlistad[userIndex].podium = true;
                    }
                    refreshPodiumbox();
                })
        }
        } else {
            console.log("bann abgebrochen");
        }
    } else {
        ban = prompt(`Wofür wollen Sie den User "${uname}" sperren?`,  "Anstößiger Benutzername");
        if ((ban )== null || ban == "") {
            console.log("bann abgebrochen");
        } else {
            userlistad[userIndex].blocked = ban;
            supabaseUpdate("spieler", ["blocked", "punkte", "streak"], [ban, -1, 0], "eq",  "id", id).then((data) => {
                if(data.length == 0) {
                    alert("Bei der Sperrung des Users ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu.\n\nSollte das Problem weiterhin bestehen, kontaktieren Sie bitte den Support (DER TOLLE TILMAN).");
                    userlistad[userIndex].blocked = null;
                }
                refreshPodiumbox();
            })
        }
    }
};


const search = document.getElementById("search");

search.addEventListener('input', refreshTable)

function addWaitingClass() {
    return new Promise((resolve) => {
        document.body.classList.add('waiting');
        resolve();
    });
}

async function refreshTable() {
    await addWaitingClass();
    check = search.value.toLowerCase();
    specificUser = userlistad.filter(user => user.name.toLowerCase().startsWith(check, 0) == true);
    
    if (specificUser.length === 0) {
        ubox.innerHTML = "<p>Es wurde kein User mit einem Ihrer Suche entsprechenden Namen gefunden.</p>";
    } else {
        specificUser.sort(function (a, b) {return b.id - a.id});


        ubox.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Podium</th>
            </tr>`;


        // refresh UI
        await new Promise(resolve => requestAnimationFrame(resolve));

        for (let i = 0; i < specificUser.length; i++) {
            if(specificUser[i].podium == true) {
                checked = "checked"
            } else {
                checked = ""
            }
            if (specificUser[i].blocked == null) {
                repbox = `
                                    <td class="udata">
                                        <label class="switch">
                                            <input class="switchinput" type="checkbox" onchange="toggle('${specificUser[i].id}', this)" ${checked}>
                                            <area class="switch slider"></area>
                                        </label>
                                    </td>
                                    <td class="ureport">
                                        <div class="report" onclick="report('${specificUser[i].id}', '${specificUser[i].name}')">Sperren</div>
                                    </td>`
                clas = "udata";
            } else {
                repbox = "";
                clas = "banned";
            }
            ubox.innerHTML += ` <tr>
                                    <td class="${clas}">${specificUser[i].name}</td>
                                    ${repbox}
                                </tr>`
        }
    }
    
    document.body.classList.remove('waiting');
}




async function toggle(id, cb) {
    await addWaitingClass();     
    // refresh UI
    await new Promise(resolve => requestAnimationFrame(resolve));
    userIndex = userlistad.findIndex((obj => obj.id == id));
    if(cb.checked == true) {
        userlistad[userIndex].podium = true;
        supabaseUpdate('spieler', ['podium'], [true], 'eq', 'id', id).then((data) => {
            body.classList.remove('waiting');
            if(data.length == 0) {
                userlistad[userIndex].podium = false;
                cb.checked = false;
                alert("Bei der Aktualisierung der Podium-Daten des Users ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu.\n\nSollte das Problem weiterhin bestehen, kontaktieren Sie bitte den Support (DER TOLLE TILMAN).")
            }
            refreshPodiumbox();
        })
    } else {
        userlistad[userIndex].podium = false;
        supabaseUpdate('spieler', ['podium'], [false], 'eq', 'id', id).then((data) => {
            body.classList.remove('waiting');
            if(data.length == 0) {
                userlistad[userIndex].podium = true;
                cb.checked = true;
                alert("Bei der Aktualisierung der Podium-Daten des Users ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu.\n\nSollte das Problem weiterhin bestehen, kontaktieren Sie bitte den Support (DER TOLLE TILMAN).")
            }
            refreshPodiumbox();
        })
    }
}



function refreshPodiumbox() {

    podiumList = userlistad.filter(user => user.podium == true);
    if (podiumList == "") {
        pbox.innerHTML = "<p>Es befindet sich noch kein User auf dem Podium.</p>"
    } else {
        
        pbox.innerHTML = `  <tr>
                                <th>Podium-User</th>
                            </tr>`;

        podiumList.sort(function (a, b) {return b.id - a.id});

        for(i=0; i<podiumList.length; i++) {
            if(podiumList[i].podium == true) {
                checked = "checked"
            } else {
                checked = ""
            }
            pbox.innerHTML += `<tr>
                                    <td>${podiumList[i].name}</td>
                                    <td>
                                        <label class="switch">
                                            <input class="switchinput" type="checkbox" onchange="toggle('${podiumList[i].id}', this)" ${checked}>
                                            <area class="switch slider"></area>
                                        </label>
                                    </td>
                                </tr>`
        }
    }
    refreshTable();
}


supabaseFetch('spieler', 'id, name, blocked, podium', "", "", "", 'id', true).then((data) => {
    for (let i = 0; i < data.length; i++) {
        userlistad.push(new Userad(data[i].id, data[i].name, data[i].blocked, data[i].podium));
    }
    refreshPodiumbox();
});


// Dummys
function createDummys(number) {

    for (let i = 0; i < number; i++) {
        // id=i+5000 damit die id nicht gleich einer id der "echten" in supabase von screen kreierten user ist
        userlistad.push(new Userad(i+5000, "DummyTEST"+i, null, false));
    }

}