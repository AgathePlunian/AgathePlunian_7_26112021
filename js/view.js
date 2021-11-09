class View {
  
    constructor() {
        this.arrayIngredients = new Array();
        this.arrayUstensils = new Array();
        this.arrayAppareils = new Array();
    }

    showIndex(recipesList) {
        this.getClearArrays(recipesList)
        this.renderInputSearch();
        this.renderRecipesCards(recipesList);
   }

   //TRI LES LISTES INGREDIENTS APPAREILS ET USTENSILES EN ENLEVANT LES DOUBLONS
   getClearArrays(recipesList) {
    //CLEAR INGREDIENTS ARRAY
    let allIngredientsList = [];
    for(let i = 0; i < recipesList.length; i++) {
        let eachArrayOfIngredients = recipesList[i].ingredients;

        for(let j = 0; j < eachArrayOfIngredients.length ; j ++) {
            allIngredientsList.push(eachArrayOfIngredients[j].ingredient)
        }
    }
    this.arrayIngredients = [...new Set(allIngredientsList)];

    //CLEAR APPAREILS ARRAY
    let allAppareilsList = [];
    for(let i = 0 ; i < recipesList.length; i++) {
        allAppareilsList.push(recipesList[i].appliance);
    }
    this.arrayAppareils = [...new Set(allAppareilsList)];

    //CLEAR USTENSILS ARRAY
    let allUstensilsList = [];
        for(let i = 0; i < recipesList.length; i++) {
            let eachArrayOfUstensils = recipesList[i].ustensils;

            for(let j = 0; j < eachArrayOfUstensils.length ; j ++) {
                allUstensilsList.push(eachArrayOfUstensils[j]);
            }
        }
        this.arrayUstensils = [...new Set(allUstensilsList)];

}


   //AFFICHAGE DES CARDS DE RECETTES DE CUISINE
    renderRecipesCards(recipesList) {
        let cardsContainer = document.getElementById("recipes-cards-container");
       
        for(let i = 0; i < recipesList.length; i++){
            let cardRecipe = document.createElement("div");
            cardRecipe.classList.add("card-recipe");
            cardRecipe.innerHTML = `<div class="recipe-img-container"></div>
                                    <div class="recipe-text-container">
                                        <div class="card-header">
                                            <h2>${recipesList[i].name}</h2>
                                            <span><img src="images/time.png"><p class="text-bold">${recipesList[i].time} min</p></span>
                                        </div>
                                        <div class="body-card">
                                            <ul class="card-list-ingredients"></ul>
                                                <p class="description-recipe">
                                                    ${recipesList[i].description}
                                                </p>
                                        </div>
                                    </div>`

            cardsContainer.appendChild(cardRecipe);
            let cardListIngredients = document.getElementsByClassName("card-list-ingredients");
           
            for(let j = 0; j < recipesList[i].ingredients.length; j++) {
                let itemList = document.createElement('li');
                    
                if((!recipesList[i].ingredients[j].unit) && (!recipesList[i].ingredients[j].quantity)) {
                    itemList.innerHTML =  `<p><span class="text-bold">${recipesList[i].ingredients[j].ingredient}</span></p>`;
                }

                else if(!recipesList[i].ingredients[j].unit) {
                    itemList.innerHTML =  `<p><span class="text-bold">${recipesList[i].ingredients[j].ingredient}: </span>${recipesList[i].ingredients[j].quantity}</p>`;
                }

                else {
                    itemList.innerHTML =  `<p><span class="text-bold">${recipesList[i].ingredients[j].ingredient}: </span>${recipesList[i].ingredients[j].quantity} ${recipesList[i].ingredients[j].unit}</p>`;
                }

                cardListIngredients[i].appendChild(itemList);
            }                               
        }
    }

    //AFFICHAGE DES BOUTONS DE RECHERCHES INGREDIENTS, APPAREIL ET USTENSILES 
    renderInputSearch() {
        let inputsContainer = document.getElementById("select-inputs-container");

        let inputsName = ["Ingredients", "Appareil", "Ustensiles"];

        for(let i = 0 ; i < inputsName.length ; i ++) {

            let inputTemplate = document.createElement("div");
            inputTemplate.setAttribute("id",inputsName[i]);


            inputTemplate.innerHTML = `<div class="input-container">
                                            <input class="inputsSearch" id="input${inputsName[i]}" placeholder="${inputsName[i]}">
                                            <div class="chevrons-container">
                                                <img class="chevron-open" src="/images/fleche-down-white.png" alt="Open search ${inputsName[i]}">
                                                <img class="chevron-close" src="/images/fleche-up-white.png" alt="Close search ${inputsName[i]}">
                                            </div>
                                        </div>
                                        <div><ul id="list${inputsName[i]}Container"></ul></div>
                                        `;
            
            inputsContainer.appendChild(inputTemplate);

        }    

        let inputsList = document.getElementsByClassName("inputsSearch");
        for(let i = 0 ; i < inputsList.length ; i++) {
            inputsList[i].addEventListener('input' , (event) => {
                this.searchAutoImplement(event);
            }); 
        }

        let chevronsContainer = document.getElementsByClassName("chevrons-container");
        for(let i = 0 ; i < chevronsContainer.length ; i++) {
            chevronsContainer[i].addEventListener('click' , (event) => {
                this.handleSelect(event, i);
            }); 
        }
    }


     //AFFICHES LES LISTES DES 3 INPUTS DE RECHERCHES
     renderListByElement(idElement, listElementsContainer, input) {
   
        if(idElement == "Ingredients") {
            
            input.placeholder = "Recherche un ingredient";    
           
            for (let i = 0; i < this.arrayIngredients.length ; i++) {
                let itemList = document.createElement('li');
                itemList.classList.add("item-list-clickable");
                itemList.innerHTML = this.arrayIngredients[i];
                listElementsContainer.appendChild(itemList);
            }
        }

        if(idElement == "Appareil") {

            input.placeholder = "Recherche un appareil";    
           
            for (let i = 0; i < this.arrayAppareils.length ; i++) {
                let itemList = document.createElement('li');
                itemList.classList.add("item-list-clickable");
                itemList.innerHTML = this.arrayAppareils[i];
                listElementsContainer.appendChild(itemList);
            }
        }

        if(idElement == "Ustensiles") {

            input.placeholder = "Recherche un ustensile";    
            
            for (let i = 0; i < this.arrayUstensils.length ; i++) {
                let itemList = document.createElement('li');
                itemList.classList.add("item-list-clickable")
                itemList.innerHTML = this.arrayUstensils[i];
                listElementsContainer.appendChild(itemList);
            }
        }

        let itemsListClickable = document.getElementsByClassName("item-list-clickable");
        
        for(let i = 0; i < itemsListClickable.length ; i++) {
            itemsListClickable[i].addEventListener('click' , (event) => {
                this.addSearchTag(event);
            }); 
        }
    }


     //GÈRE L'OUVERTURE ET LA FERMETURE DES INPUTS DE RECHERCHES INGREDIENTS, APPAREILS ET USTENSILES
     handleSelect(event, i) {
        let chevronOpen = document.getElementsByClassName("chevron-open")[i];
        let chevronClose = document.getElementsByClassName("chevron-close")[i];
        let idElement = event.target.parentNode.parentNode.parentNode.id;
        let listElementsId = "list"+ idElement +"Container";
        let listElementsContainer = document.getElementById(listElementsId);
        listElementsContainer.classList.remove("list-no-flex");
        let input = event.target.parentNode.parentNode.children[0];
        let divInputChosen = document.getElementById(idElement);

        //FERME LE MENU SELECT
        if(chevronClose.classList.contains("chevron-display")) {
            chevronOpen.classList.remove("chevron-no-display");
            chevronClose.classList.remove("chevron-display");
            divInputChosen.classList.remove("expanded-list");
            listElementsContainer.classList.remove("add-margin-top");
            listElementsContainer.innerHTML = "";
            input.classList.remove("input-list-mode");
            input.placeholder = idElement;
        }
        
        //OUVRE LE MENU SELECT
        else {
        chevronOpen.classList.add("chevron-no-display");
        chevronClose.classList.add("chevron-display");      
        divInputChosen.classList.add("expanded-list");
        listElementsContainer.classList.add("add-margin-top");
        input.classList.add("input-list-mode");
            
        this.renderListByElement(idElement, listElementsContainer, input);
        }
    }



    //RECHERCHE DE LA LISTE DE MOTS COMPATIBLES AVEC LA VALEUR DE RECHERCHE
    searchAutoImplement(event) {
        let currentValue = event.target.value;
        let idElementName = event.target.parentNode.parentNode.id;
        let listElementsId = "list"+ idElementName +"Container";
        let listElementsContainer = document.getElementById(listElementsId);
        let divExpanded = document.getElementById(idElementName);
        divExpanded.classList.remove("expanded-list");

        if (idElementName == "Ustensiles") {             
            listElementsContainer.innerHTML = "";          
            let arrayCorrespondances = [];
            for (let i = 0; i < this.arrayUstensils.length; i++) {
                if(currentValue.length >= 1 ) {
                    //RECHERCHE LES ITEMS DE LA LISTE QUI CORRESPONDENT AVEC LA VALEUR DE RECHERCHE
                    if (this.arrayUstensils[i].substr(0, currentValue.length).toUpperCase() == currentValue.toUpperCase()) {
                            arrayCorrespondances.push(this.arrayUstensils[i]);
                        }   
                }
            }         
            this.renderListAutoImplement(idElementName,arrayCorrespondances);        
        }

        if (idElementName == "Appareil") { 
            listElementsContainer.innerHTML = "";
            let arrayCorrespondances = [];
            for (let i = 0; i <this.arrayAppareils.length; i++) {
                if(currentValue.length >= 1 ) {
                    //RECHERCHE LES ITEMS DE LA LISTE QUI CORRESPONDENT AVEC LA VALEUR DE RECHERCHE
                    if (this.arrayAppareils[i].substr(0, currentValue.length).toUpperCase() == currentValue.toUpperCase()) {
                        arrayCorrespondances.push(this.arrayAppareils[i]);
                        }
                }           
            }  
            this.renderListAutoImplement(idElementName,arrayCorrespondances);              
        }

        if (idElementName == "Ingredients") { 
            listElementsContainer.innerHTML = ""; 
            let arrayCorrespondances = [];
            for (let i = 0; i <this.arrayIngredients.length; i++) {
                if(currentValue.length >= 1 ) {
                    //RECHERCHE LES ITEMS DE LA LISTE QUI CORRESPONDENT AVEC LA VALEUR DE RECHERCHE
                    if (this.arrayIngredients[i].substr(0, currentValue.length).toUpperCase() == currentValue.toUpperCase()) {
                            arrayCorrespondances.push(this.arrayIngredients[i]);
                        }   
                }                  
            }  
            this.renderListAutoImplement(idElementName,arrayCorrespondances);              
        }
    }

    renderListAutoImplement(idElementName, arrayCorrespondances) {
        let idElement = idElementName;
        let listElementsId = "list"+ idElement +"Container";
        let listElementsContainer = document.getElementById(listElementsId);
        
        if(arrayCorrespondances.length == 0) {
            listElementsContainer.classList.remove("add-margin-top")
        }
        else {
            for(let i = 0 ; i < arrayCorrespondances.length ; i++) {

                    if(arrayCorrespondances.length != 0) {
                        let item = document.createElement('li');
                        item.innerHTML= arrayCorrespondances[i];
                        item.classList.add("item-corresponding");
                        item.classList.add("item-list-clickable")
                        listElementsContainer.appendChild(item);
                        listElementsContainer.classList.add("list-no-flex");
                        listElementsContainer.classList.add("add-margin-top")
                        
                    }
                    else {
                        listElementsContainer.innerHTML = "";
                        console.log(arrayCorrespondances.length)
                    }
            }
        }

        let itemsListClickable = document.getElementsByClassName("item-list-clickable");
        for(let i = 0; i < itemsListClickable.length ; i++) {
            itemsListClickable[i].addEventListener('click' , (event) => {
                this.addSearchTag(event);
            }); 
        }
        
    }
   
   

  
    //AJOUTE UN TAG SELON L'ITEM SELECTIONNÉ
    addSearchTag(event) {        
        let classNamePersonalize = event.target.parentNode.parentNode.parentNode.id+"ItemTag";
        let tagsArea = document.getElementById("render-search");
        let tagText = event.target.textContent;
        let tag = document.createElement("span");
        tag.innerHTML = ` ${tagText} <img src="images/close.png" alt ="delete" class="icone-delete">`;
        tag.classList.add(classNamePersonalize);
        tagsArea.appendChild(tag);
        let btnsClose = document.getElementsByClassName("icone-delete");

        for(let i = 0; i < btnsClose.length; i ++) {
            btnsClose[i].addEventListener('click', (event) => {
                this.deleteTagSelected(event);
            });
        }
    }
    //SUPPRIMER LE TAG 
    deleteTagSelected(event) {
       event.target.parentNode.remove();
    }
}