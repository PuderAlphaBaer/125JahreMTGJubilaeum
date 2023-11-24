const checkIfQuestionStarted = async (questionId) => {
    const data = await supabaseFetch('fragen', 'start', 'eq', 'id', questionId);
    start = await data[0].start;
    if (start>0) {
        console.log('Frage '+questionId+' gestartet um '+milliUTCToLocal(start));
        return true;
    }
}
async function ligma() {
    const start2 = await checkIfQuestionStarted(2);
    const start1 = await checkIfQuestionStarted(1);
    const start3 = await checkIfQuestionStarted(3);
    if (start1==true) {
        frage1.innerHTML = 'Frage 1 gestartet';
    }
    if (start2==true) {
        frage2.innerHTML = 'Frage 2 gestartet';
    }
    if (start3==true) {
        frage3.innerHTML = 'Frage 3 gestartet';
    }
}
// ligma();

function milliUTC() {
    return jetzt().getTime() + (jetzt().getTimezoneOffset() * 60000);
}

// frage1.addEventListener('click', function() {
//     if (checkIfQuestionStarted(1)==true) {
//         return;
//     }
//     supabaseUpdate('fragen', ['start'], [milliUTC()], 'eq', 'id', 1);
//     alert('Frage 1 gestartet');
// })



function jetzt() {
    return new Date()
}

function milliUTCToLocal(a) {
    const milliLocal = new Date(a-(jetzt().getTimezoneOffset() * 60000));
    return milliLocal.toLocaleString();
}