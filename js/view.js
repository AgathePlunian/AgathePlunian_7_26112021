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

    renderIndex() {
        this.getClearArrays(this.arrayRecipesFiltered);
        this.renderInputSearch();
        this.renderRecipesCards(this.recipesList);
        this.addSearchBarEvent()
    }

  
   //FILTER INGREDIENTS, APPLIANCE AND USTENSILS ARRAY BY UNIQ VALUE
    getClearArrays(arrayRecipesList) {
    
        //CLEAR INGREDIENTS ARRAY
        let allIngredientsList = [];
        for(let i = 0; i < arrayRecipesList.length; i++) {
            for(let j = 0; j < arrayRecipesList[i].ingredients.length ; j ++) {
                allIngredientsList.push(arrayRecipesList[i].ingredients[j].ingredient)
            }
        } 
        this.arrayIngredients = [...new Set(allIngredientsList)].sort();

        //CLEAR APPAREILS ARRAY
        let allAppareilsList = [];
        arrayRecipesList.forEach(recipe => {
            allAppareilsList.push(recipe.appliance);
        });
        this.arrayAppareils = [...new Set(allAppareilsList)].sort();

        //CLEAR USTENSILS ARRAY
        let allUstensilsList = [];
            for(let i = 0; i < arrayRecipesList.length; i++) {
                for(let j = 0; j <  arrayRecipesList[i].ustensils.length ; j ++) {
                    allUstensilsList.push(arrayRecipesList[i].ustensils[j]);
                }
            }
        this.arrayUstensils = [...new Set(allUstensilsList)].sort();

    }

    //RENDER RECIPIES CARDS ON PAGE
    renderRecipesCards(arrayRecipes) {

        let cardsContainer = document.getElementById("recipes-cards-container");
        let noMatch = document.getElementById("no-match-message");
        cardsContainer.innerHTML="";
        noMatch.innerHTML="";

        if(arrayRecipes.length == 0) {
            noMatch.innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`
        }
       
        else {
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
    }

    //RENDER INGREDIENTS, APPLIANCE ET USTENSILS SEARCH INPUT
    renderInputSearch() {
        let inputsContainer = document.getElementById("select-inputs-container");
        let inputsName = ["Ingredients", "Appareil", "Ustensiles"];

        for(let i = 0 ; i < inputsName.length ; i ++) {

            let inputTemplate = document.createElement("div");
            inputTemplate.setAttribute("id",inputsName[i]);
            inputTemplate.innerHTML = `<div class="input-container">
                                            <input class="inputsSearch" id="input-${inputsName[i]}" placeholder="${inputsName[i]}">
                                            <div class="chevrons-container" id="chevrons-container-${inputsName[i]}">
                                                <img class="chevron-open" id="chevron-open-${inputsName[i]}" src="images/fleche-down-white.png" alt="Open search ${inputsName[i]}">
                                                <img class="chevron-close" id="chevron-close-${inputsName[i]}" src="images/fleche-up-white.png" alt="Close search ${inputsName[i]}">
                                            </div>
                                        </div>
                                        <div><ul id="list${inputsName[i]}Container"></ul></div>
                                        `;          
            inputsContainer.appendChild(inputTemplate);
        }    

        //ADD EVENT LISTENER ON SEARCH BAR OF INPUTS INGREDIENT, APPAREILS, USTENSILS
        let inputsList = document.getElementsByClassName("inputsSearch");
        for(let i = 0 ; i < inputsList.length ; i++) {
            inputsList[i].addEventListener('input' , (event) => {
                this.searchAutoImplement(event);
            }); 
        }

        //ADD EVENT LISTENER ON ARROW TO OPEN OR CLOSE LISTS
        let chevronsContainer = document.getElementsByClassName("chevrons-container");
        for(let i = 0 ; i < chevronsContainer.length ; i++) {
            chevronsContainer[i].addEventListener('click' , (event) => {
                let idElement = event.target.parentNode.parentNode.parentNode.id;
                this.handleSelect(idElement, i);
            }); 
        }
    }

    //HANLE OPENING AND CLOSING OF SEARCH INPUTS INGREDIENTS, APPLIANCE AND USTENSILS
    handleSelect(idElement) {
        let chevronClose = document.getElementById("chevron-close-"+idElement);
       
        //CLOSE LIST VIEW
        if(chevronClose.classList.contains("chevron-display")) {
           this.closeSelect(idElement);
        }
        
        //OPEN LIST VIEW AND CLOSE OTHER LISTS
        else {  
            let chevronCloseUstensiles = document.getElementById("chevron-close-Ustensiles");
            let chevronCloseAppareil = document.getElementById("chevron-close-Appareil");
            let chevronCloseIngredients = document.getElementById("chevron-close-Ingredients");
            
            switch (idElement) {
                case "Ingredients":
                    if(chevronCloseUstensiles.classList.contains("chevron-display")) {
                        this.closeSelect("Ustensiles")
                    }
                    if(chevronCloseAppareil.classList.contains("chevron-display")) {
                        this.closeSelect("Appareil");
                    }
                    break;
                
                case "Ustensiles":
                    if(chevronCloseIngredients.classList.contains("chevron-display")) {
                        this.closeSelect("Ingredients")
                    }
                    if(chevronCloseAppareil.classList.contains("chevron-display")) {
                        this.closeSelect("Appareil");
                    }
                    break;
                
                case "Appareil":
                    if(chevronCloseUstensiles.classList.contains("chevron-display")) {
                        this.closeSelect("Ustensiles")
                    }
                    if(chevronCloseIngredients.classList.contains("chevron-display")) {
                        this.closeSelect("Ingredients");
                    }
            
                    break;
            }       
            this.openSelect(idElement);
        }
    }

    //CLOSE ITEMS LIST
    closeSelect(idElement) {
        let listElementsContainer = document.getElementById("list"+idElement+"Container");
        listElementsContainer.classList.remove("list-no-flex");
        let input = document.getElementById("input-"+idElement);
        let divInputChosen = document.getElementById(idElement);
        let chevronOpen = document.getElementById("chevron-open-"+idElement);
        let chevronClose = document.getElementById("chevron-close-"+idElement);
        
        chevronOpen.classList.remove("chevron-no-display");
        chevronClose.classList.remove("chevron-display");
        divInputChosen.classList.remove("expanded-list");
        listElementsContainer.classList.remove("add-margin-top");
        listElementsContainer.innerHTML = "";
        input.classList.remove("input-list-mode");
        input.placeholder = idElement;
    }

    //OPEN ITEMS LIST
    openSelect(idElement){
        let listElementsContainer = document.getElementById("list"+idElement+"Container");
        listElementsContainer.classList.remove("list-no-flex");
        let input = document.getElementById("input-"+idElement);
        let divInputChosen = document.getElementById(idElement);
        let chevronOpen = document.getElementById("chevron-open-"+idElement);
        let chevronClose = document.getElementById("chevron-close-"+idElement);
        
        chevronOpen.classList.add("chevron-no-display");
        chevronClose.classList.add("chevron-display");      
        divInputChosen.classList.add("expanded-list");
        listElementsContainer.classList.add("add-margin-top");
        input.classList.add("input-list-mode"); 
        this.getClearArrays(this.arrayRecipesFiltered);     
        this.renderListByElement(idElement, listElementsContainer, input);

    } 

    //RENDER LISTS OF SEARCH INPUT INGREDIENTS, APPLIANCE AND USTENSILS
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

        //EVENT LISTENER ONCLICK OF ITEM'S LIST (INGREDIENT, APPLIANCE AND USTENSILS) CLOSE OTHER LISTS OPENED
        let itemsListClickable = document.getElementsByClassName("item-list-clickable");
        
        for(let i = 0; i < itemsListClickable.length ; i++) {
            itemsListClickable[i].addEventListener('click' , (event) => {
                this.addSearchTag(event);
                let idElement = event.target.parentNode.parentNode.parentNode.id;
                this.closeSelect(idElement);
            }); 
        }
    }
  
    //IDENTIFY IN WHICH INPUT THE SEARCH IN MADE
    searchAutoImplement(event) {
        let currentValue = event.target.value;
        let idElementName = event.target.parentNode.parentNode.id;
        let listElementsId = "list"+ idElementName +"Container";
        let listElementsContainer = document.getElementById(listElementsId);
        let divExpanded = document.getElementById(idElementName);
       // divExpanded.classList.remove("expanded-list");

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

     //FIND ITEMS FROM LIST WHICH MATCH WITH VALUE SEARCHED BY USER 
    searchByType(idElementName, array, listElementsContainer, currentValue) {   
        listElementsContainer.innerHTML = "";          
            let arrayCorrespondances = [];
           
            if(currentValue.length >= 1 ) {
                array.find(element => {
                    if (element.toLowerCase().includes(currentValue.toLowerCase())) {
                        arrayCorrespondances.push(element);      
                    }
                });
            }
                    
        this.renderListAutoImplement(idElementName,arrayCorrespondances);     
    }

    //RENDER LIST WITH MATCHING RESULTS AUTOIMPLEMENTED CORRESPONDING TO EACH INPUT (INGREDIENTS, APPLIANCE, USTENSILS)
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
                let idElement =  event.target.parentNode.parentNode.parentNode.id;    
                this.addSearchTag(event);
                this.closeSelect(idElement);              
            }); 
        }        
    }
   
    //ADD SEARCH TAG ACCORDING DIFFERENTS ARRAYS AND CALL THE FUNCTION FILTER BY TAG
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
        
        //ADD EVENT LISTENER WHEN DELETING TAG
        let btnsClose = document.getElementsByClassName("icone-delete");
        for(let i = 0; i < btnsClose.length; i ++) {
            btnsClose[i].addEventListener('click', (event) => {
                this.deleteTagSelected(event);
            });
        }
    }

    //ADD ITEM CHOSEN IN CORRESPONDING ARRAY (USTENSILS SELECTED, APPAREILS SELECTED AND INGREDIENTS SELECTED)
    addSearchTagAndPushInArray(array, tag, tagText, tagsArea, classNamePersonalize) {
        if(!array.includes(tagText)) {
            tag.innerHTML = `${tagText}<img src="images/close.png" alt="delete" class="icone-delete">`;
            tag.classList.add(classNamePersonalize);
            tagsArea.appendChild(tag);
            array.push(tagText);
        }    
    }

    //DELETING TAG FUNCTION FROM ARRAY OF ITEMS SELECTED, THEN CALL THE FUNCTION FILTER BY TAGS
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

     //ADD EVENT LISTENER TO PRINCIPAL SEARCH BAR 
    addSearchBarEvent() {
        let searchInput = document.getElementById("searchInput");
        searchInput.addEventListener('input' , (event) => {
            this.currentValueSearchBar = event.target.value.toLowerCase();
            this.searchBarFilter();
        });
    }
  
    //FILTER BY SEARCH BAR VALUE
    searchBarFilter() {
        //REINITIALIZE ARRAY OF RECIPES
        this.arrayRecipesFiltered = [...this.recipesList];

        //FILTER BY TAG IF TAG(S) ALREADY SELECTED
        if(this.arrayUstensilsSelected.length > 0 || this.arrayAppareilsSelected.length > 0 || this.arrayIngredientsSelected.length > 0) {
            this.filterByTags();
        } 
 
        //FILTER IF LENGTH OF SEARCH IS LONGER THAN 3

        if(this.currentValueSearchBar.length >= 3) {
            let word = this.currentValueSearchBar;
            this.arrayRecipesFiltered = this.arrayRecipesFiltered.filter(function(currentElement) {
                return currentElement.name.toLowerCase().includes(word)||
                currentElement.description.toLowerCase().includes(word)||
                currentElement.ingredients.find(el => {
                    return (el.ingredient).toLowerCase().includes(word); 
                });
            });          
        }
        this.renderRecipesCards(this.arrayRecipesFiltered);
    }

    //FILTER RECIPES BY SELECTED TAGS
    filterByTags() {
      
        //FILTER BY INGREDIENTS
        for (let i = 0 ; i < this.arrayRecipesFiltered.length; i++) {   
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
        this.renderRecipesCards(this.arrayRecipesFiltered);   
    }  
}