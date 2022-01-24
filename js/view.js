class View {
  
    constructor(recipesList) {
        this.recipesList = recipesList;
        this.arrayIngredients = new Array();
        this.arrayUstensils = new Array();
        this.arrayAppareils = new Array();
        
        this.arrayIngredientsSelected = new Array();
        this.arrayUstensilsSelected = new Array();
        this.arrayAppareilsSelected = new Array();
        this.arrayRecipesFiltered =  [...this.recipesList];
        this.currentValueSearchBar = "";
    }

    showIndex() {
        this.getClearArrays(this.arrayRecipesFiltered);
        this.renderInputSearch();
        this.renderRecipesCards(this.recipesList);
        this.addSearchBarEvent()
   }

  
   //TRI LES LISTES INGREDIENTS APPAREILS ET USTENSILES EN ENLEVANT LES DOUBLONS
   getClearArrays(arrayRecipesList) {
    
    //CLEAR INGREDIENTS ARRAY
    let allIngredientsList = [];
    for(let i = 0; i < arrayRecipesList.length; i++) {
        let eachArrayOfIngredients = arrayRecipesList[i].ingredients;

        for(let j = 0; j < eachArrayOfIngredients.length ; j ++) {
            allIngredientsList.push(eachArrayOfIngredients[j].ingredient)
        }
    }
    
    this.arrayIngredients = [...new Set(allIngredientsList)];

    //CLEAR APPAREILS ARRAY
    let allAppareilsList = [];
    for(let i = 0 ; i < arrayRecipesList.length; i++) {
        allAppareilsList.push(arrayRecipesList[i].appliance);
    }
    this.arrayAppareils = [...new Set(allAppareilsList)];

    //CLEAR USTENSILS ARRAY
    let allUstensilsList = [];
        for(let i = 0; i < arrayRecipesList.length; i++) {
            let eachArrayOfUstensils = arrayRecipesList[i].ustensils;

            for(let j = 0; j < eachArrayOfUstensils.length ; j ++) {
                allUstensilsList.push(eachArrayOfUstensils[j]);
            }
        }
        this.arrayUstensils = [...new Set(allUstensilsList)];

}


   //AFFICHAGE DES CARDS DE RECETTES DE CUISINE
    renderRecipesCards(arrayRecipes) {
        
        let cardsContainer = document.getElementById("recipes-cards-container");
        cardsContainer.innerHTML="";
       
        for(let i = 0; i < arrayRecipes.length; i++){
            let cardRecipe = document.createElement("div");
            cardRecipe.classList.add("card-recipe");
            cardRecipe.innerHTML = `<div class="recipe-img-container"></div>
                                    <div class="recipe-text-container">
                                        <div class="card-header">
                                            <h2>${arrayRecipes[i].name}</h2>
                                            <span><img src="images/time.png"><p class="text-bold">${arrayRecipes[i].time} min</p></span>
                                        </div>
                                        <div class="body-card">
                                            <ul class="card-list-ingredients"></ul>
                                                <p class="description-recipe">
                                                    ${arrayRecipes[i].description}
                                                </p>
                                        </div>
                                    </div>`

            cardsContainer.appendChild(cardRecipe);
            let cardListIngredients = document.getElementsByClassName("card-list-ingredients");
           
            for(let j = 0; j < arrayRecipes[i].ingredients.length; j++) {
                let itemList = document.createElement('li');
                    
                if((!arrayRecipes[i].ingredients[j].unit) && (!arrayRecipes[i].ingredients[j].quantity)) {
                    itemList.innerHTML =  `<p><span class="text-bold">${arrayRecipes[i].ingredients[j].ingredient}</span></p>`;
                }

                else if(!arrayRecipes[i].ingredients[j].unit) {
                    itemList.innerHTML =  `<p><span class="text-bold">${arrayRecipes[i].ingredients[j].ingredient}: </span>${arrayRecipes[i].ingredients[j].quantity}</p>`;
                }

                else {
                    itemList.innerHTML =  `<p><span class="text-bold">${arrayRecipes[i].ingredients[j].ingredient}: </span>${arrayRecipes[i].ingredients[j].quantity} ${arrayRecipes[i].ingredients[j].unit}</p>`;
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
                                            <div class="chevrons-container" id="chevrons-container-${inputsName[i]}">
                                                <img class="chevron-open id="chevron-open-${inputsName[i]}" src="/images/fleche-down-white.png" alt="Open search ${inputsName[i]}">
                                                <img class="chevron-close" id="chevron-close-${inputsName[i]}" src="/images/fleche-up-white.png" alt="Close search ${inputsName[i]}">
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

        //EVENT LISTENER AU CLICK D'UN ITEM DE LA LISTE
        let itemsListClickable = document.getElementsByClassName("item-list-clickable");
        
        for(let i = 0; i < itemsListClickable.length ; i++) {
            itemsListClickable[i].addEventListener('click' , (event) => {
                this.addSearchTag(event);
                this.closeListOnClickTag(event)
            }); 
        }
    }

    //FERME LE MENU AU CLICK D'UN ITEM
    closeListOnClickTag(event) {
        
        let elementList = event.target.parentNode.parentNode.parentNode;
        let idElement = elementList.id;
       
        let chevronsContainer = elementList.children[0].children[1];
        let chevronOpen = chevronsContainer.children[0];
        let chevronClose = chevronsContainer.children[1];
        let listElementsId = "list"+ idElement +"Container";
        let listElementsContainer = document.getElementById(listElementsId);

        let input = elementList.childNodes[0].children[0];
        
        chevronOpen.classList.remove("chevron-no-display");
        chevronClose.classList.remove("chevron-display");
        elementList.classList.remove("expanded-list");
        input.classList.remove("input-list-mode");
        input.placeholder = idElement;
        listElementsContainer.classList.remove("add-margin-top");
        listElementsContainer.innerHTML = "";
    }


    closeSelect(chevronOpen, chevronClose, divInputChosen, listElementsContainer, input, idElement) {
        chevronOpen.classList.remove("chevron-no-display");
        chevronClose.classList.remove("chevron-display");
        divInputChosen.classList.remove("expanded-list");
        listElementsContainer.classList.remove("add-margin-top");
        listElementsContainer.innerHTML = "";
        input.classList.remove("input-list-mode");
        input.placeholder = idElement;
    }

    openSelect(chevronOpen, chevronClose, divInputChosen, listElementsContainer, input, idElement){
        chevronOpen.classList.add("chevron-no-display");
        chevronClose.classList.add("chevron-display");      
        divInputChosen.classList.add("expanded-list");
        listElementsContainer.classList.add("add-margin-top");
        input.classList.add("input-list-mode"); 
        this.getClearArrays(this.arrayRecipesFiltered);     
        this.renderListByElement(idElement, listElementsContainer, input);

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
           this.closeSelect(chevronOpen, chevronClose, divInputChosen, listElementsContainer, input , idElement)
        }
        
        //OUVRE LE MENU SELECT
        else {  
           this.openSelect(chevronOpen, chevronClose, divInputChosen, listElementsContainer, input, idElement)
        }
    }
  

    //RECHERCHE DE LA LISTE DE MOTS COMPATIBLES AVEC LA VALEUR DE RECHERCHE DANS L'INPUT
    searchAutoImplement(event) {
        let currentValue = event.target.value;
        let idElementName = event.target.parentNode.parentNode.id;
        let listElementsId = "list"+ idElementName +"Container";
        let listElementsContainer = document.getElementById(listElementsId);
        let divExpanded = document.getElementById(idElementName);
        divExpanded.classList.remove("expanded-list");

        if (idElementName == "Ustensiles") {             
            this.searchByType(idElementName, this.arrayUstensils, listElementsContainer, currentValue);
        }

        if (idElementName == "Appareil") { 
            this.searchByType(idElementName, this.arrayAppareils, listElementsContainer, currentValue);
        }

        if (idElementName == "Ingredients") { 
            this.searchByType(idElementName, this.arrayIngredients, listElementsContainer, currentValue);           
        }
    }


    searchByType(idElementName, array, listElementsContainer, currentValue) {   
        listElementsContainer.innerHTML = "";          
            let arrayCorrespondances = [];
           
            if(currentValue.length >= 1 ) {
                //RECHERCHE LES ITEMS DE LA LISTE QUI CORRESPONDENT AVEC LA VALEUR DE RECHERCHE
                array.find(element => {
                    if (element.toUpperCase().includes(currentValue.toUpperCase())) {
                        arrayCorrespondances.push(element);      
                    }
                });
            }
                    
        this.renderListAutoImplement(idElementName,arrayCorrespondances);     
    }

    //AFFICHE LA LISTE DES RECHERCHES CORRESPONDANCES SELON CHAQUE INPUT
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
   
    //AJOUTE UN TAG SELON L'ITEM SELECTIONNÉ PUIS APPEL LA FONCTION DE FILTRE SELON LES ITEMS CHOISIS
    addSearchTag(event) {   
        let idElement = event.target.parentNode.parentNode.parentNode.id;
        let classNamePersonalize = idElement+"ItemTag";
        let tagsArea = document.getElementById("render-search");
        let tagText = event.target.textContent;
        let tag = document.createElement("span");
        
        if(idElement == "Ustensiles") {
            this.addSearchTagAndPushInArray(this.arrayUstensilsSelected, tag, tagText, tagsArea, classNamePersonalize);
            this.filterByTags();
        }

        if(idElement == "Appareil") {
            this.addSearchTagAndPushInArray(this.arrayAppareilsSelected, tag, tagText, tagsArea, classNamePersonalize);
            this.filterByTags();
        }

        if(idElement == "Ingredients") {
            this.addSearchTagAndPushInArray(this.arrayIngredientsSelected, tag, tagText, tagsArea, classNamePersonalize);
            this.filterByTags();
        }
        
        //AJOUT DE L'EVENLISTENER SI ON SUPPRIME UN TAG QUI APPEL LA FONCTION DELETETAGSELECTED
        let btnsClose = document.getElementsByClassName("icone-delete");
        for(let i = 0; i < btnsClose.length; i ++) {
            btnsClose[i].addEventListener('click', (event) => {
                this.deleteTagSelected(event);
            });
        }
    }

    //AJOUT L'ITEM CHOISI DANS L'ARRAY CORRESPONDANTE (INGREDIENTS, APPAREILS ET USTENSILS)
    addSearchTagAndPushInArray(array, tag, tagText, tagsArea, classNamePersonalize) {
        if(!array.includes(tagText)) {
            tag.innerHTML = `${tagText}<img src="images/close.png" alt ="delete" class="icone-delete">`;
            tag.classList.add(classNamePersonalize);
            tagsArea.appendChild(tag);
            array.push(tagText);
        }    
     
    }

    //SUPPRIMER LE TAG ET APPEL LA FONCTION DE FILTRAGE DES RECETTES
    deleteTagSelected(event) {
        let tagText = event.target.parentNode.textContent;
        let className = event.target.parentNode.classList[0];
        this.arrayRecipesFiltered = [...this.recipesList];

        if(className == "UstensilesItemTag") {
            if(this.arrayUstensilsSelected.includes(tagText)) {
                this.arrayUstensilsSelected.splice(this.arrayUstensilsSelected.indexOf(tagText), 1);
                event.target.parentNode.remove();         
                this.searchBarFilter();
                this.filterByTags();
                
            }
        }

        if(className == "AppareilItemTag") {
            if(this.arrayAppareilsSelected.includes(tagText)) {
                this.arrayAppareilsSelected.splice(this.arrayAppareilsSelected.indexOf(tagText), 1);
                event.target.parentNode.remove();  
                this.searchBarFilter();
                this.filterByTags();
            }
        }

        if(className == "IngredientsItemTag") {
            if(this.arrayIngredientsSelected.includes(tagText)) {
                this.arrayIngredientsSelected.splice(this.arrayIngredientsSelected.indexOf(tagText), 1);
                event.target.parentNode.remove();  
                this.searchBarFilter();
                this.filterByTags();
            }
        }
    }

     //AJOUTE EVENTLISTENER À LA BAR DE RECHERCHE PRINCIPALE
    addSearchBarEvent() {
        let searchInput = document.getElementById("searchInput");
        searchInput.addEventListener('input' , (event) => {
            this.currentValueSearchBar = event.target.value;
            this.searchBarFilter();
            this.isSearchBarUsed = true;
        });
    }

    //FILTRE LES RECETTES SELON LA RECHERCHE PRINCIPALE AU BOUT DE 3 CARACTÈRES
    searchBarFilter() {

        if(this.arrayUstensilsSelected.length == 0 && this.arrayAppareilsSelected.length == 0 && this.arrayIngredientsSelected == 0) {
            this.arrayRecipesFiltered = [...this.recipesList];
            this.filterByTags();
        }
    
        //SI L'UTILISATEUR EFFACE SA RECHERCHE, LA RECHERCHE REPREND SUR LES FILTRES SÉLÉCTIONNÉS EN PARTANT DE L'ARRAY INITIALE
        if(this.currentValueSearchBar.length == 0) {
            this.isSearchBarUsed = false;
            this.arrayRecipesFiltered = [...this.recipesList];
            this.filterByTags();
        }

        // IF A TAG IS ALREADY SELECTED
        if(this.arrayUstensilsSelected.length > 0 || this.arrayAppareilsSelected.length > 0 || this.arrayIngredientsSelected > 0) {
            this.arrayRecipesFiltered = [...this.recipesList];
            this.filterByTags();
        }
        
        //IF LENGTH OF SEARCH IS LONGER THAN 3

        if(this.currentValueSearchBar.length >= 3) {
            let word = this.currentValueSearchBar;
            console.log(word);
            this.arrayRecipesFiltered = this.arrayRecipesFiltered.filter(function(currentElement) {
                return currentElement.name.toLowerCase().includes(word)||
                currentElement.description.toLowerCase().includes(word)||
                currentElement.ingredients.find(el => {
                    return (el.ingredient).toLowerCase().includes(word)   
                });
            });
            
            console.log(this.arrayRecipesFiltered);
            this.renderRecipesCards(this.arrayRecipesFiltered);

          }
    }



    //FITRES LES RECETTES SELON LES ITEMS SELECTIONNÉS
    filterByTags() {
      
        //FILTER BY INGREDIENTS
        for (let i = 0 ; i <  this.arrayRecipesFiltered.length; i++) {   
            let isFound = true;
            let arrIngredient = [];
            for(let j = 0; j < this.arrayRecipesFiltered[i].ingredients.length ; j++) {
                arrIngredient.push(this.arrayRecipesFiltered[i].ingredients[j].ingredient);              
            }

            for (let k = 0 ; k < this.arrayIngredientsSelected.length; k++) { 
            
                if(!arrIngredient.includes(this.arrayIngredientsSelected[k])) {
                    isFound = false;
                    break;                    
                }

            }
            if(isFound == false) {
                this.arrayRecipesFiltered.splice([i], 1);
                i--;
            }
        }

        //FILTER BY APPAREIL
        for (let i = 0 ; i <  this.arrayRecipesFiltered.length; i++) {  

            for (let j = 0 ; j < this.arrayAppareilsSelected.length; j++) {  

                if(this.arrayRecipesFiltered[i].appliance != this.arrayAppareilsSelected[j]) {
                    this.arrayRecipesFiltered.splice([i], 1);
                    i--;             
                }       
            }
        }

         //FILTER BY USTENSILS
         for (let i = 0 ; i <  this.arrayRecipesFiltered.length; i++) {  
            let isFound = true;
            for (let j = 0 ; j < this.arrayUstensilsSelected.length; j++) {  
                if(!this.arrayRecipesFiltered[i].ustensils.includes(this.arrayUstensilsSelected[j])) {
                    isFound = false;
                    break;                    
                }
            }
            if(isFound == false) {
                this.arrayRecipesFiltered.splice([i], 1);
                i--;
            }           
        }
        console.log(this.arrayRecipesFiltered.length);
        this.renderRecipesCards(this.arrayRecipesFiltered);
        
    }  
}