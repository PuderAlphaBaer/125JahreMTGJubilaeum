const rangliste = document.getElementById('rangliste');
const podiumbox = document.getElementById('podiumbox');
const ubox = document.getElementById('ubox');
const togglebt = document.getElementById('togglebtn');
const pbox = document.getElementById('pbox');
const body = document.getElementById('body');
let repbox = "";




class User {
    constructor(name, blocked, podium) {
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
   
        userlistad.push(new User(data.name, data.blocked, data.podium));
        console.log("%c Neuer User hinzugefügt", "color: red")

    refreshPodiumbox();
}




let ban;

function report(uname) {
    userIndex = userlistad.findIndex((obj => obj.name == uname));
    if(userlistad[userIndex].podium == true) {
        podban = confirm(`Der User "${uname}" befindet sich auf dem Podium, wollen Sie ihn trotzdem sperren und vom Podium entfernen?`);
        if (podban == true) {
            ban = prompt(`Wofür wollen Sie den User "${uname}" sperren?`,  "Anstößiger Benutzername");
            if ((ban )== null || ban == "") {
                console.log("bann abgebrochen");
            } else {
                supabaseUpdate("spieler", ["blocked", "punkte", "streak"], [ban, -1, 0], "eq",  "name", uname)
                userlistad[userIndex].blocked = ban;
                userlistad[userIndex].podium = false;
                refreshPodiumbox();
        }
        } else {
            console.log("bann abgebrochen");
        }
    } else {
        ban = prompt(`Wofür wollen Sie den User "${uname}" sperren?`,  "Anstößiger Benutzername");
        if ((ban )== null || ban == "") {
            console.log("bann abgebrochen");
        } else {
                supabaseUpdate("spieler", ["blocked", "punkte", "streak"], [ban, -1, 0], "eq",  "name", uname)
                userlistad[userIndex].blocked = ban;
                userlistad[userIndex].podium = false;
                refreshPodiumbox();
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
        specificUser.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

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
                                            <input class="switchinput" type="checkbox" onchange="toggle('${specificUser[i].name}', this)" ${checked}>
                                            <area class="switch slider"></area>
                                        </label>
                                    </td>
                                    <td class="ureport">
                                        <div class="report" onclick="report('${specificUser[i].name}')">Sperren</div>
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





async function toggle(name, cb) {
    await addWaitingClass();     
    // refresh UI
    await new Promise(resolve => requestAnimationFrame(resolve));
    userIndex = userlistad.findIndex((obj => obj.name == name));
    if(cb.checked == true) {
        userlistad[userIndex].podium = true;
        supabaseUpdate('spieler', 'podium', true, 'eq', 'name', name).then(() => {
            body.classList.remove('waiting');
            refreshPodiumbox();
        })
    } else {
        userlistad[userIndex].podium = false;
        supabaseUpdate('spieler', 'podium', false, 'eq', 'name', name).then(() => {
            body.classList.remove('waiting');
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

        podiumList.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
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
                                            <input class="switchinput" type="checkbox" onchange="toggle('${podiumList[i].name}', this)" ${checked}>
                                            <area class="switch slider"></area>
                                        </label>
                                    </td>
                                </tr>`
        }
    }
    refreshTable();
}

function createDummies() {
userlistad.push(new User("Emilia", null));
userlistad.push(new User("Hannah", null));
userlistad.push(new User("Mia", null));
userlistad.push(new User("Emma", null));
userlistad.push(new User("Sophia", null));
userlistad.push(new User("Mila", null));
userlistad.push(new User("Lina", null));
userlistad.push(new User("Ella", null));
userlistad.push(new User("Lea", null));
userlistad.push(new User("Marie", null));
userlistad.push(new User("Clara", null));
userlistad.push(new User("Leni", null));
userlistad.push(new User("Lia", null));
userlistad.push(new User("Leonie", null));
userlistad.push(new User("Emily", null));
userlistad.push(new User("Mathilda", null));
userlistad.push(new User("Ida", null));
userlistad.push(new User("Anna", null));
userlistad.push(new User("Frieda", null));
userlistad.push(new User("Amelie", null));
userlistad.push(new User("Luisa", null));
userlistad.push(new User("Lilly", null));
userlistad.push(new User("Maja", null));
userlistad.push(new User("Charlotte", null));
userlistad.push(new User("Lena", null));
userlistad.push(new User("Sophie", null));
userlistad.push(new User("Johanna", null));
userlistad.push(new User("Lara", null));
userlistad.push(new User("Nele", null));
userlistad.push(new User("Nora", null));
userlistad.push(new User("Mira", null));
userlistad.push(new User("Sarah", null));
userlistad.push(new User("Lotta", null));
userlistad.push(new User("Juna", null));
userlistad.push(new User("Laura", null));
userlistad.push(new User("Elisa", null));
userlistad.push(new User("Paula", null));
userlistad.push(new User("Tilda", null));
userlistad.push(new User("Malia", null));
userlistad.push(new User("Thea", null));
userlistad.push(new User("Maria", null));
userlistad.push(new User("Romy", null));
userlistad.push(new User("Melina", null));
userlistad.push(new User("Alina", null));
userlistad.push(new User("Marlene", null));
userlistad.push(new User("Mara", null));
userlistad.push(new User("Elena", null));
userlistad.push(new User("Helena", null));
userlistad.push(new User("Victoria", null));
userlistad.push(new User("Carla", null));
userlistad.push(new User("Luna", null));
userlistad.push(new User("Antonia", null));
userlistad.push(new User("Isabella", null));
userlistad.push(new User("Merle", null));
userlistad.push(new User("Elina", null));
userlistad.push(new User("Zoe", null));
userlistad.push(new User("Eva", null));
userlistad.push(new User("Amira", null));
userlistad.push(new User("Julia", null));
userlistad.push(new User("Fiona", null));
userlistad.push(new User("Luise", null));
userlistad.push(new User("Hailey", null));
userlistad.push(new User("Paulina", null));
userlistad.push(new User("Martha", null));
userlistad.push(new User("Finja", null));
userlistad.push(new User("Josephine", null));
userlistad.push(new User("Lisa", null));
userlistad.push(new User("Pia", null));
userlistad.push(new User("Elli", null));
userlistad.push(new User("Olivia", null));
userlistad.push(new User("Amalia", null));
userlistad.push(new User("Valentina", null));
userlistad.push(new User("Jana", null));
userlistad.push(new User("Anni", null));

}


supabaseFetch('spieler', 'name, blocked, podium', "", "", "", 'name', false).then((data) => {
    for (let i = 0; i < data.length; i++) {
        userlistad.push(new User(data[i].name, data[i].blocked, data[i].podium));
    }
    refreshPodiumbox();
});



createDummies();
