class Frage {
    constructor(frage, a, b, c, d, loesung, zeit, beginn, start, ende) {
      this.beginn = beginn;
      this.start = start;
      this.ende = ende;
      this.frage = frage;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.loesung = loesung;
      this.zeit = zeit;
    }
  }

  // ID brauchen wir nicht, oder?

const pretime = 6000;


  const questions = [
    // Hier alle Fragen in richtiger Reinfolge auflisten

    // Unwichtig, kann weg glaub ich, mach du lieber sonst bin ich schuld
    new Frage("Spiel", "Spiel", "Spiel", "Spiel", "Spiel", "a", 5,  false, false, false),

    new Frage("Wer war der erste Mensch im Weltraum", "Alexander Gerst", "Yuri Gagarin", "Neil Armstrong", "Herr Eschrich", "b", 10, false, false, false),

    // Frage mit zwei Lösungen
    new Frage("Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", "d", 10, false, false, false),

    new Frage("Wie viele Lösungen in Kahoot mit Frau Weber", "1", "2", "3", "alle", ["a", "b", "c", "d"], 10, false, false, false),

    // Frage mit nur 3 Antwortmöglichkeiten
    // new Frage("Tilman", "gut", "besser", "am besten", "", "c", 10, 3, false, false, false),

    // Ja Nein Frage
    // new Frage("Christian ist ein Profi", "Ja", "Nein", "", "", "a", 10, 4, false, false, false),

    //new Frage("Carlotta ist die BESTE Testerin", "ist ja normal", "RICHTIG", "natuerlich", "ne", ['a', 'b', 'c'], 10, 5, false, false, false),

    //new Frage ("Luzia ist auch eine sehr tolle Testerin", "Ja", "Nein", "", "", "a", 10, 6, false, false, false),

    new Frage ('Was heisst Sklave auf Latein?', 'Sklave', 'Sklavus', 'Servus', 'Slave', 'c', 10, false, false, false),

    new Frage("Sonne", "grün", "rot", "blau", "gelb", "d", 5, 1, false, false, false),

    new Frage ('Wie viele Bytes sind in einem Kilobyte?', '1000', '1024', '1032', '1048', 'b', 10, false, false, false)

  ];

  // Sprüche wenn Antwort richtig ist
  const rworte = [
    "Mach weiter so",
    "Tilman hätte sich auch so entschieden",
    "Weise Entscheidung",
    "Tilman ist stolz auf dich",
    "INTELLIGENZ",
    "Bene bene bene",
    "Ouich  ~Frau Fendt, immer",
    "Gute Spieleinstellung"
  ]
  
  // Sprüche wenn Antwort falsch ist
  const fworte = [
    "Tilman hätte das besser gemacht",
    "Tilman ist entäuscht von dir",
    "Da ist noch Luft nach oben",
    "Da gibt es noch Ausbaupotentzial",
    "Wenn Frau Reiter das erfährt...",
    "Du vergeudest dein Potenzial",
    "Schlau ist etwas anderes",
    "Mio weint bei deiner Antwort",
    "Ein Stich in mein Lateinerherz  ~Frau Wächter 2018, oft genug",
    "Cicero in sarkophaco rotat"
  ]

  const zwischenworte = [
    "pure genius",
    "schlau?",
    "so gut wie Tilman?",
    "PURE GENIUS",
    "GENIUS PURE?",
    "PUUUUUUUUUURE GEEEEEENIUS"
  ]
  












// Hat hier nix zu suchen, übersetz mal value.js
async function getQuestions() {
  for (let i = 0; i < questions.length; i++) {
    let daten = await supabaseFetch('fragen', 'start', 'eq', 'id', i)
    questions[i].beginn = daten[0].beginn;
    questions[i].start = daten[0].start;
    questions[i].ende = daten[0].ende;
  }
  console.log('das sind die questions: ')
  console.log(questions)
  console.log('jetzt ist die Zeit: ')
}
getQuestions();


