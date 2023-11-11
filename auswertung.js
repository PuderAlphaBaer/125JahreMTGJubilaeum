const votebox = document.getElementById('votebox');
const vote = document.getElementById('vote');




function auswertung() {
    votebox.style.display = "block"




    supabaseFetch('fragen', 'avotes, bvotes, cvotes, dvotes', 'eq', 'id', actualquestionid, 'id', false).then((data) => {
        // Siehe alles https://www.w3schools.com/js/js_graphics_chartjs.asp
        const xValues = ["A", "B", "C", "D"];
        const yValues = [data[0].avotes, data[0].bvotes, data[0].cvotes, data[0].dvotes];
        const barColors = ["red", "yellow","green","blue"];
        
        new Chart("vote", {
          type: "bar",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: barColors,
              data: yValues
            }]
          },
          options: {
            legend: {display: false},
            title: {
              display: false,
              text: "Verteilung"
            }
          }
        });
    });

};