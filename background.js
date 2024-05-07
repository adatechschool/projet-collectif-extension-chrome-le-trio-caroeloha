
(async () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "text") {


            
            
            fetch('https://api.funtranslations.com/translate/minion?text=' + message.payload.text, {
                method: 'GET',
                headers: {
                    "access-control-allow-origin": "*",
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Methods': '*',
                }
            })

                .then(data => data.json())
                .then(res => {

                    
                    sendResponse(res.contents.translated);
                    //console.log("res", res);
                    if (res.list && res.list.length > 0) {
                        
                    }
                });

            return true
        }
    })
})();






