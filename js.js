let bouton= document.querySelector("#submit");
let nomMusique= document.querySelector("#nomMusique");
let resRech = document.querySelector("#resultat");
let musicPlay = document.querySelector("#music")




bouton.addEventListener('click', (evenement) =>{
    enAttenteDeChargement();
})

function rechercheApi(){ return new Promise(resolve => {
    
  
    let url ="https://itunes.apple.com/search?attribute=songTerm&term="+nomMusique.value;
    let cros= "https://cors-anywhere.herokuapp.com/";
    fetch(cros+url)
    .then( data => data.json())
    .then( json => {
        
        console.log(json);
        
        let ajouterMusique = "";
    if(json.resultCount!=0){
    json.results.forEach(element => {
        if(element.kind=="song"){
            console.log(element);
            ajouterMusique += `
                            <li class="collection-item avatar">
                                <img src="${element.artworkUrl100}" alt="" class="circle">
                                <span class="title">${element.artistName}</span>
                                <p>${element.trackName} <br>
                                ${element.collectionCensoredName}
                                ${element.releaseDate}
                                ${element.trackPrice}$
                                </p>
                                <audio class="secondary-content" id="music" controls src="${element.previewUrl}"></audio>
                            </li>
                            `
        }   
        resolve("charger!!")                 
    });
    }else {
        ajouterMusique+="<h1>AUCUN RÉSULTAT TROUVÉ</h1>"
        resolve("AUCUN RÉSULTAT TROUVÉ!!") 
    }

         resRech.innerHTML = ajouterMusique;

    }).catch(error => console.log(error));
});

}

async function enAttenteDeChargement() {
    console.log('Entraint de chercher');
    const result = await rechercheApi();
    console.log(result);
    // expected output: "resolved"
  }

