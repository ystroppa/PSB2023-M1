// plusieurs fonctions sont à développer pour effectuer les différents calculs et chargement de notre page html 

liste_etudiants={
    "5421542151":{"nom":"Dalton","prenom":"joe","date_naissance":1870,"matieres":{"Anglais":[12.3,15.5],"Mathématiques":[9.4,17.2,19.5],"Physique":[17.5,16.2]}},
    "5421554152":{"nom":"Dalton","prenom":"william","naissance":1871,"matieres":{"Anglais":[],"Mathématiques":[12.5,14.7,18.7],"Physique":[9.7,5.3]}},
    "5421554153":{"nom":"Dalton","prenom":"jack","naissance":1872,"matieres":{"Anglais":[15.7,12.65 ,13.54],"Mathématiques":[],"Physique":[12.8 ,14.7]}},
    "5421554154":{"nom":"Dalton","prenom":"averel","naissance":1873,"matieres":{"Anglais":[11.4,9.5,5.2],"Mathématiques":[5.7,5.7],"Physique":[2.4,3.7,8.2]}}};
liste_matieres={"Anglais":{"Coef":"2","Volumes":"20"},"Mathématiques":{"Coef":"4","Volumes":"24"},"Physique":{"Coef":"3","Volumes":"18"}};

var ind_etudiant=0;

// chargement au load de la page de l'objet select aven le contenu de la variable liste_matieres 
const chargement_select_matieres=function () {
    // balayer la liste de objets de matieres et creation d'un objet html de type option à ajouter dans le select parent liste_mat
    let id_cible=document.getElementById("liste_mat");
    Object.keys(liste_matieres).forEach(element => {
        let opt=document.createElement("option");
        opt.value=element;
        opt.innerText=element;
        id_cible.appendChild(opt);
    }); 

}
// input: id de l'etudiant 
const chargement_etudiant=function (id) {
    // on peut verifier si la cle existe 
    // verification du passge de l id et de la recup des valeurs  
    console.log(id);
    let input_nom=document.getElementById("etu_nom");
    let input_prenom=document.getElementById("etu_prenom");
    let input_id=document.getElementById("etu_id");
    input_nom.value=liste_etudiants[id].nom;
    input_prenom.value=liste_etudiants[id].prenom;
    input_id.value=id;
    // affichage de la partie notes 
    let matieres=liste_etudiants[id]["matieres"];
    // on balaye l'objet matiere et on ajoute un objet p avec le nom de la matiere et les notes 
    // il faut nettoyer avant l'affichage le contenu de liste_notes 
    let liste=document.getElementById("liste_notes")
    while (liste.firstChild) {
        liste.removeChild(liste.lastChild);
      }
    Object.keys(matieres).forEach((e)=> {
        let cahine="";
        if (liste_etudiants[id]["matieres"][e].length==0) {
            chaine = "<p style='color:red'>"+e.toUpperCase()+"</p>" + " ==> notes:" +liste_etudiants[id]["matieres"][e].toString();
        }
        else {
            chaine = "<p style='color:green'>"+e.toUpperCase()+"</p>" + " ==> notes:" +liste_etudiants[id]["matieres"][e].toString();
        }
        addElement("liste_notes","p","z_"+e,chaine);
    });
    calcul_moyenne_etudiant(id);
}


const recharge_suivant=function() {
    //rechargement du suivant si il y en a un 
    console.log("recharge_suivant==>",ind_etudiant );
    ind_etudiant++;
    if (ind_etudiant>=Object.keys(liste_etudiants).length) {
        ind_etudiant=0;
        chargement_etudiant(Object.keys(liste_etudiants)[ind_etudiant]);
    }else {
        chargement_etudiant(Object.keys(liste_etudiants)[ind_etudiant]);
    }
}

const recharge_precedant=function() {
    //rechargement du precedant  si il y en a un 
    //rechargement du suivant si il y en a un 
    console.log("recharge_suivant==>",ind_etudiant );
    ind_etudiant--;
    if (ind_etudiant<=-1) {
        ind_etudiant=Object.keys(liste_etudiants).length;
        chargement_etudiant(Object.keys(liste_etudiants)[ind_etudiant]);
    }else {
        chargement_etudiant(Object.keys(liste_etudiants)[ind_etudiant]);
    }

}


const calcul_moyenne_etudiant=function (id) {
    // prendre l'ensemble de ses noptes par matieres et calcul la moyenne par matiere 
    let matieres=liste_etudiants[id]["matieres"];
    // on balaye l'objet matiere et on ajoute un objet p avec le nom de la matiere et les notes 
    // il faut nettoyer avant l'affichage le contenu de liste_notes 
    let liste=document.getElementById("recap_mat")
    while (liste.firstChild) {
        liste.removeChild(liste.lastChild);
      }
    Object.keys(matieres).forEach((e)=> {
        let somme= liste_etudiants[id]["matieres"][e].reduce((p,m) =>p+=m,p=0); 
        let moyenne=0;
        if (liste_etudiants[id]["matieres"][e].length==0) {
            moyenne=0;
        }
        else {
            moyenne = somme/liste_etudiants[id]["matieres"][e].length ;
        }
        let chaine = "<p style='color:blue'>"+e.toUpperCase()+"</p>" + " ==> moyenne:" +moyenne.toFixed(2);
        addElement("recap_mat","p","z_"+e,chaine);
    })

}

const calcul_moyenne_matiere=function (nom_matiere) {
    
}



// fonctions utilitaires : permet d'ajouter un nouvel objet sous un parent identifie de son ID 
const addElement=function(parentId, elementType, elementId, contenu,display="display:block") {
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementType);
	newElement.setAttribute("id", elementId);
	newElement.innerHTML = contenu;
	newElement.setAttribute("style", display);
	p.appendChild(newElement);
}

const reinit_form=function() {
    let input_nom=document.getElementById("etu_nom");
    let input_prenom=document.getElementById("etu_prenom");
    let input_id=document.getElementById("etu_id");
    input_nom="";
    input_prenom="";
    input_id="";
}
