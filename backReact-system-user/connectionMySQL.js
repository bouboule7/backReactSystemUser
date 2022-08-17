let bcrypt=require('bcrypt');
let mysql =require('mysql');        //on va utiliser mysql grace a mysql            let mysql est ici notre api reliant notre fichier a mysql qui est sur le serveur
let connectionFunction=()=>{        //fonction connectionFunction
    return {                        //return un
        connecter : mysql.createConnection({            //variable conecter qui conntien la connection a mysql
            host:'localhost',                           //adresse de l'hote qui contient mysql ie moi meme: localhost       si on utilise une base de donner venant d'un autre serveur:   https ou http  http://monserveri.com
            user:'root',                                //nomd'utilisateur du mysql
            password:'Tsaramanga1&',                 //mot de passe mysql asssocier a l'utilisateur root
            database:'rootUser'                           //base de donner a utiliser
        })
    }
}
function  recupererListe(response,connection){      //parametre(la reponse, le connection a myslq)
    let instruction="SELECT * FROM user";               //instructon a envoyer a mysql
    connection.query(instruction,function(err, result){     //query=requete     ie, on envoye la requete instruction a mysql, puis on traite la reponse dans la fonction de callbakc(appeler apres execution)
        if(err) {       //err recupere les erreur
            response.write({success:false,                  //on dit que la reponse du demande est false donc le fetch a echouer, pas de liste a afficher       sous forme json
                                message:"thanks"});
            response.end()                              //fin du reponse du serveur
        }
        
        response.write(JSON.stringify(result));         //si il n'y a pas d'erreur, on continue l'execution en retournant comme reponse la reopse du requete dans la base de donner
        response.end()          //fin
    })
}
function identification(response,requete, connection){      //identification(reponse ,requete,et le connectin a mysql)
    let tabRequet=[];               //on initialise un tableau pour recuperer les donner venant du demandeur
    let resultData;                 
    requete.on('data',(chunk)=>{        //tand qu'il y a de donner venant du requete    on recuperer ces donner dans la variable chunk
        tabRequet.push(chunk);          //on ajoute dans le baleau tabRequet les donner qui arrivent
    })
    requete.on('end',()=>{              //quand on ne recoit plus de donner venant du demandeur
        let position
        const tab=Buffer.concat(tabRequet);             //on compresse les donners binnaires qu on a recue et qu'on a mit dans le tableau tabrequet
        let lisible=tab.toString('utf-8');              //on donne l'encodage des donners recue: "utf-8" pour pouvoir lire les codes ASCII 256
        let dataSign=(JSON.parse(lisible));             //on transforme en json les donner recue deja transformer
        let instruction="SELECT userName,password, groupe FROM user WHERE userName= ?";           //dectaration d'une instruction pour selectionner tout les utilisateur a fin de pouvoir authentifier si l'utilisateur a entrer un email ou username et password valie (contennue dans le donner recuperer qui est maintenant sous forme json)
        connection.query(instruction,[dataSign.username],function(err, result){     //on donne la requete a mysql
            if(err) {       //en cas d'erreur
                response.write({success:false});
                response.end()
            }
            resultData=JSON.parse(JSON.stringify(result));      //on envoye le resultat mysql dans resultData
            let existe=resultData.some((element, index, array)=>{   //booleen mamaly hoe ita ve sa tsia ilay utilisateur no sady marina ilay mot de passe
                position=index
                //manao map-age izany oe asesy tsirairay ilay elemeht ao anaty ilay json de atsofoka anaty variable element, index= numero an'ilay donner ao amin'ilay json
                return (dataSign.username==element.userName) && bcrypt.compareSync(dataSign.password, element.password);      //raha sady mitovy ilay nom sy ilay password de manao return true, sinon toizana ilay traitement
                //raha tsy ita ao ilay olona de false no averiny
            })
            let groupe=resultData[position].groupe
            if(existe){         //raha marina ilay information
                response.write(JSON.stringify({find:true, error:"none", groupe:groupe}))   //on donne une reponse json disant que l'utilisateur existe dons que laa trauitement au FRONT peut continuer => redirection vers COnnected
                response.end();     //fin
            }
            else{ 
                response.writeHead(200,{"Content-Type":"application/json","Access-Control-Allow-Origin":"*", "Access-Control-Allow-Method":"*","Access-Control-Allow-Headers":"*"})                  //raha tsy marina
                response.write(JSON.stringify({find:false, error:"none"}))  //on a pas trouver donf find est false
                response.end();     //fin
            }
        })
        
    })
}
function enregistrement(response,requete, connection){
    function groupeId(chaine){
        let somme=0, i=0;
        while(i<chaine.length){
            somme+=chaine.codePointAt(i)
            i++
        };
        return somme
    }
    function userId(user, groupe){
        let somme=0, i=0;
        while(i<user.length){
            somme+=user.codePointAt(i)
            i++
        };
        i=0;
        while(i<groupe.length){
            somme+=groupe.codePointAt(i)
            i++
        };
        return somme
    }
    let tabRequet=[];               //on initialise un tableau pour recuperer les donner venant du demandeur
    requete.on('data',(chunk)=>{        //tand qu'il y a de donner venant du requete    on recuperer ces donner dans la variable chunk
        tabRequet.push(chunk);          //on ajoute dans le baleau tabRequet les donner qui arrivent
    })
    requete.on('end',()=>{              //quand on ne recoit plus de donner venant du demandeur
        const tab=Buffer.concat(tabRequet);             //on compresse les donners binnaires qu on a recue et qu'on a mit dans le tableau tabrequet
        console.log(tab);
        let lisible=tab.toString('utf-8');              //on donne l'encodage des donners recue: "utf-8" pour pouvoir lire les codes ASCII 256
        console.log(lisible);
        let dataSign=(JSON.parse(lisible));             //on transforme en json les donner recue deja transformer
        console.log(dataSign);
        if(dataSign.password==dataSign.password2){
            
            let motdePasseHacher= bcrypt.hashSync(dataSign.password,1);

            let instruction="INSERT INTO user(userName,password, userId, groupId, groupe, ville, ecole, surnom) VALUE (?,?,?,?,?,?,?,?)";           //dectaration d'une instruction pour selectionner tout les utilisateur a fin de pouvoir authentifier si l'utilisateur a entrer un email ou username et password valie (contennue dans le donner recuperer qui est maintenant sous forme json)
            connection.query(instruction,[dataSign.userName, motdePasseHacher,userId(dataSign.userName,dataSign.groupe),groupeId(dataSign.groupe),dataSign.groupe,dataSign.ville, dataSign.ecole, dataSign.surnom],function(err, result){     //on donne la requete a mysql
                console.log("requete en cours");
                if(err) {       //en cas d'erreur
                    response.write(JSON.stringify({success:false,                  //en envoye un json disant qu'il y a ereur
                                        motDePasse:true}));
                    response.end()
                }
                response.write(JSON.stringify({success:true,motDePasse:true}));                             //reponse qui vas etre un json
                response.end(); 
            })
        }
        else{
            response.write(JSON.stringify({success:false,motDePasse:false}));                             //reponse qui vas etre un json
            response.end(); 
        }
        
    })
}
function newUser(response,requete, connection){
    function groupeId(chaine){
        let somme=0, i=0;
        while(i<chaine.length){
            somme+=chaine.codePointAt(i)
            i++
        };
        return somme
    }
    function userId(user, groupe){
        let somme=0, i=0;
        while(i<user.length){
            somme+=user.codePointAt(i)
            i++
        }
        i=0
        while(i<groupe.length){
            somme+=groupe.codePointAt(i)
            i++
        }
        return somme
    }
    let tabRequet=[];               //on initialise un tableau pour recuperer les donner venant du demandeur
    requete.on('data',(chunk)=>{        //tand qu'il y a de donner venant du requete    on recuperer ces donner dans la variable chunk
        tabRequet.push(chunk);          //on ajoute dans le baleau tabRequet les donner qui arrivent
    })
    requete.on('end',()=>{              //quand on ne recoit plus de donner venant du demandeur
        const tab=Buffer.concat(tabRequet);             //on compresse les donners binnaires qu on a recue et qu'on a mit dans le tableau tabrequet
        let lisible=tab.toString('utf-8');              //on donne l'encodage des donners recue: "utf-8" pour pouvoir lire les codes ASCII 256
        let dataSign=(JSON.parse(lisible));             //on transforme en json les donner recue deja transformer
        
            
            let motdePasseHacher= bcrypt.hashSync(dataSign.password,1);

            let instruction="INSERT INTO user(userName,password, userId, groupId, groupe) VALUE (?,?,?,?,?)";           //dectaration d'une instruction pour selectionner tout les utilisateur a fin de pouvoir authentifier si l'utilisateur a entrer un email ou username et password valie (contennue dans le donner recuperer qui est maintenant sous forme json)
            connection.query(instruction,[dataSign.userName, motdePasseHacher,userId(dataSign.userName,dataSign.groupe),groupeId(dataSign.groupe), dataSign.groupe],function(err, result){     //on donne la requete a mysql
                console.log("requete en cours");
                if(err) {       //en cas d'erreur
                    response.write(JSON.stringify({success:false}));
                    response.end()
                }
                response.write(JSON.stringify({success:true}));                             //reponse qui vas etre un json
                response.end(); 
            })
        
    })
}
module.exports={connectionFunction, identification,recupererListe, enregistrement, newUser}      //export des fonction

// tableau -----> json             JSON.parse(tableau)
// json -------> string            JSON.stringify(json)
// donner binaire ----------> string  binaire.toString(mode d'encodage)

// resultat Myslq sady tsy tableau no tsy json fa UNDEFINED  izany oe JSON TSY TAPAKEVITRA        mila avadika string aloha, de aveo avadika json -------> JSON.parse(JSON.stringify(resultatMysql));