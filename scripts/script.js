/***
 * fonction qui afficher le resultat sur le nombre de mots qu'on a tenté
 */
function afficherResultat(resultat,nbQuestions)
{
    let zone_score = document.querySelector(".zoneScore span");
    let html_score = ` ${resultat} / ${nbQuestions} `;
    zone_score.innerHTML = html_score;
}

/***
 * fonction qui affiche la proposition du mot ou de la phrase 
 */
function afficherProposition(mot_a_afficher)
{
    let zone_texte = document.querySelector(".zoneProposition");
    zone_texte.innerText = mot_a_afficher

}

/***
 * afficherEmail , fonction qui ouvre le client mail avec un mail préécrit et prêt à 
 * être envoyer
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}+?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je vais de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/***
 * fonction qui s'occupe de gerer le jeu jusqu'a ce qu'il soit fini 
 */ 
function lancerJeu()
{
    let score = 0;
    initAddEventListenerPopup();
    let listeProposotion =[...listeMots];
    let btn_valider = document.getElementById("btnValiderMot");
    let input_mot = document.getElementById("inputEcriture");
    let compteur = 0;
    let jeuFini = false;

    /* fonction qui verfie valide la reponse et qui affiche le mot suivant */
    function validerReponse()
    {
        if(jeuFini)
            {
                return;
            }
            
        if(input_mot.value === listeProposotion[compteur])
            {
                score++;
            }
            compteur++;
            afficherResultat(score,compteur);
            input_mot.value = ''
            if(listeProposotion[compteur] === undefined)
            {
                afficherProposition("Le jeu est fini");
                btn_valider.disabled = true;
                jeuFini = true
        
            }
            else
            {
                afficherProposition(listeProposotion[compteur]);
            } 
        
    }

    afficherProposition(listeProposotion[compteur]);

    btn_valider.addEventListener("click", () => {
        validerReponse();
    })

    document.addEventListener("keydown", function (event) {  
        if (event.key === 'Enter') {
            validerReponse();
        } 
        
    })
    /* ecoute des boutons radios pour savoir si l'utilisateur veut des mots ou des phrases */

    let liste_btn_radio = document.querySelectorAll(".optionSource input");
    for(let i=0; i<liste_btn_radio.length;i++)
    {
        liste_btn_radio[i].addEventListener("change",(event) => {
            if(event.target.value === "2")
            {
                listeProposotion = [...listePhrase];    
            }
            else
            {
                listeProposotion = [...listeMots];    
            }
            compteur = 0;
            score = 0;
            jeuFini = false;
            afficherResultat(score,compteur);
            afficherProposition(listeProposotion[compteur]);
        })
    }
   
        
    afficherResultat(score,compteur);
}


