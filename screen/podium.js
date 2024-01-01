

// function change() {
//     // Macht eine extra liste mit allen Podiumsusern
//     podiumUser = userlist.filter(user => user.podium == true);

//     // Sortiert die Liste nach Rang, der aufsteigend, daher der Schlechteste zuerst, damit später wir nicht immer den 5. und 4. entfernen müssen sondern nur den 1. und 2., damit ist die Anzahl an Podiumsusern variierbar
//     podiumUser.sort((a, b) => (a.podiumPosition > b.podiumPosition) ? 1 : -1);

//     // Findet die beiden schlechtesten User vom Podium in der Userlist und setzt Podiumstatus auf false
//     userindex = userlist.findIndex((obj => obj.id == podiumUser[0].id));
//     userlist[userindex].podium = false;
//     alert(userlist[userindex].name + " genießt nun wieder den Abend im Publikum");
//     userindex = userlist.findIndex((obj => obj.id == podiumUser[1].id));
//     userlist[userindex].podium = false;
//     alert(userlist[userindex].name + " darf die Bühne nun verlassen");


// }







