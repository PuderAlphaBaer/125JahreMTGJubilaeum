class Frage {
    constructor(frage, a, b, c, d, loesung, zeit, img) {
      this.beginn = false;
      this.start = false;
      this.ende = false;
      this.auswertung = false;

      this.frage = frage;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.loesung = loesung;
      this.zeit = zeit;
      this.img = img;
    }
  }

const questions = [
  // Hier alle Fragen in richtiger Reinfolge auflisten

  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  
  new Frage("placeholder", "a", "a", "a", "a", "a", 0, false),
  new Frage("Haben Sie schon unsere Festschrift gekauft?", "Ja", "Nein, aber ich kaufe gleich am Ende eine", "", "", ["a", "b"], 10, false),
  new Frage("Wie viele Fenster hat unser Hauptschulgebäude?", "420", "690", "134", "208", "d", 10, false),
  //new Frage("Seit wann ist das MTG für Mädchen besuchbar?", "1899", "1978", "1990", "1902", "b", 10, false),
  //new Frage("In welchem Jahr wurde das Maria-Theresia-Gymnasium gegründet?", "1965", "1899", "1940", "2006", "a", 10, false),
  //new Frage("Was waren die letzten vier Direktoren in richtiger Reihenfolge?", "Frau Duschka, Herr Schairer, Frau Reiter, Herr Endres", "Frau Duschka, Frau Reiter, Herr Schairer, Herr Endres", "Frau Duschka, Frau Reiter, Herr Endres, Herr Schairer", "Frau Reiter, Herr Endres, Herr Schairer, Frau Duschka", "b", 10, false),
  //new Frage("Wie viele Liegestütze schafft Herr Markl?", "55", "21", "86", "201", "c", 10, false),
  //new Frage("Was war das profitabelste Unternehmen während der letzten Projekttage?", "Museumscafe", "Pizzabäckerei", "Talentshow", "3D Drucker", "a", 10, false),
  //new Frage("Welche Partei gewann die Juniorwahl 2023 am MTG?", "Bündnis 90/Die Grünen", "CSU", "AfD", "SPD", "a", 10, false),
  //new Frage("Wie viel Prozent des Schulgebäudes wurden beim Bombentreffer im April 1944 zerstört?", "20%", "0%", "90%", "70%", "d", 10, false),
  //new Frage("Wie oft besuchte die Namensgeberin Maria-Theresia die Schule?", "Keinmal", "Einmal", "Zweimal", "Dreimal", "b", 10, false)
];











//   // Chemie
//   new Frage("Was ist das chemische Symbol für Wasserstoff?", "H", "O", "N", "C", "a", 10, false),
//   new Frage("Was ist die Hauptkomponente von Erdgas?", "Methan", "Sauerstoff", "Stickstoff", "Helium", "a", 10, false),

//   // Biologie
//   new Frage("Was ist die kleinste Einheit des Lebens?", "Zelle", "Molekül", "Atom", "Elektron", "a", 10, false),
//   new Frage("Welches Organ produziert Insulin?", "Leber", "Bauchspeicheldrüse", "Niere", "Herz", "b", 10, false),

//   // Geographie
//   new Frage("Welcher ist der größte Kontinent der Erde?", "Asien", "Afrika", "Amerika", "Europa", "a", 10, false),
//   new Frage("Welcher Ozean ist der tiefste?", "Atlantik", "Indischer Ozean", "Pazifik", "Arktischer Ozean", "c", 10, false),

//   // Mischung
//   new Frage("Was ist die Hauptzutat in Glas?", "Sand", "Wasser", "Luft", "Erde", "a", 10, false),
//   new Frage("Welches Tier hat das größte Gehirn?", "Elefant", "Blauwal", "Mensch", "Delfin", "b", 10, false),
//   new Frage("Welcher ist der längste Fluss der Welt?", "Amazonas", "Nile", "Yangtze", "Mississippi", "b", 10, false),
//   new Frage("Welches Land hat die meisten Einwohner?", "China", "Indien", "USA", "Indonesien", "a", 10, false),  // new Frage("Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?", "Willy Brandt", "Helmut Kohl", "Konrad Adenauer", "Gerhard Schröder", "c", 2, false),
//   new Frage("Was ist die Quadratwurzel von 144?", "12", "14", "16", "18", "a", 10, false),
//   new Frage("Wer hat 'Faust' geschrieben?", "Friedrich Schiller", "Thomas Mann", "Johann Wolfgang von Goethe", "Bertolt Brecht", "c", 2, false),
//   new Frage("Wer war der erste Mensch im Weltraum?", "Herr Eschrich", "Yuri Gagarin", "Neil Armstrong", "Alexander Gerst",  "b", 15, false),
//   new Frage("Was ist der Sinus von 90 Grad?", "0", "1", "-1", "2", "b", 15, false),
//   new Frage("Welches der folgenden Bauten ist keines der sieben Weltwunder der Antike?", "Pyramiden von Gizeh", "Freiheitsstatue", "Koloss dvon Rhodos", "Zeusstatue", "b", 15, false),
//   new Frage("Wer hat die Mona Lisa gemalt?", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet", "c", 15, false),
//   new Frage("Was ist die Wurzel aus -1?", "es gibt keine Lösung", "1", "-1", "i", ["a","d"], 15, false),
//   new Frage("Was ist die Hauptstadt von Frankreich?", "Berlin", "London", "Madrid", "Paris", "d", 15, false),
//   new Frage("Was ist der längste Fluss der Welt?", "Amazonas", "Nil", "Jangtse", "Mississippi", "b", 15, false),
//   new Frage("Wer war der erste Mensch auf dem Mond?", "Yuri Gagarin", "Alexander Gerst", "Neil Armstrong", "Michael Collins", "c", 15, false),
//   new Frage("Was ist der größte Planet in unserem Sonnensystem?", "Erde", "Mars", "Jupiter", "Venus", "c", 15, false),
//   new Frage("Wer hat die Theorie der Evolution durch natürliche Selektion vorgeschlagen?", "Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Alexander Fleming", "a", 15, false),
//   new Frage("Was ist die Hauptstadt von Australien?", "Sydney", "Melbourne", "Canberra", "Neuseeland", "c", 15, false),
// ];


