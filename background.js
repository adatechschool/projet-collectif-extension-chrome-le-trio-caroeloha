chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
            if (message.type === "object") {
                console.log(message.payload)
                fetch('"https://api.funtranslations.com/translate/minion"', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(message.payload),
                })
                    .then(data => data.json())
                    .then(res => {
                        console.log("res", res);
                        if (res.list && res.list.length > 0) {
                            const translation = res.list[0].destWord;
                            console.log("traduction", translation);
                            insertHtmlAfterSelection(window.getSelection(), translation);
                        }
                    });
            }
        })

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
                el.innerHTML = ` [FR: ${translation} ] `;
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
  
