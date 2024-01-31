
function addDummies(number) {
    for (let i = 0; i < number; i++) {
        // insert dummies with name and random points and streak and random votes a or b and random podium true or false
        supabaseInsert("spieler", ["name", "punkte", "streak", "vote", "podium"], ["Dummy"+[i+1], Math.floor(Math.random() * 1000), Math.floor(Math.random() * 10), "b", true])

        console.log("Insert Dummy")
    }
}

Math.random() < 0.5


async function resetFragen() {
    await supabaseDeleteAll('fragen');
    for (let i = 0; i < questions.length; i++) {
        supabaseInsert("fragen", ["id"], [i])
    }
}

function noResetFragen() {
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


confirm("Sollen alle Spieler zurückgesezt werden?") ? supabaseDeleteAll('spieler') : console.log("Spieler nicht zurückgesetzt");
confirm("Es wird bei Frage 1 gestartet.\n\nWenn sie Abbrechen drücken, wird das letzte gespielte Quiz forgesetzt.") ? resetFragen() : noResetFragen();
