
function addDummies(number) {
    for (let i = 0; i < number; i++) {
        // insert dummies with name and random points and streak and random votes a or b and random podium true or false
        supabaseInsert("spieler", ["name", "punkte", "streak", "vote", "podium"], ["Dummy"+[i+1], Math.floor(Math.random() * 1000), Math.floor(Math.random() * 10), "b", true])

        console.log("Insert Dummy")
    }
}

Math.random() < 0.5


async function reset() {
    await supabaseDeleteAll('spieler');
    await supabaseDeleteAll('fragen');
    for (let i = 0; i < questions.length; i++) {
        supabaseInsert("fragen", ["id"], [i])
    }
    addDummies(0);  
}

function noReset() {
    supabaseFetch('fragen', 'beginn, id', '', '', '', 'id', true).then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].beginn==true) {
                activequestionid = data[i].id;
                console.log(activequestionid)
            }
        }
        // Wenn letzte Frage schon gespiel wurde
        if(activequestionid==questions.length-1) {
            ende();
        }
    })
}

async function ende() {
    await phase3();
    phase4();
}


confirm("Die Spieler werden nun zurückgesetzt, es wird bei Frage 1 gestartet.\n\nWenn sie Abbrechen drücken, wird das letzte gespielte Quiz forgesetzt.") ? reset() : noReset();
