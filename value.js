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

  // ID brauchen wir nicht, oder?

const pretime = 1000;


const questions = [
  // Hier alle Fragen in richtiger Reinfolge auflisten

  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  // ----------------------- NICHT ANRÜHREN -----------------------
  
  new Frage("a", "a", "a", "a", "a", "a", 0, false),



  new Frage("Wer hat die Relativitätstheorie formuliert?", "Isaac Newton", "Albert Einstein", "", "", "b", 5, false),
  new Frage("Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?", "Willy Brandt", "Helmut Kohl", "Konrad Adenauer", "Gerhard Schröder", "c", 5, false),
  new Frage("Was ist die Quadratwurzel von 144?", "12", "14", "16", "18", "a", 5, false),
  new Frage("Wer hat 'Faust' geschrieben?", "Friedrich Schiller", "Thomas Mann", "Johann Wolfgang von Goethe", "Bertolt Brecht", "c", 5, false),
  // new Frage("Wer war der erste Mensch im Weltraum?", "Herr Eschrich", "Yuri Gagarin", "Neil Armstrong", "Alexander Gerst",  "b", 15, false),
  // new Frage("Was ist der Sinus von 90 Grad?", "0", "1", "-1", "2", "b", 15, false),
  // new Frage("Welches der folgenden Bauten ist keines der sieben Weltwunder der Antike?", "Pyramiden von Gizeh", "Freiheitsstatue", "Koloss dvon Rhodos", "Zeusstatue", "b", 15, false),
  // new Frage("Wer hat die Mona Lisa gemalt?", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet", "c", 15, false),
  // new Frage("Was ist die Wurzel aus -1?", "es gibt keine Lösung", "1", "-1", "i", ["a","d"], 15, false),
  // new Frage("Was ist die Hauptstadt von Frankreich?", "Berlin", "London", "Madrid", "Paris", "d", 15, false),
  // new Frage("Was ist der längste Fluss der Welt?", "Amazonas", "Nil", "Jangtse", "Mississippi", "b", 15, false),
  // new Frage("Wer war der erste Mensch auf dem Mond?", "Yuri Gagarin", "Alexander Gerst", "Neil Armstrong", "Michael Collins", "c", 15, false),
  // new Frage("Was ist der größte Planet in unserem Sonnensystem?", "Erde", "Mars", "Jupiter", "Venus", "c", 15, false),
  // new Frage("Wer hat die Theorie der Evolution durch natürliche Selektion vorgeschlagen?", "Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Alexander Fleming", "a", 15, false),
  // new Frage("Was ist die Hauptstadt von Australien?", "Sydney", "Melbourne", "Canberra", "Neuseeland", "c", 15, false)



  // // new Frage ("Bei einer Kosten-Nutzen-Analyse sollte was überwiegen, sodass man sich für die Alternative entscheiden würde?", "Nutzen", "Bargeld", "Kosten", "Freizeit", "a", 15, false),

  // new Frage ("Was steht im Konflikt, sodass der Mensch (ständig) wirtschaftliche Entscheidungen treffen muss?", "Begrenzte Bedürfnisse und Begrenzte Güter", "Unbegrenzte Bedürfnisse und Unbegrenzte Güter", "Unbegrenzte Bedürfnisse und Begrenzte Güter", "Begrenzte Bedürfnisse und Unbegrenzte Güter", "c", 15, false),

  // new Frage ('Welche Dimension der Nachhaltigkeit ist beim folgenden Beispiel am meisten vertreten: „Um ein besseres Image nach außen zu tragen, bezahlt Firma XY seine Mitarbeiter 2€ mehr Stundenlohn“', "ökologisch", "ökonomisch", "sozial", "ethisch", "b", 15, false),

  // new Frage ('„Mit einem vorgegebenen Mitteleinsatz, z.B. 1000 €, soll ein qualitativ-hochwertiges Handy gekauft werden“, ist ein Beispiel für das…', 'Extremumsprinzip', 'Minimalprinzip', 'Maximalprinzip', 'Min-Max-Prinzip', 'c', 15, false),

  // new Frage ('Was ist ein Beispiel für ein "Werbeträger"?', 'Familie', 'McDonalds', 'Zeitung', 'Schule', 'c', 15, false),

  // new Frage ('Was wäre wahrscheinlich kein gutes Werbeziel für ein Unternehmen?', 'Kundenbingung stärken', 'Vorstandswechsel', 'Imageverbesserung', 'Umsatzsteigerung', 'b', 15, false),

  // new Frage ('Wie sollte (als verkaufspsychologische Maßnahme) eine Verknappung bzw. ein Sonderangebot auf den Käufer wirken?', 'Beschleunigen der Kaufentscheidung', 'Nehmen gar keinen Einfluss', 'Lösen Angstzustände aus', 'Geben ein nachhaltiges Bild ab', 'a', 15, false),

  // new Frage ('Welche verkaufspsychologische Maßnahme steckt besonders hinter diesem Bild?', 'Decoy-Effekt', 'Priming', 'Produktplazierung', 'Verknappung', 'a', 15, "img/2.png"),

  // new Frage ('Was ist keine Zahlungsart?', 'Mobile Payment', 'Überweisung', 'Kartenzahlung', 'Schenkung', 'd', 15, false),

  // new Frage ('Was ist keine Dimension des magischen Dreiecks einer Geldanlage?', 'Liquidität', 'Sicherheit', 'Rentabilität', 'Nachhaltigkeit', 'd', 15, false),

  // new Frage ('Welchen Aspekt des magischen Dreiecks einer Geldanlage erfüllt eine Gamestop Aktie nicht bis wenig?', 'Liquidität', 'Sicherheit', 'Rentabilität', 'Nachhaltigkeit', 'b', 15, false),

  // new Frage ('Wie hoch ist die aktuelle Inflationsrate (Stand: 11/2023) in Deutschland?', '-3,2%', '+3,2%', '+3,1%', '-3,1%', 'b', 15, false),

  // new Frage ("Von einem Kaufkraftverlust spricht man, wenn man...", "Für das gleiche Gehalt mehr Güter kaufen kann", "Für weniger Gehalt weniger Güter kaufen kann", "Für das gleiche Gehalt weniger Güter kaufen kann", "Für mehr Gehalt mehr Güter kaufen kann", "c", 15, false),

  // new Frage ('Unter einer Lastschrift versteht man...', 'Die Ermächtigung vom Kontoinhaber an den Gläubiger das Geld einzuziehen', 'Die überweisung des Kontoinhabers auf das Konto des Gläubigers', 'Die Überschuldung des Kontoinhabers', 'Die Verschuldung beim Gläubiger', 'a', 15, false),

  // new Frage ("Unter einer Anleihe versteht man...", "Anteile am Unternehmen mit Gewinnbeteiligung", "Ansammlung von Aktien", "Anteil an einem bestimmten ETF", "Die Kreditvergabe des Gläubigers mit Garantie auf Rückzahlung mit Zinsen des Unternehmens", "d", 15, false),

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

// Bis zu welchem PLatz die Rangliste gehen soll
const ranglistenlimit = 10;


// Bei welcher Frage das Podium durchgewechselt werden soll
const nextPodium = 3;

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



