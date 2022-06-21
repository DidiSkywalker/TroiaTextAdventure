/*
  HTML ELEMENTE
*/
const inputForm = document.querySelector('#inputform') // form element
const textInput = document.querySelector('#textinput') // text input
const textContainer = document.querySelector('#messagecontainer') // text container

/*
  TEXTE / GAMEPLAY DATEN
*/

const INTRO_TEXT =
  'Sie wollen Troia erleben? Hier können Sie sich den Fakten stellen!'
const WINNING_TEXT =
  'Herzlichen Glückwunsch, Sie haben das Troia Text Adventure erfolgreich gemeistert und sind ein wahrer Troia Experte! Als Nächstes wartet unser 3D- Spiel „Troia erleben“ auf Sie! Auf geht’s ins nächste Troianische Abenteuer!'
const LOOSING_TEXT = 'Das ist leider nicht richtig. Sie verlieren.'
const QUESTIONS = [
  {
    question: 'Haben Sie Lust?',
    options: ['ja', 'nein'],
    answer: 'ja',
    positive: 'Perfekt. Los gehts!',
    negative: 'Schade, bis zum nächsten Mal.',
  },
  {
    question:
      'Troia war eine altertümliche Stadt in der Landschaft Troas gelegen, was heute dem Nordwesten der Türkei entspricht. Aus welcher Sprache stammt der Begriff „Troia“?',
    options: ['Türkisch', 'Latein'],
    answer: 'latein',
    positive:
      'Richtig! Der Begriff stammt von der lateinischen Schreibweise „Troia“, welche wiederum der altgriechischen Schreibweise entspricht.',
  },
  {
    question:
      'Im 19. Jahrhundert wurden in Troia viele Ausgrabungen gemacht von einem bekannten deutschen Archäologen. Wissen Sie, wie er heißt?',
    options: ['Heinrich Schliemann', 'Paul Kretschmer'],
    answer: 'heinrich schliemann',
    positive:
      'Richtig! Johann Ludwig Heinrich Julius Schliemann war Kaufmann, Archäologe sowie Pionier der Feldarchäologie, als er die in Vergessenheit geratene Stadt Troia wiedergefunden hat.',
  },
  {
    question:
      'Es steht außer Frage, dass Schliemann eine Quelle für sein Vorhaben und Fund haben musste. In der Antike gab es einige Schriftsteller und Dichter, die sich mit der Troianische Sage beschäftigten. So gab es auch eine Art „Urvater“ der Legende des Troianischen Kriegs. Wie war sein Name?',
    options: ['Homer', 'Sophokles'],
    answer: 'homer',
    positive:
      'Richtig! Der griechische Dichter Homer schrieb die Werke „Ilias“ und „Odyssee“, die heute in Griechenland als Nationaldichtungen gefeiert werden. In „Ilias“ steht die antike Geschichte des Troianischen Kriegs niedergeschrieben.',
  },
  {
    question:
      'In welchem Jahr, denken Sie, fanden die ersten Ausgrabungen statt?',
    options: ['1750', '1871'],
    answer: '1871',
    positive:
      'Richtig! 1871 erhielt Schliemann seine Ausgrabungslizenz und begann zu graben.',
  },
  {
    question: 'Halbzeit! Weiter gehts: Wann hat Schliemann Troia entdeckt?',
    options: ['1875', '1873'],
    answer: '1873',
    positive:
      'Richtig! Im Jahre 1873 gab Schliemann bekannt, Troia in Hisarlık gefunden zu haben.',
  },
  {
    question:
      'Was war sein spektakulärster Fund, der ihm den Durchbruch zum Ruhm als Wissenschaftler und Archäologen ermöglichte?',
    options: ['Schatz des Priamos', 'Goldmaske des Agamemnon'],
    answer: 'schatz des priamos',
    positive:
      'Richtig! Seinen, zu Ehren des Troianischen Königs Priamos, selbsternannten „Schatz des Priamos“ hat Schliemann 1873 ausgegraben.',
  },
  {
    question:
      'Troia war vielen Katastrophen ausgesetzt, was schließlich der Grund für die verschiedenen Phasen der Stadt war, an welchen die Zerstörung und der Wiederaufbau Troias zu erkennen ist. Welche Art von Katastrophen waren hauptsächlich dafür verantwortlich?',
    options: ['Überschwemmung', 'Brände'],
    answer: 'brände',
    positive:
      'Richtig! Neben folgenschweren Eroberungen litt Troia unter Naturkatastrophen wie Erdbeben und Bränden, die die Stadt großflächig zerstörten. Ingesamt wurden die Mauern und Ruinen 46 Mal wieder aufgebaut.',
  },
  {
    question: 'Wann fand der Troianische Krieg vermutlich statt?',
    options: ['1200 v. Chr.', '500 v. Chr.'],
    answer: '1200 v. Chr.',
    positive:
      'Richtig! Angeblich geschah der entscheidende Angriff, in dem Troia schließlich unterging, in der Nacht des siebten Vollmonds. Dieser war am 13. Juli 1182 v. Chr. Sollte diese Angabe stimmen, dann dauerte der Troianische Krieg etwa 10 Jahre und 6 Monate.',
  },
  {
    question:
      'Fast geschafft! Welche Funktion hatte das Troianische Pferd im Troianischen Krieg in der griechischen Mythologie?',
    options: ['Geschenk', 'Versteck'],
    answer: 'versteck',
    positive:
      'Richtig! Das Troianische Pferd war ein hölzernes Pferd, in dessen Bauch sich die griechischen Soldaten vor den Toren Troias versteckten, um sich Zugang zur Festung zu verschaffen.',
  },
  {
    question:
      'Letzte Frage: Wie lautet der Name des Troianers, der die Zerstörung Troias überlebte und zum Stammvater der Römer werden sollte?',
    options: ['Aeneas', 'Odysseus'],
    answer: 'aeneas',
    positive: 'Richtig! Sein Name war Aeneas.',
  },
]

