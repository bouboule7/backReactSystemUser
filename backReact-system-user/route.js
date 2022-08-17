// definitoin du fonction route qui gere les demande de l'url
const controler =require('./controler');        //on affecte dans le variable controler l'exportation du fichier ./controler.js pour pouvoir l'utiliser. on a besoin de fonction se trouvant dans controler.js
const route=(url, resp,req, method)=>{      //definition de la foncton route avec paramettre (url, reponse, equete, et methode d'envoye de donner venant du demandeur)
    if(url=="/signin" && method=="POST"){   //si l'url du demandeur= '/signing' ie 'http://localhost:8080/signin' et que la mode d'envoye de donner est de type POST seulement ie on recupere les donner du demandeur par la methode POST   lorsque l'utilisateur valide la formulaire de signing, on traite la demande
        console.log("signin actif");
        controler.signin(resp, req);        //on appele la sous-fonction signin(reposne, requete) se trouvnt dans le bloc controler importer en haut
    }
    else if (url=="/signup"  && method=="POST"){//si l'url ='http://localhost:8080/signup' et que la methode est POST   si l'utilisateur demande a creer une nouvelle compte, on recuperer les donner du formulaire envoyer par methode post
        console.log('signup actif');
        controler.signup(resp, req);             //on appele la sous-fonction signup(reponse) dans la bloc controler
    }
    else if(url=="/connected"){             //si l'url est 'http://localhost:8080/connected'   si l'utilisateur est connecter, on afficher la liste des utilisateur grace au fontion 
        controler.connected(resp);          //connected dans la bloc controler qui recuperer les donner venant du base de donner et s'occupe de l'envoyer comme reponse au demandeur: FRONT : grace au methode fetch    c'est le front qui apppele la fonction fetch pour demander de reponse au back grace à bapi
        //une api est un mpanelanelana
    }
    else if(url=="/addUser"){               //si le demandeur demande d'ajouter une nouvelle utilisateur, donc ici on aura besoin de donner venant du demandeur qu'il devra envoyer par la methode post
        console.log('addUser actif');
        controler.addUser(resp,req);            //on traite l'ajout de user dans la base de donner dans la sous-fonction addUser() de controler
    }
    else{                               //si la route de la requete est invalide, ex: 'http;//localhost:8080/dyajzrvkf'     on envooye une reponse que la demande n'est pas valide
        console.log("requete execution")
        resp.writeHead(200,{"Content-Type":"application/JSON","Access-Control-Allow-Origin":"*", "Access-Control-Allow-Method":"*"})    //on dit que la reponse est de type JSON, et on donne l'access de lecteur et ce controle ( le demandeur en fait ce qu'il veut, la reponse n'est plus crytpter) par tout les demande origine et method    ACCESS CONTROL ALLOW ORIGIN et  ACCESS CONTROL ALLOW METHOD
        resp.write(JSON.stringify({"error":"denied"}));     //on envoye la reponse JSON :{"error":"denied"}     on le transforme en string car on ne peut envoyer que des string a travere le reseau
        resp.end();                 //on dit au demandeur que la reponse du serveur est terminer
    }
}
module.exports={route}          //on exporte le module entier pour pouvoir l'utiliser dans les autres fichier qui l'importe


//demandeur ----requete+donner(methode post)---> serveur
//demandeur <----reponse----- serveur       avec allow blablabla..., le demandeur peut traiter la reponse sinon
//demandeur <---reponse=permission non accorder--- serveur

//il faut configurer dans le serveur qui peut y a voir acces ou non sinon tout le monde pourrait recuperer les donner stocker dans le serveur
//quand on fait:    Access-Allow-blablabla': '*'    ----------> tout les demandes venant d'ou sont accepter
//quand on fait:    Access-Allow-blablabla': 'http://localhost:3000'    ----------> seul les demandes venant de http://localhost:3000 sont accepter