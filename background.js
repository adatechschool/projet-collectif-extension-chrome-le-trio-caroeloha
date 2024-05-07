// recupere le "sendMessage" du script 
(async () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "text") {

            //appel à l'API + ajoute à la fin de l'URL les paramètres 
            fetch('https://api.funtranslations.com/translate/minion?text=' + message.payload.text, {
                method: 'GET',
                //pour contourner l'erreur CORS
                headers: {
                    "access-control-allow-origin": "*",
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Methods': '*',
                }
            })

                //transformation des données en JSON
                .then(data => data.json())
                .then(res => {
                    //gestion des erreurs d'API
                    if(res.error){
                        sendResponse("banana Error")
                    }else{
                    // envoi de la traduction vers script (= le client)
                    sendResponse(res.contents.translated);}
                });
            
            //specifique asynchronie    
            return true
        }
    })
})();






