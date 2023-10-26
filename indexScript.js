const bt1 = document.getElementById('bt1');
const tb1 = document.getElementById('tb1');
var nickname;


bt1.addEventListener('click', nicknameuebermitteln());


function nicknameuebermitteln() {
    nickname = tb1.value;
}