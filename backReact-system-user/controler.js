const {connectionFunction}=require('./connectionMySQL');        //on recupere la fonction connectionFUnction qui se trouve dans le fichier connectionMysql.js
const {identification,recupererListe, enregistrement, newUser}=require('./connectionMySQL');     //on recuperer aussi les deux autre fonction identification et recupererListe
function signin(response,requete){          //definition du fonction signin avec params (reponse, requete)
    console.log(("dans controler signin"));
    response.writeHead(200,{"Content-Type":"application/JSON","Access-Control-Allow-Origin":"*", "Access-Control-Allow-Method":"*","Access-Control-Allow-Header":"*"})    //on dit le type de reponse: entete + type de reponse
    let Connection = connectionFunction();  //on affecte dans Connection la fonction connectionFunction pour pouvoir appeler ses sous-fonction
    identification(response,requete,Connection.connecter);      //utilisation du fonction identification avec atribut (reponse, requete, et la sous fonction connecter se trouvant dans connectionFunction)
}
function signup(response, requete){          //def du fonction
    console.log("controleur singup ");
    response.writeHead(200,{"Content-Type":"application/JSON","Access-Control-Allow-Origin":"*", "Access-Control-Allow-Method":"*","Access-Control-Allow-Header":"*"})    //on dit le type de reponse: entete + type de reponse
    let Connection = connectionFunction();  //on affecte dans Connection la fonction connectionFunction pour pouvoir appeler ses sous-fonction
    enregistrement(response,requete,Connection.connecter)
}
function connected(response){               //definition
    response.writeHead(200,{"Content-Type":"application/JSON","Access-Control-Allow-Origin":"*", "Access-Control-Allow-Method":"*"})        //entete
    let Connection = connectionFunction();                          //on affecte la fonction connectionFunction dans une variable pour apppeler les sous-fonction
    recupererListe(response,Connection.connecter);          //utilisation du fonction recupererListe(reponse, sous-fonction connecter() du fonction connectionFunction)
    //on peut aussi appeler directement la sous-fonction comme ca connectionFunction().connecter();
    //reposne. write(); est traiter dans recupererListe();
    //on ne fait plus de reponse.end(); car la fin du respone est deja fait dans recupererListe()
}
function addUser(response, requete){     //traitemùent d'ajout de nouvelle utilisateur
    response.writeHead(200,{"Content-Type":"application/JSON","Access-Control-Allow-Origin":"*", "Access-Control-Allow-Method":"*"})        //entete
    let Connection = connectionFunction();                          //on affecte la fonction connectionFunction dans une variable pour apppeler les sous-fonction
    newUser(response,requete,Connection.connecter);
}
module.exports={signin, signup, connected, addUser}     //on exporte les fonction


//endrikin'ny reponse mizara telo
// 1-  type d' entete (ex: application/json,text/html, image/png,...) et code de reponse (ex:200 pour dire success, 404 pour dire pas trouver, 403 pour dire access refuser,500 erreur lors du traitemebt,)
// 2-  reponse a envoyer sous forme de string
// 3-  que la reponse prend fin