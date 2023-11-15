const frage1 = document.getElementById('frage1');
const frage2 = document.getElementById('frage2');
const frage3 = document.getElementById('frage3');

//async function that checks if a question already started
// const checkIfQuestionStarted = async (questionId) => {
//     await supabaseFetch('fragen', 'start', 'eq', 'id', questionId)
//     console.log('data', data)
// }

frage1.addEventListener('click', function() {
  alert('Frage 1');
})

function milliUTC() {
    return jetzt().getTime() + (jetzt().getTimezoneOffset() * 60000);
}

function jetzt() {
    return new Date()
}

function milliUTCToLocal(a) {
    const milliLocal = new Date(a-(jetzt().getTimezoneOffset() * 60000));
    return milliLocal.toLocaleString();
}