// Sprüche wenn Antwort richtig ist
const rworte = [
  // "Mach weiter so",
  // "Tilman hätte sich auch so entschieden",
  // "Weise Entscheidung",
  // "Tilman ist stolz auf dich",
  // "INTELLIGENZ",
  // "Bene bene bene",
  // "Ouich  ~Frau Fendt, immer",
  // "Gute Spieleinstellung",
  "Richtig! Ihr Wissen leuchtet heller als die Schulglocke am Morgen!",
  "Treffer! Sie haben den Jackpot des Wissen geknackt. Feiern Sie diesen Triumph!",
  "Korrekt! Ihre Antwort strahlt wie die Sonne über unserem Schulhof. Gut gemacht!",
  "Wow, Sie sind sicher einer von den ganz Schlauen!",
  "Wieso sind Sie nicht in unserem Hochbegabtenzweig?",
  "Haben wir da einen Streber im Publikum?",
  "Sie haben sicher schon die Festschrift gekauft!"
]

// Sprüche wenn Antwort falsch ist
const fworte = [
  // "Tilman hätte das besser gemacht",
  // "Tilman ist entäuscht von dir",
  // "Da ist noch Luft nach oben",
  // "Da gibt es noch Ausbaupotenzial",
  // "Wenn Frau Reiter das erfährt...",
  // "Du vergeudest dein Potenzial",
  // "Schlau ist etwas anderes",
  // "Mio weint bei deiner Antwort",
  // "Ein Stich in mein Lateinerherz  ~Frau Wächter 2018, oft genug",
  // "Cicero in sarcophago rotat",
  "Oh leider nicht ganz richtig. Aber keine Sorge beim nächsten Quiz sind Sie wieder am Start!",
  "Das war knapp daneben. Aber keine Sorge, in der Schule des Lebens gibt es immer eine zweite Chance!",
  "Ups, das war falsch. Aber wie sagt man so schön: Übung macht den Meister!",
  "Wir fragen uns, ob Sie in der Schule genauso falsche Antworten gegeben haben. Wahrscheinlich ja!",
  "Hätten Sie doch die Festschrift gekauft!",
  "Ab zum Nachsitzen"
]
const zwischenworte = [
  "Wir haben ihre Antwort. Bald erfahren Sie, ob Sie ein Quiz-Genie sind!",
  "Ihre Antwort wird geprüft. Gleich wissen Sie, ob Sie auf der Gewinnerseite stehen!",
  "Ihre Antwort wird von unseren klügsten Köpfen überprüft. Daumen drücken!",
  "Ein Expertenteam aus Lehrern, Schülern und einem geheimen Superhelden prüft Ihre Antwort.",
  "Während Ihre Antwort durch die Schulkorridore wandert, genießen wir einen Moment der Vorfreude.",
  "Lehrer prüfen ihre Antwort mit wissenschaftlicher Präzision",
  "Sicher nicht beim Nachbarn über die Schulter geäugt?"
]

// Bis zu welchem PLatz die Rangliste gehen soll
const ranglistenlimit = 20;


// Bei welcher Frage das Podium durchgewechselt werden soll
const nextPodium = [5];

const pretime = 6000;

// Wär die Mitte
//const nextPodium = (questions.length - 1)/2;



  
async function getQuestions() {
  let fragenData = await supabaseFetch('fragen', 'beginn, start, ende, auswertung')
  console.log(fragenData.length)
  console.log(questions.length)
  for (let i = 0; i < fragenData.length; i++) {
    questions[i].beginn = fragenData[i].beginn;
    questions[i].start = fragenData[i].start;
    questions[i].ende = fragenData[i].ende;
    questions[i].auswertung = fragenData[i].auswertung;
  }
}
getQuestions();



