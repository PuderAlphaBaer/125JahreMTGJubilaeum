
// Konstruktor für Multiple Choice Fragen
class MCFrage {
    constructor(frage, a, b, c, d, loesung) {
      this.frage = frage;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.loesung = loesung;
    }
  }

  // Konstruktor für Ja Nein Fragen
  class YNFrage {
    constructor(frage, y, n, loesung) {
        this.frage = frage;
        this.y = y;
        this.n = n;
        this.loesung = loesung;
    }
  }

  let questions = [
    // Hier alle Fragen in richtiger Reinfolge auflisten

    // Normale Frage 
    new MCFrage("Sonne", "rot", "gelb", "grün", "blau", "b"),

    // Frage mit zwei Lösungen
    new MCFrage("Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", ["d", "a"]),

    // Frage mit nur 3 Antwortmöglichkeiten
    new MCFrage("Tilman", "gut", "besser", "am besten", "", "c"),

    // Ja Nein Frage
    new YNFrage("Christian ist ein Profi", "Ja", "Nein", "y"),
  ];



  // aktuelle Frage:
  // questions[questionid-1]
  // kann mit .a , .b , .loesung usw stehen

  // fragentyp:
  // questions[questionid-1].constructor.name