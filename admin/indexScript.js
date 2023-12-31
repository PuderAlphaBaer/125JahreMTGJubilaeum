const rangliste = document.getElementById('rangliste');
const podiumbox = document.getElementById('podiumbox');
const ubox = document.getElementById('ubox');
const togglebt = document.getElementById('togglebtn');
const pbox = document.getElementById('pbox');
let repbox = "";




class User {
    constructor(name, blocked, podium) {
        this.name = name;
        this.blocked = blocked;
        this.podium = false;
    }
}


userlistad = [

];



// addUser() ist die Funktion die mit data als value gecallt werden muss bei changes, der Rest klappt
function addUser(data) {
    for (let i = 0; i < data.length; i++) {
        userlistad.push(new User(data[i].name, data[i].blocked));
        console.log("%c Neuer User hinzugefügt", "color: red")
    }
    createTable();
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
                createTable();
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
                createTable();
        }
    }
};


const search = document.getElementById("search");

search.addEventListener('input', createTable)

function createTable() {
    console.log("createTable");
    check = search.value;
    specificUser = userlistad.filter(user => user.name.toLowerCase().startsWith(check, 0) == true);
    if (specificUser == "") {
        ubox.innerHTML = "<p>Es wurde kein User mit einem Ihrer Suche entsprechenden Namen gefunden.</p>"
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

        ubox.innerHTML = `  <tr>
                                <th>Name</th>
                                <th>Podium</th>
                            </tr>`
        for(let i=0; i<specificUser.length; i++) {
            if(specificUser[i].podium == true) {
                checked = "checked"
            } else {
                checked = ""
            }
            if (specificUser[i].blocked == null) {
                repbox = `
                                    <td class="udata">
                                        <label class="switch">
                                            <input class="switchinput" type="checkbox" onchange="toggleSwitch('${specificUser[i].name}', this)" ${checked}>
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
}





function toggleSwitch(name, cb) {
    console.log("toggleSwitch");
    userIndex = userlistad.findIndex((obj => obj.name == name));
    if(cb.checked == true) {
        userlistad[userIndex].podium = true;
        supabaseInsert("podium", ["name"], [name]).then(() => {
            document.body.style.cursor = "default";
            refreshPodiumbox();
        })
    } else {
        userlistad[userIndex].podium = false;
        supabaseDelete("podium", "eq", "name", name).then(() => {
            document.body.style.cursor = "default";
            refreshPodiumbox();
        })
    }
    document.body.style.cursor = "wait";
}



function refreshPodiumbox() {
    console.log("refreshpodiumbox");
    pbox.innerHTML = `  <tr>
                            <th>Podium-User</th>
                        </tr>`;

    podiumList = userlistad.filter(user => user.podium == true);
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
                                        <input class="switchinput" type="checkbox" onchange="toggleSwitch('${podiumList[i].name}', this)" ${checked}>
                                        <area class="switch slider"></area>
                                    </label>
                                </td>
                            </tr>`
    }
    createTable();
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
userlistad.push(new User("Pauline", null));
userlistad.push(new User("Rosalie", null));
userlistad.push(new User("Carlotta", null));
userlistad.push(new User("Theresa", null));
userlistad.push(new User("Mina", null));
userlistad.push(new User("Liya", null));
userlistad.push(new User("Maila", null));
userlistad.push(new User("Ronja", null));
userlistad.push(new User("Isabell", null));
userlistad.push(new User("Aaliyah", null));
userlistad.push(new User("Chiara", null));
userlistad.push(new User("Lotte", null));
userlistad.push(new User("Leyla", null));
userlistad.push(new User("Malea", null));
userlistad.push(new User("Malina", null));
userlistad.push(new User("Aurelia", null));
userlistad.push(new User("Elisabeth", null));
userlistad.push(new User("Amelia", null));
userlistad.push(new User("Alma", null));
userlistad.push(new User("Jasmin", null));
userlistad.push(new User("Lucy", null));
userlistad.push(new User("Linda", null));
userlistad.push(new User("Katharina", null));
userlistad.push(new User("Liana", null));
userlistad.push(new User("Magdalena", null));
userlistad.push(new User("Ayla", null));
userlistad.push(new User("Milena", null));
userlistad.push(new User("Emmi", null));
userlistad.push(new User("Nina", null));
userlistad.push(new User("Malou", null));
userlistad.push(new User("Ela", null));
userlistad.push(new User("Ava", null));
userlistad.push(new User("Luana", null));
userlistad.push(new User("Stella", null));
userlistad.push(new User("Melissa", null));
userlistad.push(new User("Annika", null));
userlistad.push(new User("Emely", null));
userlistad.push(new User("Jule", null));
userlistad.push(new User("Freya", null));
userlistad.push(new User("Anastasia", null));
userlistad.push(new User("Marla", null));
userlistad.push(new User("Liv", null));
userlistad.push(new User("Amy", null));
userlistad.push(new User("Rosa", null));
userlistad.push(new User("Miriam", null));
userlistad.push(new User("Yara", null));
userlistad.push(new User("Arya", null));
userlistad.push(new User("Diana", null));
userlistad.push(new User("Zoey", null));
userlistad.push(new User("Lene", null));
userlistad.push(new User("Livia", null));
userlistad.push(new User("Lynn", null));
userlistad.push(new User("Alya", null));
userlistad.push(new User("Kaja", null));
userlistad.push(new User("Alea", null));
userlistad.push(new User("Mariella", null));
userlistad.push(new User("Edda", null));
userlistad.push(new User("Kira", null));
userlistad.push(new User("Layla", null));
userlistad.push(new User("Mariam", null));
userlistad.push(new User("Annabell", null));
userlistad.push(new User("Ylvie", null));
userlistad.push(new User("Elif", null));
userlistad.push(new User("Helene", null));
userlistad.push(new User("Amina", null));
userlistad.push(new User("Lucia", null));
userlistad.push(new User("Milana", null));
userlistad.push(new User("Ariana", null));
userlistad.push(new User("Aylin", null));
userlistad.push(new User("Elise", null));
userlistad.push(new User("Cleo", null));
userlistad.push(new User("Jette", null));
userlistad.push(new User("Elea", null));
userlistad.push(new User("Alessia", null));
userlistad.push(new User("Zeynep", null));
userlistad.push(new User("Linnea", null));
userlistad.push(new User("Marleen", null));
userlistad.push(new User("Mathea", null));
userlistad.push(new User("Milla", null));
userlistad.push(new User("Aurora", null));
userlistad.push(new User("Selina", null));
userlistad.push(new User("Ruby", null));
userlistad.push(new User("Alicia", null));
userlistad.push(new User("Mona", null));
userlistad.push(new User("Elin", null));
userlistad.push(new User("Eliana", null));
userlistad.push(new User("Evelyn", null));
userlistad.push(new User("Medina", null));
userlistad.push(new User("Nika", null));
userlistad.push(new User("Dalia", null));
userlistad.push(new User("Nela", null));
userlistad.push(new User("Alisa", null));
userlistad.push(new User("Liliana", null));
userlistad.push(new User("Aleyna", null));
userlistad.push(new User("Alexandra", null));
userlistad.push(new User("Franziska", null));
userlistad.push(new User("Lou", null));
userlistad.push(new User("Alice", null));
userlistad.push(new User("Alissa", null));
userlistad.push(new User("Lana", null));
userlistad.push(new User("Cataleya", null));
userlistad.push(new User("Tessa", null));
userlistad.push(new User("Azra", null));
userlistad.push(new User("Carolina", null));
userlistad.push(new User("Daria", null));
userlistad.push(new User("Enna", null));
userlistad.push(new User("Sina", null));
userlistad.push(new User("Jonna", null));
userlistad.push(new User("Hilda", null));
userlistad.push(new User("Leana", null));
userlistad.push(new User("Nala", null));
userlistad.push(new User("Rebecca", null));
userlistad.push(new User("Thalia", null));
userlistad.push(new User("Bella", null));
userlistad.push(new User("Noemi", null));
userlistad.push(new User("Vivien", null));
userlistad.push(new User("Alva", null));
userlistad.push(new User("Meryem", null));
userlistad.push(new User("Nisa", null));
userlistad.push(new User("Amilia", null));
userlistad.push(new User("Valeria", null));
userlistad.push(new User("Lorena", null));
userlistad.push(new User("Flora", null));
userlistad.push(new User("Jesse", null));
userlistad.push(new User("Keanu", null));
userlistad.push(new User("Kuno", null));
userlistad.push(new User("Rune", null));
userlistad.push(new User("Semih", null));
userlistad.push(new User("Tamino", null));
userlistad.push(new User("Arik", null));
userlistad.push(new User("Damien", null));
userlistad.push(new User("Giuliano", null));
userlistad.push(new User("Giuseppe", null));
userlistad.push(new User("Jordan", null));
userlistad.push(new User("Leno", null));
userlistad.push(new User("Levian", null));
userlistad.push(new User("Mete", null));
userlistad.push(new User("Taylan", null));
userlistad.push(new User("Taylor", null));
userlistad.push(new User("Veit", null));
userlistad.push(new User("Zeyd", null));
userlistad.push(new User("Abel", null));
userlistad.push(new User("Adnan", null));
userlistad.push(new User("Berkay", null));
userlistad.push(new User("Caleb", null));
userlistad.push(new User("Edwin", null));
userlistad.push(new User("Eray", null));
userlistad.push(new User("Evan", null));
userlistad.push(new User("Konstantinos", null));
userlistad.push(new User("Mikael", null));
userlistad.push(new User("Otis", null));
userlistad.push(new User("Rocco", null));
userlistad.push(new User("Taavi", null));
userlistad.push(new User("Wim", null));
userlistad.push(new User("Alexandru", "Anstößiger Benutzername"));
userlistad.push(new User("Ansgar", null));
userlistad.push(new User("Aslan", null));
userlistad.push(new User("Aurel", null));
userlistad.push(new User("Davin", null));
userlistad.push(new User("Dian", null));
userlistad.push(new User("Edis", null));
userlistad.push(new User("Ianis", null));
userlistad.push(new User("Maurice", null));
userlistad.push(new User("Nikodem", null));
userlistad.push(new User("Nikola", null));
userlistad.push(new User("Ricardo", null));
userlistad.push(new User("Tilman", null));
userlistad.push(new User("Alexandros", null));
userlistad.push(new User("Ammar", null));
userlistad.push(new User("Andrej", null));
userlistad.push(new User("Arda", null));
userlistad.push(new User("Johnny", null));
userlistad.push(new User("Kerim", null));
userlistad.push(new User("Logan", null));
userlistad.push(new User("Marek", null));
userlistad.push(new User("Marinus", null));
userlistad.push(new User("Nathaniel", null));
userlistad.push(new User("Willem", null));
userlistad.push(new User("Zain", null));
userlistad.push(new User("Angelo", null));
userlistad.push(new User("Bent", null));
userlistad.push(new User("Cosmo", null));
userlistad.push(new User("Emmanuel", null));
userlistad.push(new User("Christian", null));

}


async function start() {
    await supabaseFetch("podium", "name", "", "", "", "name", true).then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            userIndex = userlistad.findIndex((obj => obj.name == data[i].name));
            userlistad[userIndex].podium = true;
        }
    });
    refreshPodiumbox();
}
createDummies();
start();



