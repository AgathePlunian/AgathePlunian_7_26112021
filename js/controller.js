class Controller {
    async showIndex() {
        let recipesList = await Model.get();
        let viewIndex =  new View;
        viewIndex.showIndex(recipesList);
    }
}