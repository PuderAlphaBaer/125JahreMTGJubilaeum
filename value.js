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
    new Frage("", "", "", "", "", "", 0,  false, false, false),

    new Frage("Wer war der erste Mensch im Weltraum?", "Alexander Gerst", "Yuri Gagarin", "Neil Armstrong", "Herr Eschrich", "b", 20, false, false, false),

    // new Frage("Wie viele Lösungen in Kahoot Quiz mit Frau Weber?", "1", "2", "3", "alle", ["a", "b", "c", "d"], 10, false, false, false),

    new Frage("Carlotta ist die BESTE Testerin", "ist ja normal", "RICHTIG", "natuerlich", "ne", ['a', 'b', 'c'], 10, 5, false, false, false),

    new Frage ("Luzia ist auch eine sehr tolle Testerin", "Ja", "Nein", "", "", "a", 10, 6, false, false, false),

    new Frage ('Wann begann die Französische Revolution?', '1789', '1788', '1787', '1786', 'a', 10, 8, false, false, false),

    new Frage ('Was heisst Sklave auf Latein?', 'Sklave', 'Sklavus', 'Servus', '', 'c', 10, false, false, false),

    // new Frage("Sonne", "grün", "rot", "blau", "gelb", "d", 5, 1, false, false, false),
    new Frage ('Wann wurde die Bundesrepublik Deutschland gegründet?', '1945', '1946', '1947', '1948', 'd', 10, 12, false, false, false),

    new Frage ('Wann wurde die DDR gegründet?', '1945', '1946', '1947', '1948', 'b', 10, 13, false, false, false),

    new Frage ('Wann begann der 2. Weltkrieg?', '1938', '1939', '1940', '1941', 'b', 10, 15, false, false, false),

    new Frage ('Wer war der erste Bundeskanzler der BRD?', 'Konrad Adenauer', 'Helmut Kohl', 'Angela Merkel', 'Otto von Bismarck', 'a', 10, 16, false, false, false),

    new Frage ('Wer war der erste Reichskanzler des Deutschen Reiches?', 'Otfried Biscuits', 'Alice Weidel', '', 'Otto von Bismarck', 'd', 10, 17, false, false, false),

    new Frage ('Wie viele Bytes sind in einem Kibibyte?', '1000', '1024', '1032', '1048', 'b', 20, false, false, false),

    new Frage ('Was ist die Wurzel aus 196?', '14', '13', '15', '35/2', 'a', 20, false, false, false),

    new Frage("Sind Tilman und Christian toll?", "Ja", "Nein", "", "", "a", 10, false, false, false),

    new Frage ('Wie viele Bundesländer hat Deutschland?', '15', '16', '17', '19', 'b', 10, false, false, false),

    new Frage ("Wohin gehe ich wenn ich Streit habe?", "Sanitäter", "Frau Bertram", "Umweltscouts", "Mediatoren", "d", 20, false, false, false),

    // new Frage ("a² + b² = c² ist...", "die Mitternachtsformel", "eine binomische Formel", "der Satz des Phytagoras", "der Satz des Thales", "c", 20, false, false, false)


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
    "Da gibt es noch Ausbaupotenzial",
    "Wenn Frau Reiter das erfährt...",
    "Du vergeudest dein Potenzial",
    "Schlau ist etwas anderes",
    "Mio weint bei deiner Antwort",
    "Ein Stich in mein Lateinerherz  ~Frau Wächter 2018, oft genug",
    "Cicero in sarcophago rotat"
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


