let chaine="abcdABCD";
function groupeId(chaine){
    let somme=0, i=0;
    while(i<chaine.length){
        somme+=chaine.codePointAt(i)
        i++
    };
    return somme
}
console.log(groupeId("Lita"+"hcgvjgkhlj"));
console.log(groupeId("gerard"));
console.log(groupeId("zanne"));
console.log(groupeId("bema"));
console.log(groupeId("Koto"));
