
// Konstruktor für Multiple Choice Fragen
class Frage {
    constructor(frage, a, b, c, d, loesung, punkte) {
      this.frage = frage;
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.loesung = loesung;
      this.punkte = punkte;
    }
  }

  let questions = [
    // Hier alle Fragen in richtiger Reinfolge auflisten

    // Normale Frage 
    new Frage("Sonne", "rot", "gelb", "grün", "blau", "b", ''),

    // Frage mit zwei Lösungen
    new Frage("Liegestütze", "Herr Krois", "Herr Pleger", "Frau Ager", "Herr Markl", ["d", "a"], ''),

    // Frage mit nur 3 Antwortmöglichkeiten
    new Frage("Tilman", "gut", "besser", "am besten", "", "c", ''),

    // Ja Nein Frage
    new Frage("Christian ist ein Profi", "Ja", "Nein", "", "", "a", ''),
  ];



  // aktuelle Frage:
  // questions[questionid-1]
  // kann mit .a , .b , .loesung usw stehen


