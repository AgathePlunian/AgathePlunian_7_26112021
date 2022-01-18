class Model {
    static get() {
        return fetch(URL_DATA)
        .then(response => response.json())
        .then((data) => {
            return data.recipes;
        })

    }
}