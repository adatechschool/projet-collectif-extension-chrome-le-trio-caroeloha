
console.log("Hello Extension");

// Get mouse selection data

function getUserSelection() {
  if (window.getSelection) {
    const selection = window.getSelection().toString();
    console.log("selection", selection);
    //translation in morse
    const translation = encode(selection)
    //display previous translation in navigator
    insertHtmlAfterSelection(window.getSelection(), translation);
  }
}
// call getUserSelection
document.addEventListener("mouseup", getUserSelection);


// sourse => https://stackoverflow.com/questions/3597116/insert-html-after-a-selection
// display translation in navigator
function insertHtmlAfterSelection(selectionObject, translation) {
  let range;
  let expandedSelRange;
// put the cursor at the end of the selection
  if (selectionObject.getRangeAt && selectionObject.rangeCount) {
    range = selectionObject.getRangeAt(0);
    expandedSelRange = range.cloneRange();
    range.collapse(false);

    // Range.createContextualFragment() would be useful here but is
    // non-standard and not supported in all browsers (IE9, for one)
    const el = document.createElement("div");
    el.innerHTML = ` [Morse: ${translation} ] `;
    let frag = document.createDocumentFragment();
    console.log(el)
    let node;
    let lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
    selectionObject.empty();

  }
}





//Code morse


function getLatinCharacterList(phrase) {
  return phrase.split("");
}

function encode(phrase) {
  let latinToMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '@': '.--.-.',
    'À': '.--.-', 'Ä': '.-.-', 'Æ': '.-.-', 'Ç': '-.-..', 'É': '..-..', 'È': '.-..-', 'Ö': '---.', 'Ü': '..--',
    'ß': '...--..', 'Ñ': '--.--', 'Ź': '--..-', ' ': '/'
  };

  // Convertir la phrase en majuscules
  phrase = phrase.toUpperCase();

  let morseCode = "";

  for (let i = 0; i < phrase.length; i++) {
    let lettre = phrase[i];

    // Vérifier si la lettre est dans l'objet latinToMorse
    if (lettre in latinToMorse) {
      // Ajouter le code à la lettre
      morseCode += latinToMorse[lettre] + ' ';
    } else {
      // ajout d'un espace Si la lettre n'est pas dans l'objet,
      morseCode += " ";
    }
  }
  // Retirer les espaces à la fin et au début
  console.log(morseCode)
  return morseCode.trim();

}
