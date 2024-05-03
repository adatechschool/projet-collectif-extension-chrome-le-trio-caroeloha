
(async () => {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "text") {


        sendResponse(message.payload.text)
        fetch('https://api.funtranslations.com/translate/minion?text=' + message.payload.text, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",


            }
        })

            .then(data => data.json())
            .then(res => {
                
                console.log("res", res);
                if (res.list && res.list.length > 0) {
                    const translation = res.list[0].destWord;
                    console.log("traduction", translation);
                }
            });

        return true
    }
})
})();






