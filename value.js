class Frage {
    constructor(frage, a, b, c, d, loesung, zeit) {
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
    }
  }

  // ID brauchen wir nicht, oder?

const pretime = 6000;


  const questions = [
    // Hier alle Fragen in richtiger Reinfolge auflisten

    // ----------------------- NICHT ANRÜHREN -----------------------
    // ----------------------- NICHT ANRÜHREN -----------------------
    // ----------------------- NICHT ANRÜHREN -----------------------
    // ----------------------- NICHT ANRÜHREN -----------------------
    // ----------------------- NICHT ANRÜHREN -----------------------
    
    new Frage("a", "a", "a", "a", "a", "a", 0),

    new Frage("Wer war der erste Mensch im Weltraum?", "Alexander Gerst", "Yuri Gagarin", "Neil Armstrong", "Herr Eschrich", "b", 8),

    new Frage("Carlotta ist die BESTE Testerin", "ist ja normal", "RICHTIG", "natuerlich", "ne", ['a', 'b', 'c'], 10),

    new Frage ("Olivia ist auch eine sehr tolle Testerin", "Ja", "Nein", "", "", "a", 10),

    new Frage ('Wann begann die Französische Revolution?', '1789', '1788', '1787', '1786', 'a', 10),

    new Frage ('Was heisst Sklave auf Latein?', 'Sklave', 'Sklavus', 'Servus', '', 'c', 10),

    new Frage ('Wann wurde die Bundesrepublik Deutschland gegründet?', '1945', '1946', '1947', '1948', 'd', 10),

    new Frage ('Wann wurde die DDR gegründet?', '1945', '1946', '1947', '1948', 'b', 10),

    new Frage ('Wann begann der 2. Weltkrieg?', '1938', '1939', '1940', '1941', 'b', 10),

    new Frage ('Wer war der erste Bundeskanzler der BRD?', 'Konrad Adenauer', 'Helmut Kohl', 'Angela Merkel', 'Otto von Bismarck', 'a', 10),

    new Frage ('Wer war der erste Reichskanzler des Deutschen Reiches?', 'Otfried Biscuits', 'Alice Weidel', 'Otto von Bismarck', '', 'c', 10),

    new Frage ('Wie viele Bytes sind in einem Kibibyte?', '1000', '1024', '1032', '1048', 'b', 20),

    new Frage ('Was ist die Wurzel aus 196?', '14', '13', '15', '35/2', 'a', 20),

    new Frage("Sind Tilman und Christian toll?", "Ja", "Nein", "", "", "a", 10),

    new Frage ('Wie viele Bundesländer hat Deutschland?', '15', '16', '17', '19', 'b', 10),

    new Frage ("Wohin gehe ich wenn ich Streit habe?", "Sanitäter", "Frau Bertram", "Umweltscouts", "Mediatoren", "d", 20),

    new Frage ('Was ist die Wurzel aus 196?', '14', '13', '15', '35/2', 'a', 20),

    new Frage("Sind Tilman und Christian toll?", "Ja", "Nein", "", "", "a", 10),

    new Frage ('Wie viele Bundesländer hat Deutschland?', '15', '16', '17', '19', 'b', 10),

    new Frage ("Wohin gehe ich wenn ich Streit habe?", "Sanitäter", "Frau Bertram", "Umweltscouts", "Mediatoren", "d", 20)

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
    "so gut wie Tilman?"
  ]
  


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



