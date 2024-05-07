
console.log("Hello Extension");





function getUserSelection() {
  if (window.getSelection) {
    const selection = window.getSelection().toString();
    console.log("selection", selection);

    const payload = {
      text: selection.trim(),
      src: "English",
      dest: "minion",
      detected: "English",

    };
    (async () => {
      const response = await chrome.runtime.sendMessage({ type: 'text', payload })
      console.log(response)
      insertHtmlAfterSelection(window.getSelection(), response);
    })();
  }

}

document.addEventListener("mouseup", getUserSelection);

// https://stackoverflow.com/questions/3597116/insert-html-after-a-selection
function insertHtmlAfterSelection(selectionObject, translation) {
  let range;
  let expandedSelRange;

  if (selectionObject.getRangeAt && selectionObject.rangeCount) {
      range = selectionObject.getRangeAt(0);
      expandedSelRange = range.cloneRange();
      range.collapse(false);

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      const el = document.createElement("div");
      el.innerHTML = ` [Minion: ${translation} ] `;
      let frag = document.createDocumentFragment();
      let node;
      let lastNode;
      while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      selectionObject.empty();
      
  }
}

