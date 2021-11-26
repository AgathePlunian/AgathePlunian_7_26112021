class View {
  
    constructor(recipesList) {
        this.recipesList = recipesList;
        this.arrayIngredients = new Array();
        this.arrayUstensils = new Array();
        this.arrayAppareils = new Array();
        
        this.arrayIngredientsSelected = new Array();
        this.arrayUstensilsSelected = new Array();
        this.arrayAppareilsSelected = new Array();

        this.arrayRecipesFiltered = new Array();
    }

    showIndex() {
        this.getClearArrays()
        this.renderInputSearch();
        this.renderRecipesCards();
   }

   //TRI LES LISTES INGREDIENTS APPAREILS ET USTENSILES EN ENLEVANT LES DOUBLONS
   getClearArrays() {
    //CLEAR INGREDIENTS ARRAY
    let allIngredientsList = [];
    for(let i = 0; i < this.recipesList.length; i++) {
        let eachArrayOfIngredients = this.recipesList[i].ingredients;

        for(let j = 0; j < eachArrayOfIngredients.length ; j ++) {
            allIngredientsList.push(eachArrayOfIngredients[j].ingredient)
        }
    }
    this.arrayIngredients = [...new Set(allIngredientsList)];

    //CLEAR APPAREILS ARRAY
    let allAppareilsList = [];
    for(let i = 0 ; i < this.recipesList.length; i++) {
        allAppareilsList.push(this.recipesList[i].appliance);
    }
    this.arrayAppareils = [...new Set(allAppareilsList)];

    //CLEAR USTENSILS ARRAY
    let allUstensilsList = [];
        for(let i = 0; i < this.recipesList.length; i++) {
            let eachArrayOfUstensils = this.recipesList[i].ustensils;

            for(let j = 0; j < eachArrayOfUstensils.length ; j ++) {
                allUstensilsList.push(eachArrayOfUstensils[j]);
            }
        }
        this.arrayUstensils = [...new Set(allUstensilsList)];

}


   //AFFICHAGE DES CARDS DE RECETTES DE CUISINE
    renderRecipesCards() {
        let cardsContainer = document.getElementById("recipes-cards-container");
       
        for(let i = 0; i < this.recipesList.length; i++){
            let cardRecipe = document.createElement("div");
            cardRecipe.classList.add("card-recipe");
            cardRecipe.innerHTML = `<div class="recipe-img-container"></div>
                                    <div class="recipe-text-container">
                                        <div class="card-header">
                                            <h2>${this.recipesList[i].name}</h2>
                                            <span><img src="images/time.png"><p class="text-bold">${this.recipesList[i].time} min</p></span>
                                        </div>
                                        <div class="body-card">
                                            <ul class="card-list-ingredients"></ul>
                                                <p class="description-recipe">
                                                    ${this.recipesList[i].description}
                                                </p>
                                        </div>
                                    </div>`

            cardsContainer.appendChild(cardRecipe);
            let cardListIngredients = document.getElementsByClassName("card-list-ingredients");
           
            for(let j = 0; j < this.recipesList[i].ingredients.length; j++) {
                let itemList = document.createElement('li');
                    
                if((!this.recipesList[i].ingredients[j].unit) && (!this.recipesList[i].ingredients[j].quantity)) {
                    itemList.innerHTML =  `<p><span class="text-bold">${this.recipesList[i].ingredients[j].ingredient}</span></p>`;
                }

                else if(!this.recipesList[i].ingredients[j].unit) {
                    itemList.innerHTML =  `<p><span class="text-bold">${this.recipesList[i].ingredients[j].ingredient}: </span>${this.recipesList[i].ingredients[j].quantity}</p>`;
                }

                else {
                    itemList.innerHTML =  `<p><span class="text-bold">${this.recipesList[i].ingredients[j].ingredient}: </span>${this.recipesList[i].ingredients[j].quantity} ${this.recipesList[i].ingredients[j].unit}</p>`;
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
            for (let i = 0; i < array.length; i++) {
                if(currentValue.length >= 1 ) {
                    //RECHERCHE LES ITEMS DE LA LISTE QUI CORRESPONDENT AVEC LA VALEUR DE RECHERCHE
                    if (array[i].substr(0, currentValue.length).toUpperCase() == currentValue.toUpperCase()) {
                        arrayCorrespondances.push(array[i]);
                    }   
                }
            }         
        this.renderListAutoImplement(idElementName,arrayCorrespondances);     
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
        let idElement = event.target.parentNode.parentNode.parentNode.id;
        let classNamePersonalize = idElement+"ItemTag";
        let tagsArea = document.getElementById("render-search");
        let tagText = event.target.textContent;
        let tag = document.createElement("span");
        
        if(idElement == "Ustensiles") {
            this.addSearchTagAndPushInArray(this.arrayUstensilsSelected, tag, tagText, tagsArea, classNamePersonalize);
        }

        if(idElement == "Appareil") {
            this.addSearchTagAndPushInArray(this.arrayAppareilsSelected, tag, tagText, tagsArea, classNamePersonalize);
        }

        if(idElement == "Ingredients") {
            this.addSearchTagAndPushInArray(this.arrayIngredientsSelected, tag, tagText, tagsArea, classNamePersonalize);
            this.filterBy();
        }
        
        let btnsClose = document.getElementsByClassName("icone-delete");
        for(let i = 0; i < btnsClose.length; i ++) {
            btnsClose[i].addEventListener('click', (event) => {
                this.deleteTagSelected(event);
            });
        }
    }

    addSearchTagAndPushInArray(array, tag, tagText, tagsArea, classNamePersonalize) {
        if(!array.includes(tagText)) {
            tag.innerHTML = `${tagText}<img src="images/close.png" alt ="delete" class="icone-delete">`;
            tag.classList.add(classNamePersonalize);
            tagsArea.appendChild(tag);
            array.push(tagText);
            //this.filterRecipesBy(tagText);
         
        }    

       
    }

    //SUPPRIMER LE TAG 
    deleteTagSelected(event) {
        let tagText = event.target.parentNode.textContent;
        let className = event.target.parentNode.classList[0];

        if(className == "UstensilesItemTag") {
            if(this.arrayUstensilsSelected.includes(tagText)) {
                this.arrayUstensilsSelected.splice(this.arrayUstensilsSelected.indexOf(tagText), 1);
                console.log(this.arrayUstensilsSelected);  
                event.target.parentNode.remove();  
                
            }
        }

        if(className == "AppareilItemTag") {
            if(this.arrayAppareilsSelected.includes(tagText)) {
                this.arrayAppareilsSelected.splice(this.arrayAppareilsSelected.indexOf(tagText), 1);
                console.log(this.arrayAppareilsSelected);  
                event.target.parentNode.remove();  
                
            }
        }

        if(className == "IngredientsItemTag") {
            if(this.arrayIngredientsSelected.includes(tagText)) {
                this.arrayIngredientsSelected.splice(this.arrayIngredientsSelected.indexOf(tagText), 1);
                event.target.parentNode.remove();  
                this.filterByDelete();
                //this.filterRecipesByDelete(tagText);
            }
        }
    }
    filterByDelete() {
        
    }

    filterBy() {
       console.log(this.arrayIngredientsSelected);
        console.log(this.arrayRecipesFiltered);
        if(this.arrayRecipesFiltered.length == 0) {
            for (let i = 0 ; i <  this.arrayIngredientsSelected.length; i ++) {   
                let isFound = false;
        
                for(let j = 0 ; j < this.recipesList.length; j ++) {
                    for(let k = 0; k < this.recipesList[j].ingredients.length ; k ++) {
                        
                        if(this.recipesList[j].ingredients[k].ingredient == this.arrayIngredientsSelected[i]) {
                            isFound = true;
                            this.arrayRecipesFiltered.push(this.recipesList[j]);
                            break;
                        }   
                    }
                }
            }
        }

        else {
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
           console.log(this.arrayRecipesFiltered);
            console.log("///////");
        }
    }
            /*
            for (let i = 0 ; i <  this.arrayIngredientsSelected.length; i ++) {   
                let isFound = false;
        
                for(let j = 0 ; j < this.arrayRecipesFiltered.length; j ++) {
                    for(let k = 0; k < this.arrayRecipesFiltered[j].ingredients.length ; k ++) {
                        
                        if(this.arrayRecipesFiltered[j].ingredients[k].ingredient == this.arrayIngredientsSelected[i]) {
                            
                            isFound = true;
                            break;
                        }   
                        if (isFound == true) {
                            console.log(this.arrayRecipesFiltered[j]);
                        }
        
                        else {          
                            console.log("n'est pas présent")
                            this.arrayRecipesFiltered.splice([j], 1);
                        }
                    }

                   
                }
                
                console.log(this.arrayRecipesFiltered);
            }
            */
  


    /*
    filterRecipesByDelete(tagText) {
        for(let i = 0 ; i < this.recipesList.length; i++) {
            for(let j = 0 ; j < this.recipesList[i].ingredients.length ; j ++){
                
                if(this.recipesList[i].ingredients[j].ingredient.includes(tagText)) {
                    this.arrayRecipesFiltered.push(this.recipesList[i]);
                }            
            }
        }
    }


    filterRecipesBy(tagText) {

        if(this.arrayRecipesFiltered.length == 0) {
            for(let i = 0 ; i < this.recipesList.length; i++) {
                for(let j = 0 ; j < this.recipesList[i].ingredients.length ; j ++){
                    
                    if(this.recipesList[i].ingredients[j].ingredient.includes(tagText)) {
                        this.arrayRecipesFiltered.push(this.recipesList[i]);
                    }            
                }
            }
            console.log(this.arrayRecipesFiltered);
        }

        
        else {
            
            for(let i = 0 ; i < this.arrayRecipesFiltered.length; i++) {
                let isInArray = false;

                for(let j = 0 ; j < this.arrayRecipesFiltered[i].ingredients.length ; j ++){             
                    if(this.arrayRecipesFiltered[i].ingredients[j].ingredient == tagText) {
                        isInArray = true;
                    }                                           
                }

                if (isInArray == true) {
                    console.log(this.arrayRecipesFiltered[i]);
                    console.log("est présent");
                    console.log(this.arrayRecipesFiltered);
                }

                else {          
                    console.log(this.arrayRecipesFiltered[i]);
                    console.log("n'est pas présent")
                    this.arrayRecipesFiltered.splice([i], 1);
                    console.log(this.arrayRecipesFiltered);
                    i--; 
                }
            }
            */
            /*
            for(let i = 0 ; i < this.arrayRecipesFiltered.length; i++) {
                let newArray = [];
                newArray.push(this.arrayRecipesFiltered[i].filter(ingredients => ingredients.ingredient == tagText));
            }
            */
        

        
        //console.log(this.recipesList);
        //console.log(this.arrayIngredientsSelected);
    
    
        /*
        if(this.arrayRecipesFiltered.length == 0) {
            for(let i = 0 ; i < this.recipesList.length; i++) {
                for(let j = 0 ; j < this.recipesList[i].ingredients.length ; j ++){
                    if(this.recipesList[i].ingredients[j].ingredient.includes(tagText)) {
                        this.arrayRecipesFiltered.push(this.recipesList[i]);
                    }            
                }
            }
            console.log(this.arrayRecipesFiltered);
        }

        
        else {
            console.log(tagText);
            for(let i = 0 ; i < this.arrayRecipesFiltered.length; i++) {
                for(let j = 0 ; j < this.arrayRecipesFiltered[i].ingredients.length ; j ++){
                   if(!this.arrayRecipesFiltered[i].ingredients[j].ingredient.includes(tagText)) {
                    console.log("okokok")   
                    console.log(this.arrayRecipesFiltered[i]);
                       break;
                        //this.arrayRecipesFiltered.splice(this.arrayRecipesFiltered.indexOf(this.recipesList[i]), 1);
                    }           
                }
            }
            console.log(this.arrayRecipesFiltered);
        }
        */
        
        /*
               let contains =  this.arrayIngredientsSelected.some(element => {
                   return this.recipesList[i].ingredients.ingredient[j](element);
               })
               console.log(contains);
                
            }
        */
        
        
    
        //let arrayFilterByIngredients = this.filter(word => word.length > 6)
     
}