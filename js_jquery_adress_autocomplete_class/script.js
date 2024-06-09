class AutoComplete {
    constructor(searchElementId, infoElementId) {
        
        this.results = [];
        this.searchElementId = searchElementId; // l'id de l'input depuis lequel on cherche eg 'inputA'
        this.infoElementId = infoElementId; // l'id de l'élement ou afficher le texte d'info eg 'infoA'
        this.searchElement = null;
        this.infoElement = null;
        this.selectedData = null;

        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {

        this.searchElement = this.initSearchElement(this.searchElementId);
        this.infoElement = this.initInfoElement(this.infoElementId);
        if (!this.searchElement) {
            console.error(`Element ID ${this.searchElementId} n'existe pas`);
        }
        if (!this.infoElement) {
            console.error(`Element ID ${this.infoElementId} n'existe pas`);
        }
    }

    initSearchElement(id) {
        const searchElement = document.getElementById(id);
        return searchElement;
    }

    initInfoElement(id) {
        const infoElement = document.getElementById(id);
        return infoElement;
    }

    setQuery(inputElement) {
        return new URLSearchParams(inputElement.value);
    }

    getSelectedOption(selected) {
        return this.results.find(result => Object.values(result).some(value => value === selected));
    }

    resetResults() {
        this.results = [];
    }

    setAdresseSearchResults(results) { // passer le retour de la request api api-adresse.data.gouv.fr
     
        this.results = results.map(result => {
            const contextParts = result.properties.context.split(", ");
            return {
                // value: result.properties,
                label: result.properties.label,
                adresse: result.properties.name,
                ville: result.properties.city,
                codePostal: result.properties.postcode,
                codeVille: result.properties.citycode,
                numDepartement: contextParts[0].trim(),
                nomDepartement: contextParts[1].trim(),
                region: contextParts[2].trim(),
                pays: "FR",
                lat: result.geometry.coordinates[1],
                lon: result.geometry.coordinates[0],
            };
        });
    }

    setArraySearchResults(results) { // passer un array simple dans le quel on cherche
        this.results = results.map(data => ({ data }));
    }

    setObjectSearchResults(results) { // passer un tableau d'objets dans le quel on cherche
        this.results = results;
    }

    initializeAutocomplete(results, dataCallback) {

        $(`#${this.searchElementId}`).autocomplete({
            source: results,
            minLength: 3,
            autoFocus: true,
            select: (event, ui) => {
                this.selectedData = this.getSelectedOption(ui.item.value);
                dataCallback(this.selectedData); // callback pour retourner les données au "front"
                this.resetResults();
                this.displayMessage(null)
            },
            create : (event, ui) => {
                this.displayMessage("Création de la liste...");
            },
            search: (event, ui) => {
                this.displayMessage("Recherche en cours...");
            },
        });
    }

    displayMessage(message = null){
        this.infoElement.innerText = message;
    }

}

export default AutoComplete;
