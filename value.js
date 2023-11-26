class Frage {
    constructor(frage, a, b, c, d, loesung, zeit, id, beginn, start, ende) {
      this.beginn = beginn;
      this.start = start;
      this.ende = ende;
      this.id = id;
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
    new Frage("Spiel", "Spiel", "Spiel", "Spiel", "Spiel", "a", 5, 0, false, false, false),
    // Normale Frage 
    new Frage("Sonne", "rot", "gelb", "grün", "blau", "b", 5, 1, false, false, false),

    // Frage mit zwei Lösungen
    new Frage("Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", ["d", "a"], 10, 2, false, false, false),

    // Frage mit nur 3 Antwortmöglichkeiten
    new Frage("Tilman", "gut", "besser", "am besten", "", "c", 10, 3, false, false, false),

    // Ja Nein Frage
    new Frage("Christian ist ein Profi", "Ja", "Nein", "", "", "a", 10, 4, false, false, false),

    new Frage("Carlotta ist die BESTE Testerin", "ist ja normal", "RICHTIG", "natuerlich", "ne", ['a', 'b', 'c'], 10, 5, false, false, false),

    new Frage ("Luzia ist auch eine sehr tolle Testerin", "Ja", "Nein", "", "", "a", 10, 6, false, false, false),

    new Frage ('Was heisst Sklave auf Latein?', 'Sklave', 'Sklavus', 'Servus', 'Moinmoin', 'c', 10, 7, false, false, false),

    new Frage ('Wann begann die Französische Revolution?', '1789', '1788', '1787', '1786', 'a', 10, 8, false, false, false),

    new Frage ('Wie viele Bundesländer hat Deutschland?', '16', '17', '18', '19', 'a', 10, 9, false, false, false),

    new Frage ('Wie viele Bundesländer hat Österreich?', '8', '9', '10', '11', 'b', 10, 10, false, false, false),

    new Frage ('Wie viele Bundesländer hat die Schweiz?', '23', '24', '25', '26', 'c', 10, 11, false, false, false),

    new Frage ('Wann wurde die Bundesrepublik Deutschland gegründet?', '1945', '1946', '1947', '1948', 'd', 10, 12, false, false, false),

    new Frage ('Wann wurde die DDR gegründet?', '1945', '1946', '1947', '1948', 'b', 10, 13, false, false, false),

    new Frage ('Wann wurde die BRD gegründet?', '1945', '1946', '1947', '1948', 'd', 10, 14, false, false, false),

    new Frage ('Wann begann der 2. Weltkrieg?', '1938', '1939', '1940', '1941', 'b', 10, 15, false, false, false),

    new Frage ('Wer war der erste Bundeskanzler der BRD?', 'Konrad Adenauer', 'Helmut Kohl', 'Angela Merkel', 'Otto von Bismarck', 'a', 10, 16, false, false, false),

    new Frage ('Wer war der erste Reichskanzler des Deutschen Reiches?', 'Otfried Biscuits', 'Alice Weidel', 'Angela Merkel', 'Otto von Bismarck', 'd', 10, 17, false, false, false),
    
    new Frage ('Wie viele Bits sind in einem Byte?', '4', '8', '16', '32', 'b', 10, 18, false, false, false),

    new Frage ('Wie viele Bytes sind in einem Kilobyte?', '1000', '1024', '1032', '1048', 'b', 10, 19, false, false, false)

  ];

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




  // Sprüche wenn Antwort richtig ist
  const rworte = [
    "Mach weiter so",
    "Tilman hätte sich auch so entschieden",
    "Weise Entscheidung",
    "Tilman ist stolz auf dich",
    "INTELLIGENZ",
    "Bene bene bene",
    "Ouich  ~Frau Fendt, immer",
    "Gute Spieleinstellung",
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
    "Cicero in sarkophaco rotat", 
    "sklavus  ~Maya, Lateinstunde mit Herr Waschbüsch",
  ]

  const zwischenworte = [
    "pure genius",
    "schlau?",
    "so gut wie Tilman?",
    "PURE GENIUS",
    "GENIUS PURE"
  ]
  