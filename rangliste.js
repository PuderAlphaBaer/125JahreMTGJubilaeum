function generateRangliste() {
    const body = document.getElementsByTagName('body')[0];
    const tb1 = document.createElement('table');
    const tbHead = document.createElement('thead');
    const tbBody = document.createElement('tbody');
    const tbHeadRow = document.createElement('tr');
    const tbHeadCell1 = document.createElement('th');
    const tbHeadCell2 = document.createElement('th');
    const tbHeadCell3 = document.createElement('th');
    tbHeadCell1.innerHTML = "Rang";
    tbHeadCell2.innerHTML = "Name";
    tbHeadCell3.innerHTML = "Punkte";
    body.appendChild(tb1);
    tb1.appendChild(tbHead);
    tb1.appendChild(tbBody);
    tbHead.appendChild(tbHeadRow);
    tbHeadRow.appendChild(tbHeadCell1);
    tbHeadRow.appendChild(tbHeadCell2);
    tbHeadRow.appendChild(tbHeadCell3);
    tb1.style.border = "1px solid black";

    supabaseFetch('spieler', 'id, name, punktzahl', 'gt', 'punktzahl', -1, 'punktzahl', false).then((data) => {
        console.log(data)
        console.dir(data)
        for (let i = 0; i < data.length; i++) {
            const tbBodyRow = document.createElement('tr');
            const tbBodyCell1 = document.createElement('td');
            const tbBodyCell2 = document.createElement('td');
            const tbBodyCell3 = document.createElement('td');
            tbBodyCell1.innerHTML = i + 1;
            tbBodyCell2.innerHTML = data[i].name;
            tbBodyCell3.innerHTML = data[i].punktzahl;
            tbBody.appendChild(tbBodyRow);
            tbBodyRow.appendChild(tbBodyCell1);
            tbBodyRow.appendChild(tbBodyCell2);
            tbBodyRow.appendChild(tbBodyCell3);
            tbBodyRow.style.border = "1px solid black";
        }
    });

}
generateRangliste();