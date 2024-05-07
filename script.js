
console.log("Hello Extension");

// recupere datas et les mets dans la variable selection puis envoyee dans background
function getUserSelection() {

  const selection = window.getSelection().toString();
  if (selection) {
    console.log("selection", selection);

    //paramètres à envoyer à l'api 
    const payload = {
      text: selection.trim(),
      src: "English",
      dest: "minion",
      detected: "English",
    };

    //envoi des paramètres au background grâce à sendMessage
    (async () => {
      const response = await chrome.runtime.sendMessage({ type: 'text', payload })
      console.log(response)
      insertHtmlAfterSelection(window.getSelection(), response);
    })();
  }

}

//event de sélection de texte
document.addEventListener("mouseup", getUserSelection);

//affichage sur le navigateur de la réponse de l'API
// Source du code utilisé : https://stackoverflow.com/questions/3597116/insert-html-after-a-selection
function insertHtmlAfterSelection(selectionObject, translation) {
  let range;

  //vérifie que les méthodes getRangeAt et rangeCount sont disponibles sur l'objet sélectionné
  if (selectionObject.getRangeAt && selectionObject.rangeCount) {
      
      //retourne la range sélectionnée sous forme d'objet
      range = selectionObject.getRangeAt(0);
      //place curseur à la fin de la sélection
      range.collapse(false);

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      const el = document.createElement("div");
      
      //place traduction + style à l'intérieur de l'HTML
      el.innerHTML = `<span style="color:#CC6633";>[ &#x1F601 Minion : ${translation} ]</span>`;
      
      //crée un fragment
      let frag = document.createDocumentFragment();
      let node;
      let lastNode;
      
      //parcours le texte sélectionné
      while ((node = el.firstChild)) {
          //node devient enfant de frag
          lastNode = frag.appendChild(node);
      }

      //insérer le frag dans la page
      range.insertNode(frag);
      //effacer la sélection
      selectionObject.empty();
      
  }
}