/*
  GAMEPLAY VARIABLEN
*/

let isGameOver = false
let currentQuestionIndex = 0

/*
  START DES PROGRAMMS 
*/

// zuerst den intro text und die erste frage printen
printIntro()
printQuestion()

// "Enter"-Taste listener
inputForm.addEventListener('submit', onInputSubmit)

/**
 * Wird aufgerufen, wenn im Inputfeld "Enter" gedrückt wird.
 * Hier wird der Input gelesen, mit der erwarteteten Antwort verglichen,
 * und entsprechend die nächste Frage gestellt oder gameOver() aufgerufen.
 *
 * @param event Form Submit Event
 */
function onInputSubmit(event) {
  event.preventDefault()
  // wird aufgerufen, wenn im text input enter gedrückt wird
  const input = readInput()
  const currentQuestion = QUESTIONS[currentQuestionIndex]

  if (isGameOver) {
    return
  }

  print(input, true)

  if (
    currentQuestion.options
      .map((s) => s.toLowerCase())
      .includes(input.toLowerCase())
  ) {
    if (currentQuestion.answer.toLowerCase() === input.toLowerCase()) {
      print(currentQuestion.positive)
      currentQuestionIndex++
      if (currentQuestionIndex >= QUESTIONS.length) {
        // alle fragen durch, gewonnen
        print(WINNING_TEXT)
        gameOver()
      } else {
        printQuestion()
      }
    } else {
      print(currentQuestion.negative || LOOSING_TEXT)
      gameOver()
    }
  } else {
    print('Versuchen Sie es noch einmal.')
    printQuestion()
  }

  textInput.value = '' // leert das input feld
}

/**
 * Setzt das Spiel in den "Game Over" Zustand.
 * Es wird kein weiterer Input angenommen, und statt dem
 * Eingabefeld erscheint ein "Erneut Spielen"-Button
 */
function gameOver() {
  isGameOver = true
  inputForm.disabled = true
  const button = createReplayButton()
  textContainer.appendChild(button)
  button.scrollIntoView()
}

function createReplayButton() {
  const div = document.createElement('div')
  div.classList.add('replaycontainer')
  const button = document.createElement('button')
  button.id = 'replay'
  button.textContent = 'Erneut Spielen'
  button.addEventListener('click', replay)
  div.appendChild(button)
  return div
}

/**
 * Gibt den Text der aktuellen Frage aus.
 */
function printQuestion() {
  const options = QUESTIONS[currentQuestionIndex].options.join('/')
  print(QUESTIONS[currentQuestionIndex].question + ` (${options})`)
}

/**
 * Gibt den Intro Text aus.
 */
function printIntro() {
  print(INTRO_TEXT)
}

/**
 * Liest den aktuellen Input im Eingabefeld und gibt ihn zurück.
 * @returns Der Userinput
 */
function readInput() {
  return textInput.value // text der vom user eingegeben wurde
}

/**
 * Fügt dem textContainer einen neuen Paragraphen (<p>-Tag) mit dem
 * gewünschen Text hinzu.
 *
 * @param text Text der ausgegeben werden soll
 * @param userInput True, wenn der Input des Users wieder ausgegeben wird.
 */
function print(text, userInput = false) {
  const div = document.createElement('div')
  div.classList.add('bubble')
  if (userInput) {
    // falls der user input zurück gegeben wird, eine spezielle klasse hinzufügen
    div.classList.add('right')
  }
  const p = document.createElement('p') // erstellt einen <p> tag
  const textNode = document.createTextNode(text) // erstellt den text als html text
  p.appendChild(textNode) // schreibt den text in den <p> tag
  div.appendChild(p) // fügt den <p> tag in den <div> tag ein
  textContainer // container für consolen text
    .appendChild(div) // fügt den neuen <div> in den container ein
  p.scrollIntoView()
}

/**
 * Startet das Spiel neu.
 */
function replay() {
  textContainer.innerHTML = ''
  isGameOver = false
  inputForm.disabled = false
  textInput.value = ''
  currentQuestionIndex = 0
  printIntro()
  printQuestion()
}
