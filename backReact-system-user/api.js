const http=require ('http');
const {route}=require('./route');           //la fonction route se trouve dans le fichier ./route.js    on affecte l'exportation de route.js dans le variable route pour pouvvoir l'utiliser
const server=http.createServer((requete,reponse)=>{             //requete reupere la requete envoyer a api.js   reponse est la valeur de retour de api.js cad ce que recoit le demandeur
    route(requete.url, reponse,requete, requete.method)         //on traite chaque requete suivant l'url ex:/signin, /signup dans la fonciton route
});             //requete.url est l'url de la requete   requete.methode est le mode d'envoye des donner venant du demandeur: ex:POST, GET,... 
server.listen(8081,()=>{                                    //on demare le sevreur qui lance api.js sur le port 8080
    console.log("Listening on http://localhost:8081");      //si le sevreur est en cours d'execution
})