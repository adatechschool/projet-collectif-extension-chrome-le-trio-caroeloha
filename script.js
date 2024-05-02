
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
      chrome.runtime.sendMessage({ type: 'object', payload }, response => {
        console.log(response)
      })
    }
  }
document.addEventListener("mouseup", getUserSelection);
